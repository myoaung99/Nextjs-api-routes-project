import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://myomyintaung:myomyintaung2112@cluster0.n4m0q.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};

const insertDocument = async (client, document) => {
  const db = client.db("events");
  const result = await db
    .collection("newsletter")
    .insertOne({ email: document });

  return result;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || email.trim() === "" || !email.includes("@")) {
      res.status(422).json({ message: "Sorry invalid email" });
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ status: "FAIL", message: "Connection to database failed." });
      return;
    }

    try {
      await insertDocument(client, email);
      res.status(201).json({ staus: "SUCCESS", email });
      client.close();
    } catch (error) {
      res.status(502).json({ status: "FAIL", message: "Fail to insert data" });
      return;
    }
  }
};

export default handler;
