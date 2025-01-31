import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import router from "./routes/index";

const main = async () => {
  config();

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(express.json());

  await MongoClient.connect();

  app.use(router);

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
