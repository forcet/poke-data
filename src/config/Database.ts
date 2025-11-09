import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.MONGODB_USER ?? "forcet";
const password = process.env.MONGODB_PASSWORD ?? "pokepassword";
const host = process.env.MONGODB_HOST ?? "localhost";
const port = process.env.MONGO_PORT ?? "27017";
const dbName = process.env.MONGODB_DBNAME ?? "pokeBase";

if (!user || !password || !host) {
  throw new Error("Faltan variables MONGODB_USER, MONGODB_PASSWORD o MONGODB_HOST en .env");
}

const encodedUser = encodeURIComponent(user);
const encodedPassword = encodeURIComponent(password);

const uri = `mongodb://${encodedUser}:${encodedPassword}@${host}:${port}/${dbName}?authSource=admin`;

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDB(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  console.log("Conectado a MongoDB");

  db = client.db(dbName);
  return db;
}

export function getDB(): Db {
    if (!db) {
      throw new Error("La base de datos aún no está inicializada. Llama primero a connectToDB()");
    }
    return db;
  }