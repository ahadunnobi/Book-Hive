import { MongoClient, type Db } from "mongodb";

/** Set `DATABASE_URL` in `.env.local` (see `env.example`). */
const uri =
  process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017/bookhive";

const globalForMongo = globalThis as typeof globalThis & {
  bookHiveMongoClient?: MongoClient;
};

export function getMongoClient(): MongoClient {
  if (!globalForMongo.bookHiveMongoClient) {
    globalForMongo.bookHiveMongoClient = new MongoClient(uri);
  }
  return globalForMongo.bookHiveMongoClient;
}

export function getDb(): Db {
  return getMongoClient().db();
}
