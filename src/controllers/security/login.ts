import { Request, Response } from "express";
import { db } from "../../databases/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

const login = async (req: Request, res: Response) => {
  const jwtSecret: any = process.env.JWT_SECRET;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  const SQL = `SELECT * FROM users WHERE username = '${username}'`;

  db.query<RowDataPacket[]>(SQL, async (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error logging in" });
    } else if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          { id: user.id, role_id: user.role_id, user: user.username },
          jwtSecret,
          {
            expiresIn: 86400,
          }
        );

        res.status(200).json({
          success: "User logged in",
          token,
          user: {
            id: user.id,
            username: user.username,
            role_id: user.role_id,
          },
        });
      }
    }
  });
};

export { login };
