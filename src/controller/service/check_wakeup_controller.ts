import { Express } from "express";
import webhookAuth from "../../middleware/webhook_auth";
import { CheckWakeupBatch } from "../../batch/check_wakeup_batch";
import R from "../base/application_router";
import auth from "../../middleware/auth";
import axios from "axios";
import multer from "multer";
import { CLOUD_VISION_API_KEY } from "../../config/variables";
import { parameter } from "../../lib/parameter";
import getCurrentUser from "../../lib/get_current_user";
import { Result } from "../../entity/Result";

const VISION_API_ENDPOINT = "https://vision.googleapis.com/v1/images:annotate";

const checkWakeupRouting = (app: Express) => {
  const upload = multer();
  app.post("/check_wakeup", auth, upload.any(), check);
  app.post("/service/check_wakeup", webhookAuth, update);
};

const check = R(async (req, res) => {
  const { label } = parameter(req).fields({
    label: true,
  }) as { label: string };

  const files = req.files as Express.Multer.File[];

  if (files.length == 0) {
    res.status(400);
    res.send();
    return;
  }

  const file = files[0];

  const params = {
    requests: [
      {
        image: {
          content: Buffer.from(file.buffer).toString("base64"),
        },
        features: [
          {
            type: "LABEL_DETECTION",
            maxResults: 20,
          },
        ],
      },
    ],
  };

  const endpoint = `${VISION_API_ENDPOINT}?key=${CLOUD_VISION_API_KEY}`;

  const visionApiResponse = await axios.post(endpoint, params);
  const labelAnnotations: {
    mid: string;
    description: string;
    score: number;
    topicality: number;
  }[] = visionApiResponse.data.responses[0].labelAnnotations;

  const isCorrectImage =
    labelAnnotations.filter((annotation) => {
      const detectedLabel = annotation.description.toLowerCase();
      const answerLabel = label.toLowerCase();
      return detectedLabel.indexOf(answerLabel) > -1;
    }).length > 0;

  const labelAnnotation = labelAnnotations[0].description;

  if (isCorrectImage) {
    const user = getCurrentUser(req);
    const current = new Date();

    await Result.wakedUp(current, user);

    res.redirect("/");
  } else {
    res.redirect(
      `/?label=${label}&status=incorrect&annotation=${labelAnnotation}`
    );
  }
});

const update = R(async (req, res) => {
  try {
    await CheckWakeupBatch.run();
  } catch (error) {
    res.status(500);
    res.json(error);
  }
  res.status(204);
  res.send();
});

export default checkWakeupRouting;
