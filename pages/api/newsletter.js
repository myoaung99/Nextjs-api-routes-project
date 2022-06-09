import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || email.trim() === "" || !email.includes("@")) {
      res.status(422).json({ message: "Sorry invalid email" });
    }

    // connection url
    const url =
      "mongodb+srv://myomyintaung:myomyintaung2112@cluster0.n4m0q.mongodb.net/?retryWrites=true&w=majority";

    const client = await MongoClient.connect(url);
    const db = client.db("events");
    const result = await db.collection("newsletter").insertOne({ email });

    console.log(result);

    res.status(201).json({ staus: "SUCCESS", email });
  }
};

export default handler;
