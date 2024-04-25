import { DataTypes } from "sequelize";

export const watchlistModel = (sequelize) => {
  return sequelize.define(
    "WATCHLIST",
    {
      imdbid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      year: DataTypes.STRING,
      poster: DataTypes.STRING,
    },
    {
      tableName: "WATCHLIST",
      timestamps: false,
    }
  );
};
