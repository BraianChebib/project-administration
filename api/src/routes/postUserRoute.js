const { Router } = require("express");
const {
  postUserHandler,
  modifyPostUserHandler,
  deletePostUserHandler,
  getPostsHandlers,
  getPostId,
  getDateUserRelationPostHandler,
} = require("../handler/postUserHandler");

const postUserRoute = Router();

postUserRoute.post("/", postUserHandler);
postUserRoute.get("/", getPostsHandlers);
postUserRoute.put("/modifyPost", modifyPostUserHandler);
postUserRoute.get("/:id", getPostId);
postUserRoute.get("/relationUser/:idPost", getDateUserRelationPostHandler);
postUserRoute.delete("/deletePost/:id", deletePostUserHandler);

module.exports = postUserRoute;
