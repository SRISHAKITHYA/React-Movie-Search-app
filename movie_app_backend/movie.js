import { DataTypes } from "sequelize";

export const movieModel = (sequelize) => {
  return sequelize.define(
    "MOVIE",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      imdbid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      year: DataTypes.STRING,
      // imdbid: DataTypes.STRING,
      type: DataTypes.STRING,
      poster: DataTypes.STRING,
    },
    {
      tableName: "MOVIE",
      timestamps: false,
    }
  );
};
