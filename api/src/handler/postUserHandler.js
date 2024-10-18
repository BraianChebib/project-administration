const {
  postUserController,
  modifyPostController,
  deletePostController,
  getPostsController,
  getPostIdController,
  getDateUserRelationPostController,
} = require("../controller/postUserController");

/**
 * Maneja la solicitud para obtener todos los posteos.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>}
 */
const getPostsHandlers = async (req, res) => {
  try {
    const posts = await getPostsController();
    res.status(200).json(posts); // Retorna la lista de posteos
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Maneja la solicitud para crear un nuevo posteo.
 * @param {Object} req - El objeto de solicitud que contiene el cuerpo de la petición.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>}
 */
const postUserHandler = async (req, res) => {
  try {
    const { comment, UserId } = req.body;
    const postUser = await postUserController(comment, UserId);
    res.status(200).json(postUser); // Retorna el mensaje de éxito del controlador
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Maneja la solicitud para modificar un posteo existente.
 * @param {Object} req - El objeto de solicitud que contiene el cuerpo de la petición.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>}
 */
const modifyPostUserHandler = async (req, res) => {
  try {
    const { id, comment } = req.body;
    const modifyPost = await modifyPostController(id, comment);
    res.status(200).json(modifyPost); // Retorna el mensaje de éxito del controlador
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Maneja la solicitud para eliminar un posteo.
 * @param {Object} req - El objeto de solicitud que contiene los parámetros.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>}
 */
const deletePostUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await deletePostController(id);
    res.status(200).json(deletePost); // Retorna el mensaje de éxito del controlador
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Maneja la solicitud para obtener un posteo por su ID.
 * @param {Object} req - El objeto de solicitud que contiene los parámetros.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>}
 */
const getPostId = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = await getPostIdController(id);
    res.status(200).json(postId); // Retorna el posteo encontrado
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Maneja la solicitud para obtener un posteo junto con los datos del usuario relacionado.
 * @param {Object} req - El objeto de solicitud que contiene los parámetros.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>}
 */
const getDateUserRelationPostHandler = async (req, res) => {
  try {
    const { idPost } = req.params;
    const userRelationPost = await getDateUserRelationPostController(idPost);
    res.status(200).json(userRelationPost); // Retorna el posteo junto con los datos del usuario
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postUserHandler,
  modifyPostUserHandler,
  deletePostUserHandler,
  getPostsHandlers,
  getPostId,
  getDateUserRelationPostHandler,
};
