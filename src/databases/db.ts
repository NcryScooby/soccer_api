// Configura biblioteca de banco de dados
import mysql from "mysql2";

// Configura o arquivo .env
import dotenv from "dotenv";
dotenv.config();

// Conecta com o banco SQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export { db };
