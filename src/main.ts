import { createConnection } from "typeorm";
import { createApp } from "./app";
import { PORT } from "./config/variables";

const main = () => {
  const { server } = createApp();
  createConnection()
    .then(() => {
      server.listen(PORT, () =>
        console.log(`[*] Server listening on port ${PORT}`)
      );
    })
    .catch((err) => console.error(err));
};

main();
