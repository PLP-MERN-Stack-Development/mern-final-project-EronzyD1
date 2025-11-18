import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

// Helper to set JWT cookie
const setAuthCookie = (res: Response, userId: string, role: string) => {
  const token = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  authLimiter,
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").trim().isLength({ min: 1 }),
    body("role").isIn(["JOB_SEEKER", "EMPLOYER"]),
    body("company").optional().trim(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, role, company } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        email,
        passwordHash,
        name,
        role,
        company,
      });

      const u = user as any; // cast to avoid TS 'unknown' on _id / role

      setAuthCookie(res, u._id.toString(), u.role);

      res.status(201).json({
        user: {
          id: u._id,
          email: u.email,
          name: u.name,
          role: u.role,
          company: u.company,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, (user as any).passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const u = user as any;

      setAuthCookie(res, u._id.toString(), u.role);

      res.json({
        user: {
          id: u._id,
          email: u.email,
          name: u.name,
          role: u.role,
          company: u.company,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = (req as any).cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string; role: string };

    const user = await User.findById(decoded.userId).select(
      "-passwordHash"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
