import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";
import usersRouter from "./users";
import admRouter from "./adm";

const router = Router();

router.use("/users", usersRouter);
router.use("/adm", admRouter);
router.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
