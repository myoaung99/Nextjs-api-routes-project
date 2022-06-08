import fs from "fs";
import path from "path";
import process from "process";

const handler = (req, res) => {
  if (req.method === "POST") {
    const eventId = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    const cId = new Date().toISOString();

    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push({ cId, eventId, email, name, text });

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ status: "SUCCESS", comment: data });
  } else {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    res.status(200).json({ status: "SUCCESS", comment: data });
  }
};

export default handler;
