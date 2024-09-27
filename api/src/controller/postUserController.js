const { Posts } = require("../db");

const getPostsController = async () => {
  return await Posts.findAll();
};

const postUserController = async (comment, UserId) => {
  if (!comment) throw new Error("Campo comment es un campo obligatorio");
  if (!UserId) throw new Error("El campo 'UserId' es obligatorio");
  await Posts.create({ comment, UserId });
  return { message: "Posteo creado correctamente" };
};

const modifyPostController = async (id, comment) => {
  const post = await Posts.findByPk(id);
  if (!post) throw new Error("No se encontro el posteo a modificar");
  post.comment = comment;
  await post.save();
  return { message: "Posteo modificado correctamente" };
};

const deletePostController = async (id) => {
  const post = await Posts.findByPk(id);
  if (!post) throw new Error("No se encontro el posteo a eliminar");
  await post.destroy();
  return { message: "El posteo fue eliminado correctamente" };
};

module.exports = {
  postUserController,
  modifyPostController,
  deletePostController,
  getPostsController,
};
