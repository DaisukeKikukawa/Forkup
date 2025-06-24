const mysql = require("mysql2/promise");
import { Sequelize } from 'sequelize';

require("dotenv").config();

const getDbName = () => {
  if (process.env.NODE_ENV === "test") {
    return process.env.DB_NAME || "library_system_test";
  }
  return process.env.DB_NAME;
};

const startConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: getDbName(),
  });
};

const sequelizeConnection = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${getDbName()}`)

export {
  startConnection,
  sequelizeConnection,
}
