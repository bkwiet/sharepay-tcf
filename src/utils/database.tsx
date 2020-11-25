import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
//console.log("MONGODB_URI =",MONGODB_URI);

let cachedDb: MongoClient = null;

export async function getDatabase(): Promise<MongoClient> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }
  
  const db = await MongoClient.connect(MONGODB_URI);
  cachedDb = db;
  return cachedDb;
}