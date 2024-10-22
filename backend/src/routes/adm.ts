import { Router } from "express";
import { CreateAdmController } from "../controllers/Adm/createAdm/createAdm";
import { UpdateAdmController } from "../controllers/Adm/updateAdm/updateAdm";
import { MongoCreateAdmRepository } from "../repositories/Adm/createAdm/mongo-CreateAdm";
import { MongoUpdateAdmRepository } from "../repositories/Adm/updateAdm/mongo-UpdateAdm";

const admRouter = Router();

admRouter.post("/", async (req, res) => {
  const mongoCreateAdmRepository = new MongoCreateAdmRepository();

  const createAdmController = new CreateAdmController(mongoCreateAdmRepository);

  const { body, statusCode } = await createAdmController.handle({
    body: req.body,
  });

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

export default admRouter;
