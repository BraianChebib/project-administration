const { DataTypes } = require("sequelize");

const posts = (sequelize) => {
  sequelize.define(
    "Posts",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};

module.exports = posts;
