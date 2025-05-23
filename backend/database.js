import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { logEvents } from "./src/middlewares/logger.middlewares.js";

let db;

export async function initDb() {
    
  db = await open({
    filename: "./src/database/banco.db", 
    driver: sqlite3.Database,
  });

  logEvents("Banco de dados inicializado com sucesso", "data_base.log");
  return db;

}

export async function symbols() {
    const db = getDb();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS symbols (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT NOT NULL,
      people VARCHAR(40) NOT NULL,
      language VARCHAR(20) NOT NULL,
      contexto TEXT NOT NULL,
      type VARCHAR(20) NOT NULL,
      char VARCHAR(4) NOT NULL
    );
  `);

    logEvents("Banco inicializado com sucesso", "data_base.log");
    return db;
} 

export function getDb() {
  if (!db) {
    logEvents("Banco de não inicializado", "data_base.log");
  }

  return db;
}