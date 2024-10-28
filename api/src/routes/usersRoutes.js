const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  modifyUserHandler,
  deleteUserHandler,
  createUserHandler,
  userProfileHandler,
  googleAuth,
} = require("../handler/usersHandler");

const userRoute = Router();

userRoute.get("/", getUsersHandler);
userRoute.post("/createUser", createUserHandler);
userRoute.post("/userProfile", userProfileHandler);
userRoute.post("/google-auth", googleAuth);
userRoute.put("/modifyUser/:id", modifyUserHandler);
userRoute.delete("/deleteUser/:id", deleteUserHandler);
userRoute.get("/:id", getUserByIdHandler);

module.exports = userRoute;
