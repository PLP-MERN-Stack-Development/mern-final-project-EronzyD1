import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type UserRole = "JOB_SEEKER" | "EMPLOYER" | "ADMIN";

/**
 * Extends the normal Express Request with our auth fields,
 * but keeps all the usual properties like body, params, cookies, etc.
 */
export interface AuthRequest extends Request {
  userId?: string;
  role?: UserRole;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string; role: UserRole };

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requireRole = (role: UserRole) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.role || req.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
