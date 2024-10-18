const { Users, Posts } = require("../db");
const { Op } = require("sequelize");

/**
 * Obtiene todos los usuarios o busca usuarios por nombre.
 * @param {string} name - Nombre del usuario a buscar.
 * @returns {Promise<Array>} - Retorna una lista de usuarios que coinciden con el nombre.
 * @throws {Error} - Lanza un error si no se encuentra ningún usuario.
 */
const getUserController = async (name) => {
  let users;
  if (name) {
    users = await Users.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
  } else users = await Users.findAll();

  if (users.length === 0) throw new Error(`no se encontro el usuario: ${name}`);
  return users;
};

/**
 * Obtiene un usuario por su ID.
 * @param {number} id - ID del usuario a buscar.
 * @returns {Promise<Object>} - Retorna el usuario correspondiente al ID.
 * @throws {Error} - Lanza un error si no se encuentra el usuario.
 */
const getUserByIdController = async (id) => {
  const user = await Users.findByPk(id, {
    include: { model: Posts, attributes: ["id", "comment"] },
  });
  if (!user) {
    throw new Error(`no se encontro el usuario con el id: ${id}`);
  }
  return user;
};

/**
 * Crea un nuevo usuario.
 * @param {string} name - Nombre del usuario.
 * @param {string} lastName - Apellido del usuario.
 * @param {string} image - URL de la imagen del usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} phone - Número de teléfono del usuario.
 * @param {string} nameUser - Nombre de usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<Object>} - Retorna un mensaje de éxito si el usuario fue creado.
 * @throws {Error} - Lanza un error si falta algún campo obligatorio o si el usuario ya existe.
 */
const createUserController = async (
  name,
  lastName,
  image,
  email,
  phone,
  nameUser,
  password
) => {
  // Verificaciones de los campos obligatorios
  if (!name) throw new Error("El campo name es obligatorio");
  if (!lastName) throw new Error("El campo lastName es obligatorio");
  if (!email) throw new Error("El campo email es obligatorio");
  if (!phone) throw new Error("El campo phone es obligatorio");
  if (!nameUser) throw new Error("El campo nameUser es obligatorio");
  if (!password) throw new Error("El campo password es obligatorio");

  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await Users.findOne({
    where: {
      [Op.or]: [
        { email: email }, // Verificar por email
      ],
    },
  });

  // Si el usuario ya existe, devolver un mensaje
  if (existingUser) {
    throw new Error("El usuario con este email ya existe");
  }

  // Si el usuario no existe, se crea
  await Users.create({
    name,
    lastName,
    image,
    email,
    phone,
    nameUser,
    password,
  });

  return { message: "Usuario creado correctamente" };
};

/**
 * Modifica un usuario existente.
 * @param {number} id - ID del usuario a modificar.
 * @param {string} name - Nuevo nombre del usuario.
 * @param {string} lastName - Nuevo apellido del usuario.
 * @param {string} image - Nueva URL de la imagen del usuario.
 * @param {string} email - Nuevo correo electrónico del usuario.
 * @param {string} phone - Nuevo número de teléfono del usuario.
 * @returns {Promise<Object>} - Retorna un mensaje de éxito si el usuario fue modificado.
 * @throws {Error} - Lanza un error si el usuario no se encuentra.
 */
const modifyUserController = async (
  id,
  name,
  lastName,
  image,
  email,
  phone
) => {
  const user = await Users.findByPk(id);
  if (!user) {
    throw new Error("Usuario para modificar no encontrado");
  }
  user.name = name || user.name;
  user.lastName = lastName || user.lastName;
  user.image = image || user.image;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  await user.save();
  return { message: "Usuario modificado correctamente" };
};

/**
 * Elimina un usuario de la base de datos con el id proporcionado.
 * @param {number} id - ID del usuario a eliminar.
 * @returns {Promise<Object>} - Retorna un mensaje de éxito si el usuario fue eliminado.
 * @throws {Error} - Lanza un error si el usuario no se encuentra.
 */
const deleteUserController = async (id) => {
  const deleteUser = await Users.findByPk(id);
  if (!deleteUser)
    throw new Error(
      `no se encontró el usuario: ${id} para eliminar en la base de datos`
    );
  await deleteUser.destroy();
  return { message: "Usuario eliminado correctamente" };
};

/**
 * Obtiene el perfil del usuario mediante nombre de usuario y contraseña y los posteos que realizó.
 * @param {string} nameUser - Nombre de usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<Object>} - Retorna el perfil del usuario.
 * @throws {Error} - Lanza un error si los datos ingresados son incorrectos.
 */
const userProfileController = async (nameUser, password) => {
  const user = await Users.findOne({
    where: { nameUser, password },
    include: { model: Posts, attributes: ["id", "comment"] },
  });

  if (!user) throw new Error("Datos ingresados incorrectos");
  else return user;
};

/**
 * Obtiene un usuario mediante su correo electrónico.
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<Object>} - Retorna el usuario correspondiente al email.
 * @throws {Error} - Lanza un error si el usuario no se encuentra.
 */
const userProfileControllerByEmail = async (email) => {
  const user = await Users.findOne({ where: { email } }); // Asegúrate de usar el modelo correcto
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user; // Asegúrate de que devuelvas el usuario completo o los campos necesarios
};

module.exports = {
  getUserController,
  getUserByIdController,
  modifyUserController,
  deleteUserController,
  createUserController,
  userProfileController,
  userProfileControllerByEmail,
};
