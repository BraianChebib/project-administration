const { Users, Posts } = require("../db");
const { Op, where } = require("sequelize");

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

const getUserByIdController = async (id) => {
  const user = await Users.findByPk(id, {
    include: { model: Posts, attributes: ["id", "comment"] },
  });
  if (!user) {
    throw new Error(`no se encontro el usuario con el id: ${id}`);
  }
  return user;
};

const createUserController = async (
  name,
  lastName,
  image,
  email,
  phone,
  nameUser,
  password
) => {
  if (!name) throw new Error(`el Campo name es obligatorio`);
  if (!lastName) throw new Error(`el Campo lastName es obligatorio`);
  if (!email) throw new Error(`el Campo email es obligatorio`);
  if (!phone) throw new Error(`el Campo phone es obligatorio`);
  if (!nameUser) throw new Error(`el Campo nameUser es obligatorio`);
  if (!password) throw new Error(`el Campo password es obligatorio`);
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

const deleteUserController = async (id) => {
  const deleteUser = await Users.findByPk(id);
  if (!deleteUser)
    throw new Error(
      `no se encontró el usuario: ${id} para eliminar en la base de datos`
    );
  await deleteUser.destroy();
  return { message: "Usuario eliminado correctamente" };
};

const userProfileController = async (nameUser, password) => {
  const user = await Users.findOne({
    where: { nameUser, password },
    include: { model: Posts, attributes: ["id", "comment"] },
  });

  if (!user) throw new Error("Datos ingresados incorrectos");
  else return user;
};

module.exports = {
  getUserController,
  getUserByIdController,
  modifyUserController,
  deleteUserController,
  createUserController,
  userProfileController,
};
