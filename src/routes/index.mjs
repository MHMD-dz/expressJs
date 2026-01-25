import { Router } from "express";
import usersRouter from "./usersRoutes.mjs";
import productRouter from "./productRouter.mjs";

const indexRouter = Router();

indexRouter.use( usersRouter );
indexRouter.use( productRouter );

export default indexRouter ;