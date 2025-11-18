import express from "express";
import { body, validationResult } from "express-validator";
import { authMiddleware, requireRole, AuthRequest } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get("/", authMiddleware, requireRole("ADMIN"), async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json({ users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put(
  "/:id",
  authMiddleware,
  [
    body("name").optional().trim(),
    body("bio").optional().trim(),
    body("skills").optional().isArray(),
    body("portfolioLink").optional().trim(),
    body("phone").optional().trim(),
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, bio, skills, portfolioLink, phone, location } = req.body;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          bio,
          skills,
          portfolioLink,
          phone,
          location,
        },
        { new: true }
      ).select("-passwordHash");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;


