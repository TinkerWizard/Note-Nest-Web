import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../Utils/AuthUtils";
import { AuthenticatedRequest } from "./type";

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  const secret: string = process.env.JWT_SECRET ?? "";

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    const decoded = jwt.verify(
      token,
      secret
    );
    req.user = decoded; // Assign the decoded token to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
