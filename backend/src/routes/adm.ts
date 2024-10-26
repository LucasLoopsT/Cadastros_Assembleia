import { Router } from "express";
import { CreateAdmController } from "../controllers/Adm/createAdm/createAdm";
import { GetAdminsController } from "../controllers/Adm/getAdmins/getAdmins";
import { UpdateAdmController } from "../controllers/Adm/updateAdm/updateAdm";
import { DeleteAdmController } from "../controllers/Adm/deleteAdm/deleteAdm";
import { LoginAdmController } from "../controllers/Adm/authAdm/authAdm";
import { MongoCreateAdmRepository } from "../repositories/Adm/createAdm/mongo-CreateAdm";
import { MongoGetAdminsRepository } from "../repositories/Adm/getAdmins/mongo-GetAdmins";
import { MongoUpdateAdmRepository } from "../repositories/Adm/updateAdm/mongo-UpdateAdm";
import { MongoDeleteAdmRepository } from "../repositories/Adm/deleteAdm/mongo-DeleteAdm";
import { MongoLoginAdmRepository } from "../repositories/Adm/authAdm/mongo-AuthAdm";

const admRouter = Router();

admRouter.post("/login", async (req, res) => {
  const mongoLoginAdmRepository = new MongoLoginAdmRepository();

  const loginAdmController = new LoginAdmController(mongoLoginAdmRepository);

  const { body, statusCode } = await loginAdmController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

admRouter.post("/", async (req, res) => {
  const mongoCreateAdmRepository = new MongoCreateAdmRepository();

  const createAdmController = new CreateAdmController(mongoCreateAdmRepository);

  const { body, statusCode } = await createAdmController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

admRouter.get("/", async (req, res) => {
  const mongoGetAdminsRepository = new MongoGetAdminsRepository();

  const getAdminsController = new GetAdminsController(mongoGetAdminsRepository);

  const { body, statusCode } = await getAdminsController.handle();

  res.status(statusCode).send(body);
});

admRouter.patch("/:id", async (req, res) => {
  const mongoUpdateAdmRepository = new MongoUpdateAdmRepository();

  const updateAdmController = new UpdateAdmController(mongoUpdateAdmRepository);

  const { body, statusCode } = await updateAdmController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

admRouter.delete("/:id", async (req, res) => {
  const mongoDeleteAdmRepository = new MongoDeleteAdmRepository();

  const deleteAdmController = new DeleteAdmController(mongoDeleteAdmRepository);

  const { body, statusCode } = await deleteAdmController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default admRouter;
