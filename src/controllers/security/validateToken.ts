import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

const validateToken = (req: Request, res: Response) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const jwtSecret: any = process.env.JWT_SECRET;
    const decoded = verify(token, jwtSecret);
    return res.status(200).json({ success: "Token is valid", decoded });
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid" });
  }
};

export { validateToken };
