const mysql = require("mysql2/promise");
import { Sequelize } from 'sequelize';

require("dotenv").config();

const startConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
  });
};

const sequelizeConnection = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

export {
  startConnection,
  sequelizeConnection,
}
