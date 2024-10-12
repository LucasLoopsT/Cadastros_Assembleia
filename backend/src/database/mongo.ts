import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "";

    const client = new Mongo(url);
    const db = client.db("test");
    this.db = db;

    console.log("MongoDB Atlas Connected.");
  },
};
