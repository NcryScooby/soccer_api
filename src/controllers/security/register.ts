import { Request, Response } from "express";
import { db } from "../../databases/db";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!username || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  const SQL = `SELECT username FROM users WHERE username = '${username}'`;

  db.query(SQL, (error: any, results: any) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error inserting user" });
    } else if (results.length > 0) {
      res.status(409).json({ error: "User already exists" });
    } else {
      const SQL = `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}')`;

      db.query(SQL, (error: any, results: any) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Error inserting user" });
        } else {
          res.status(201).json({ success: "User created" });
        }
      });
    }
  });
};

export { register };
