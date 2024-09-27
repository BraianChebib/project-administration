const {
  getUserController,
  getUserByIdController,
  modifyUserController,
  deleteUserController,
  createUserController,
  userProfileController,
} = require("../controller/usersController");

const getUsersHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const getUser = await getUserController(name);
      res.status(200).json(getUser);
    } else {
      const getUser = await getUserController();
      res.status(200).json(getUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await getUserByIdController(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const modifyUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, image, email, phone } = req.body;
    const modifyUser = await modifyUserController(
      id,
      name,
      lastName,
      image,
      email,
      phone
    );
    res.status(200).json(modifyUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserController(id);
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userProfileHandler = async (req, res) => {
  try {
    const { nameUser, password } = req.body;
    const userProfile = await userProfileController(nameUser, password);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
