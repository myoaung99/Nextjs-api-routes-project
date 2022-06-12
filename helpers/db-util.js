import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://myomyintaung:myomyintaung2112@cluster0.n4m0q.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db("events"); // db(dbName)
  const result = await db.collection(collection).insertOne({ ...document });
  return result;
};

export const getDocuments = async (client, collection, sort) => {
  const db = client.db("events");
  const documents = await db
    .collection(collection)
    .find({})
    .sort(sort)
    .toArray();

  return documents;
};
