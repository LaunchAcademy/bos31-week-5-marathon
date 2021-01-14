import express from "express";

import showsRouter from "./api/v1/showsRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router(); //place your server-side routes here

rootRouter.use("/api/v1/shows", showsRouter)
rootRouter.use("/", clientRouter);

export default rootRouter;
