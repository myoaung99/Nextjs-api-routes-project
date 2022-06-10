import {
  connectDatabase,
  getDocuments,
  insertDocument,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  let client;
  try {
    client = await connectDatabase();
    console.log("Connected to database");
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
      const result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ status: "SUCCESS", comment: newComment });
    } catch (error) {
      res.status(502).json({ status: "FAIL", message: "Failed to send data" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getDocuments(client, "comments", { _id: -1 });
      console.log(documents);
      res.status(200).json({ status: "SUCCESS", comments: documents });
    } catch (error) {
      res.status(502).json({ status: "FAIL", message: "Failed to send data " });
    }
  }

  client.close();
};

export default handler;
