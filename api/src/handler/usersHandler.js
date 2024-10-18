const {
  getUserController,
  getUserByIdController,
  modifyUserController,
  deleteUserController,
  createUserController,
  userProfileController,
  userProfileControllerByEmail,
} = require("../controller/usersController");

/**
 * Maneja la solicitud para obtener todos los usuarios o buscar un usuario por nombre.
 * @param {Object} req - El objeto de solicitud, que puede contener un query 'name'.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con una lista de usuarios o un mensaje de error.
 */
const getUsersHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await getUserController(name);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al obtener usuarios: ${error.message}` });
  }
};

/**
 * Maneja la solicitud para obtener un usuario por su ID.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con el usuario correspondiente al ID o un mensaje de error.
 */
const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdController(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: `Usuario no encontrado: ${error.message}` });
  }
};

/**
 * Maneja la solicitud para crear un nuevo usuario.
 * @param {Object} req - El objeto de solicitud, que debe contener los datos del nuevo usuario.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con el nuevo usuario creado o un mensaje de error.
 */
const createUserHandler = async (req, res) => {
  try {
    const { name, lastName, image, email, phone, nameUser, password } =
      req.body;
    const newUser = await createUserController(
      name,
      lastName,
      image,
      email,
      phone,
      nameUser,
      password
    );
    res.status(201).json(newUser); // 201 Created
  } catch (error) {
    res.status(400).json({ error: `Error al crear usuario: ${error.message}` });
  }
};

/**
 * Maneja la solicitud para modificar un usuario existente.
 * @param {Object} req - El objeto de solicitud que debe contener el ID del usuario y los datos a modificar.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con el usuario modificado o un mensaje de error.
 */
const modifyUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, image, email, phone } = req.body;
    const modifiedUser = await modifyUserController(
      id,
      name,
      lastName,
      image,
      email,
      phone
    );
    res.status(200).json(modifiedUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error al modificar usuario: ${error.message}` });
  }
};

/**
 * Maneja la solicitud para eliminar un usuario.
 * @param {Object} req - El objeto de solicitud que debe contener el ID del usuario a eliminar.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con un mensaje de confirmación o un mensaje de error.
 */
const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserController(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res
      .status(404)
      .json({ error: `Error al eliminar usuario: ${error.message}` });
  }
};

/**
 * Maneja la solicitud para obtener el perfil de un usuario.
 * Permite la autenticación mediante nombre de usuario y contraseña o por email.
 * @param {Object} req - El objeto de solicitud que debe contener nombre de usuario y contraseña, o email.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Promise<void>} Responde con el perfil del usuario o un mensaje de error.
 */
const userProfileHandler = async (req, res) => {
  try {
    const { nameUser, password, email } = req.body;
    let userProfile;

    // Verificar si se proporcionó un email
    if (email) {
      userProfile = await userProfileControllerByEmail(email);
    } else if (nameUser && password) {
      userProfile = await userProfileController(nameUser, password);
    } else {
      return res
        .status(400)
        .json({ error: "Nombre de usuario o email requerido" });
    }

    if (!userProfile) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al obtener perfil de usuario: ${error.message}` });
  }
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  modifyUserHandler,
  deleteUserHandler,
  createUserHandler,
  userProfileHandler,
};
