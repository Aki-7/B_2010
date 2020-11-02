import { Server } from "http";
import { createConnection, getConnection } from "typeorm";

const baseContext = (server: Server) => {
  beforeEach(async () => {
    await createConnection();
  });

  afterEach(async () => {
    server.close();
    await getConnection().close();
  });
};

export default baseContext;
