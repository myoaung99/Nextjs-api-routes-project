import { connectDatabase, insertDocument } from "../../helpers/db-util";

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
      await insertDocument(client, "newsletter", { email });
      res.status(201).json({ staus: "SUCCESS", email });
      client.close();
    } catch (error) {
      res.status(502).json({ status: "FAIL", message: "Fail to insert data" });
    }
  }
};

export default handler;
