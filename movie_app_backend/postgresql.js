import { Sequelize } from "sequelize";
import config from "./config.js";

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,

  {
    host: config.host,
    dialect: "postgres",
    logging: false,
    port: config.port,
    ssl: false,
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Postgres connection established successfully.");
  })
  .catch((err) => {
    console.log(`Postgres connection unsuccessful:${err}`);
  });

export default sequelize;
