import { DataTypes } from "sequelize";

export const movieInfoModel = (sequelize) => {
  return sequelize.define(
    "MOVIEINFO",
    {
      imdbid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      year: DataTypes.STRING,
      rated: DataTypes.STRING,
      released: DataTypes.STRING,
      runtime: DataTypes.STRING,
      genre: DataTypes.STRING,
      director: DataTypes.STRING,
      poster: DataTypes.STRING,
      trailer: DataTypes.STRING,
    },
    {
      tableName: "MOVIEINFO",
      timestamps: false,
    }
  );
};
