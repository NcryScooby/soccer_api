import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, jwtSecret);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

export { tokenMiddleware };
