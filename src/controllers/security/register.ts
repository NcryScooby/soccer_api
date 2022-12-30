import { Request, Response } from "express";
import { db } from "../../databases/db";
import bcrypt from "bcrypt";
import { checkPasswordComplexity } from "../../functions/checkPasswordComplexity";
import { RowDataPacket } from "mysql2";
import { sendEmail } from "../../functions/sendEmail";
import { sendSMS } from "../../functions/sendSMS";

const register = async (req: Request, res: Response) => {
  const {
    username,
    password,
    first_name,
    last_name,
    email,
    phone,
    place_birth,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (
    !username ||
    !password ||
    !first_name ||
    !last_name ||
    !email ||
    !phone ||
    !place_birth
  ) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  if (!checkPasswordComplexity(password)) {
    return res
      .status(400)
      .json({ error: "Your password is weak, please enter another password" });
  }

  const SQL = `SELECT username FROM users WHERE username = '${username}'`;

  db.query<RowDataPacket[]>(SQL, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error inserting user" });
    } else if (results.length > 0) {
      res.status(409).json({ error: "User already exists" });
    } else {
      const SQL = `INSERT INTO users (username, password, first_name, last_name, email, phone, place_birth) VALUES ('${username}', '${hashedPassword}', '${first_name}', '${last_name}', '${email}', '${phone}', '${place_birth}');`;

      db.query<RowDataPacket[]>(SQL, (error) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Error inserting user" });
        } else {
          sendEmail(first_name, last_name, email);
          sendSMS(phone);
          res.status(201).json({ success: "User created" });
        }
      });
    }
  });
};

export { register };
