const { Router } = require("express");
const {
  postUserHandler,
  modifyPostUserHandler,
  deletePostUserHandler,
  getPostsHandlers,
} = require("../handler/postUserHandler");

const postUserRoute = Router();

postUserRoute.post("/", postUserHandler);
postUserRoute.get("/", getPostsHandlers);
postUserRoute.put("/modifyPost", modifyPostUserHandler);
postUserRoute.delete("/deletePost", deletePostUserHandler);

module.exports = postUserRoute;
