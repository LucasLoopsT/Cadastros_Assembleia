import { Router } from "express";
import { GetUsersController } from "../controllers/User/getUsers/getUsers";
import { MongoGetUserRepository } from "../repositories/User/getUsers/mongo-GetUsers";
import { MongoCreateUserRepository } from "../repositories/User/createUser/mongo-CreateUser";
import { MongoUpdateRepository } from "../repositories/User/updateUser/mongo-UpdateUser";
import { MongoDeleteUserRepository } from "../repositories/User/deleteUser/mongo-DeleteUser";
import { CreateUserController } from "../controllers/User/createUser/createUser";
import { UpdateUserController } from "../controllers/User/updateUser/updateUser";
import { DeleteUserController } from "../controllers/User/deleteUser/deleteUser";

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

userRouter.delete("/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();

  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  );

  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default userRouter;
