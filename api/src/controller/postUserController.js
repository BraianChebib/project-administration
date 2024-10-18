const { Posts, Users } = require("../db");

/**
 * Obtiene todos los posteos de la base de datos.
 * @returns {Promise<Array>} - Retorna un array de posteos.
 */
const getPostsController = async () => {
  return await Posts.findAll();
};

/**
 * Crea un nuevo posteo en la base de datos.
 * @param {string} comment - Contenido del posteo.
 * @param {number} UserId - ID del usuario que realiza el posteo.
 * @returns {Promise<Object>} - Retorna un mensaje de éxito si el posteo fue creado.
 * @throws {Error} - Lanza un error si el campo 'comment' o 'UserId' está vacío.
 */
const postUserController = async (comment, UserId) => {
  if (!comment) throw new Error("Campo comment es un campo obligatorio");
  if (!UserId) throw new Error("El campo 'UserId' es obligatorio");
  await Posts.create({ comment, UserId });
  return { message: "Posteo creado correctamente" };
};

/**
 * Modifica un posteo existente.
 * @param {number} id - ID del posteo a modificar.
 * @param {string} comment - Nuevo contenido del posteo.
 * @returns {Promise<Object>} - Retorna un mensaje de éxito si el posteo fue modificado.
 * @throws {Error} - Lanza un error si no se encuentra el posteo a modificar.
 */
const modifyPostController = async (id, comment) => {
  const post = await Posts.findByPk(id);
  if (!post) throw new Error("No se encontro el posteo a modificar");
  post.comment = comment;
  await post.save();
  return { message: "Posteo modificado correctamente" };
};

/**
 * Elimina un posteo de la base de datos.
 * @param {number} id - ID del posteo a eliminar.
 * @returns {Promise<Object>} - Retorna un mensaje de éxito si el posteo fue eliminado.
 * @throws {Error} - Lanza un error si no se encuentra el posteo a eliminar.
 */
const deletePostController = async (id) => {
  const post = await Posts.findByPk(id);
  if (!post) throw new Error("No se encontro el posteo a eliminar");
  await post.destroy();
  return { message: "El posteo fue eliminado correctamente" };
};

/**
 * Obtiene un posteo por su ID.
 * @param {number} id - ID del posteo a buscar.
 * @returns {Promise<Object>} - Retorna el posteo correspondiente al ID.
 */
const getPostIdController = async (id) => {
  return await Posts.findByPk(id);
};

/**
 * Obtiene un posteo junto con los datos del usuario relacionado por el ID del posteo.
 * @param {number} idPost - ID del posteo.
 * @returns {Promise<Object>} - Retorna el posteo junto con los datos del usuario.
 * @throws {Error} - Lanza un error si no se encuentra el posteo.
 */
const getDateUserRelationPostController = async (idPost) => {
  console.log(idPost);
  // Busca el post por su id y usa include para traer también los datos del usuario que lo creó
  const post = await Posts.findByPk(idPost, {
    include: {
      model: Users,
      attributes: ["name", "lastName", "image"],
    },
  });

  if (!post) {
    throw new Error("No se encontró el post con el id proporcionado");
  }

  return post;
};

module.exports = {
  postUserController,
  modifyPostController,
  deletePostController,
  getPostsController,
  getPostIdController,
  getDateUserRelationPostController,
};
