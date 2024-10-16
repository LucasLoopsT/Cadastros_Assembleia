import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/getUsers";
import { MongoGetUserRepository } from "./repositories/getUsers/mongo-GetUsers";
import { MongoCreateUserRepository } from "./repositories/createUser/mongo-CreateUser";
import { CreateUserController } from "./controllers/createUser/createUser";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUserRepository = new MongoGetUserRepository();

    const getUsersController = new GetUsersController(mongoGetUserRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
