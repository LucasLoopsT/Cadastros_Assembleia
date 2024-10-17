import { Router } from "express";
import { GetUsersController } from "../controllers/getUsers/getUsers";
import { MongoGetUserRepository } from "../repositories/getUsers/mongo-GetUsers";
import { MongoCreateUserRepository } from "../repositories/createUser/mongo-CreateUser";
import { MongoUpdateRepository } from "../repositories/updateUser/mongo-UpdateUser";
import { CreateUserController } from "../controllers/createUser/createUser";
import { UpdateUserController } from "../controllers/updateUser/updateUser";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();

  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

userRouter.get("/", async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();

  const getUsersController = new GetUsersController(mongoGetUserRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

userRouter.patch("/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateRepository();

  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default userRouter;
