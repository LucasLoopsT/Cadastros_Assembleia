import { Router } from "express";
import usersRouter from "./users";
import admRouter from "./adm";

const router = Router();

router.use("/users", usersRouter);
router.use("/adm", admRouter);

export default router;
