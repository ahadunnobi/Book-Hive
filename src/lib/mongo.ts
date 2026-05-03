import { MongoClient, type Db } from "mongodb";

const uri = process.env.DATABASE_URL;

const globalForMongo = globalThis as typeof globalThis & {
  bookHiveMongoClient?: MongoClient;
};

export function getMongoClient(): MongoClient {
  if (!uri) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!globalForMongo.bookHiveMongoClient) {
    globalForMongo.bookHiveMongoClient = new MongoClient(uri);
  }
  return globalForMongo.bookHiveMongoClient;
}

export function getDb(): Db {
  return getMongoClient().db();
}
