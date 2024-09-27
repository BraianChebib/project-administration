const { Router } = require("express");
const userRoute = require("./usersRoutes");
const postUserRoute = require("./postUserRoute");

const MainRouter = Router();

MainRouter.use("/users", userRoute);
MainRouter.use("/postUser", postUserRoute);

module.exports = MainRouter;
