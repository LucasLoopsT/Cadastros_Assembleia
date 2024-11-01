import { Router } from "express";
//Repositories
import { MongoCreateUserRepository } from "../repositories/User/createUser/mongo-CreateUser";
import { MongoGetUserRepository } from "../repositories/User/getUsers/mongo-GetUsers";
import { MongoGetUserByIDRepository } from "../repositories/User/getUserByID/mongo-GetUserByID";
import { MongoUpdateRepository } from "../repositories/User/updateUser/mongo-UpdateUser";
import { MongoDeleteUserRepository } from "../repositories/User/deleteUser/mongo-DeleteUser";
//Controllers
import { CreateUserController } from "../controllers/User/createUser/createUser";
import { GetUsersController } from "../controllers/User/getUsers/getUsers";
import { GetUserByIDController } from "../controllers/User/getUsersByID/getUserByID";
import { UpdateUserController } from "../controllers/User/updateUser/updateUser";
import { DeleteUserController } from "../controllers/User/deleteUser/deleteUser";
import { authMiddleware } from "../middlewares/authMiddle";

const userRouter = Router();

userRouter.post("/", authMiddleware, async (req, res) => {
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

userRouter.get("/:id", authMiddleware, async (req, res) => {
  const mongoGetUserByIDRepository = new MongoGetUserByIDRepository();

  const getUserByIDController = new GetUserByIDController(
    mongoGetUserByIDRepository
  );

  const { body, statusCode } = await getUserByIDController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

userRouter.patch("/:id/", authMiddleware, async (req, res) => {
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

userRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
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
