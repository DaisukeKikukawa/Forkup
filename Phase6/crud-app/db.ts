import mysql from "mysql2/promise";

export const startConnecton = async (): Promise<mysql.Connection> => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "node_crud_app",
  });
};
