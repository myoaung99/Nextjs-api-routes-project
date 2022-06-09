import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  // connection url
  const url =
    "mongodb+srv://myomyintaung:myomyintaung2112@cluster0.n4m0q.mongodb.net/?retryWrites=true&w=majority";

  const client = await MongoClient.connect(url);

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

    const db = client.db("events");

    const result = await db.collection("comments").insertOne({ ...newComment });

    console.log(result);

    newComment.id = result.insertedId;
    res.status(201).json({ status: "SUCCESS", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db("events");
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 }) // sort by descending (last comments appear first)
      .toArray();
    res.status(200).json({ status: "SUCCESS", comments: documents });
  }

  client.close();
};

export default handler;
