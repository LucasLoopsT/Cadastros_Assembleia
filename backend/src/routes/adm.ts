import { Router } from "express";
import { CreateAdmController } from "../controllers/Adm/createAdm/createAdm";
import { MongoCreateAdmRepository } from "../repositories/Adm/createAdm/mongo-CreateAdm";

const admRouter = Router();

admRouter.post("/", async (req, res) => {
  const mongoCreateAdmRepository = new MongoCreateAdmRepository();

  const createAdmController = new CreateAdmController(mongoCreateAdmRepository);

  const { body, statusCode } = await createAdmController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export default admRouter;
