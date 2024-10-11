import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/getUsers";
import { MongoGetUserRepository } from "./repositories/getUsers/mongo-GetUsers";

config();

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));

app.get("/users", async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();

  const getUsersController = new GetUsersController(mongoGetUserRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});
