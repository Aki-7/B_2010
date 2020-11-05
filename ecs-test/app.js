const express = require("express");

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  const TEST_VAL = process.env.TEST_VAL;
  res.json({ val: TEST_VAL || "Hello World" });
});

app.listen(PORT, () => {
  console.log(`[*] Server listening on port ${PORT}`);
});
