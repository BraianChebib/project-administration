const {
  postUserController,
  modifyPostController,
  deletePostController,
  getPostsController,
} = require("../controller/postUserController");

const getPostsHandlers = async (req, res) => {
  try {
    const posts = await getPostsController();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postUserHandler = async (req, res) => {
  try {
    const { comment, UserId } = req.body;
    const postUser = await postUserController(comment, UserId);
    res.status(200).json(postUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const modifyPostUserHandler = async (req, res) => {
  try {
    const { id, comment } = req.body;
    const modifyPost = modifyPostController(id, comment);
    res.status(200).json(modifyPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePostUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await deletePostController(id);
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postUserHandler,
  modifyPostUserHandler,
  deletePostUserHandler,
  getPostsHandlers,
};
