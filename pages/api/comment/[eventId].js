import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://myomyintaung:myomyintaung2112@cluster0.n4m0q.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};

const insertDocument = async (client, document) => {
  const db = client.db("events");
  console.log("insert" + document);
  const result = await db.collection("comments").insertOne({ ...document });
  return result;
};

const getDocuments = async (client) => {
  const db = client.db("events");
  const documents = await db
    .collection("comments")
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return documents;
};

const handler = async (req, res) => {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ status: "FAIL", message: "Connecting to database fail" });
    return;
  }

  if (req.method === "POST") {
    const eventId = req.query.eventId;
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid comment" });
      return;
    }

    const newComment = { eventId, email, name, text };

    try {
      const result = await insertDocument(client, newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ status: "SUCCESS", comment: newComment });
      client.close();
    } catch (error) {
      res.status(502).json({ status: "FAIL", message: "Failed to send data" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getDocuments(client);
      res.status(200).json({ status: "SUCCESS", comments: documents });
      client.close();
    } catch (error) {
      res.status(502).json({ status: "FAIL", message: "Failed to send data " });
    }
  }
};

export default handler;
