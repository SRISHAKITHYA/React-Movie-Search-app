import { DataTypes } from "sequelize";

export const userSchemaModel = (sequelize) => {
  return sequelize.define(
    "USERDETAILS",
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: DataTypes.STRING,
    },
    {
      tableName: "USERDETAILS",
      timestamps: false,
    }
  );
};
