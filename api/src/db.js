const { Sequelize } = require("sequelize");
require("dotenv").config();
const users = require("./models/Users");
const posts = require("./models/Posts");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

users(sequelize);
posts(sequelize);

const { Users, Posts } = sequelize.models;

Users.hasMany(Posts, { onDelete: "CASCADE" });
Posts.belongsTo(Users);

module.exports = { sequelize, ...sequelize.models };
