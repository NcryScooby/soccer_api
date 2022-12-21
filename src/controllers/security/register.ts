import { Request, Response } from "express";
import { db } from "../../databases/db";
import bcrypt from "bcrypt";
import { checkPasswordComplexity } from "../../functions/checkPasswordComplexity";
import { RowDataPacket } from "mysql2";
import nodemailer from "nodemailer";

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
          const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: "Welcome to Super League",
            html: `
              <h1>Hi ${first_name} ${last_name}</h1>
              <p>welcome to Super League</p>
            `,
          };

          transporter.sendMail(mailOptions, (error) => {
            if (error) {
              console.log(error);
            }
          });

          res.status(201).json({ success: "User created" });
        }
      });
    }
  });
};

export { register };
