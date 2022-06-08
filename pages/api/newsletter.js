import fs from "fs";
import path from "path";
import process from "process";

const handler = (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    const filePath = path.join(process.cwd(), "data", "newsletter-signup.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(email);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ staus: "SUCCESS", email });
  } else {
    res.status(404).json({ message: "Sorry!!" });
  }
};

export default handler;
