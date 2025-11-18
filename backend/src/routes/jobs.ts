import express from "express";
import { body, validationResult } from "express-validator";
import { authMiddleware, requireRole, AuthRequest } from "../middleware/auth.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

const router = express.Router();

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private/Employer
router.post(
  "/",
  authMiddleware,
  requireRole("EMPLOYER"),
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("requiredSkills").isArray(),
    body("budget").isNumeric(),
    body("rateType").isIn(["HOURLY", "FIXED"]),
    body("deadline").isISO8601(),
    body("location.city").optional().trim(),
    body("location.state").optional().trim(),
    body("location.country").optional().trim(),
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const jobData = {
        ...req.body,
        employerId: req.userId,
      };

      const job = await Job.create(jobData);
      res.status(201).json({ job });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   GET /api/jobs
// @desc    Get all active jobs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, skills, location } = req.query;

    const query: any = { status: "ACTIVE" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (skills) {
      query.requiredSkills = { $in: String(skills).split(",") };
    }

    if (location) {
      query["location.city"] = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(query)
      .populate("employerId", "name company email")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Job.countDocuments(query);

    res.json({ jobs, total, page: Number(page), limit: Number(limit) });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employerId",
      "name company email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ job });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private/Employer
router.put(
  "/:id",
  authMiddleware,
  requireRole("EMPLOYER"),
  async (req: AuthRequest, res) => {
    try {
      const job = await Job.findOne({
        _id: req.params.id,
        employerId: req.userId,
      });

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      Object.assign(job, req.body);
      await job.save();

      res.json({ job });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private/Employer
router.delete("/:id", authMiddleware, requireRole("EMPLOYER"), async (req: AuthRequest, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      employerId: req.userId,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs/my-jobs
// @desc    Get employer's jobs
// @access  Private/Employer
router.get("/my-jobs/list", authMiddleware, requireRole("EMPLOYER"), async (req: AuthRequest, res) => {
  try {
    const jobs = await Job.find({ employerId: req.userId }).sort({
      createdAt: -1,
    });

    res.json({ jobs });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs/:id/applicants
// @desc    Get applicants for a job
// @access  Private/Employer
router.get("/:id/applicants", authMiddleware, requireRole("EMPLOYER"), async (req: AuthRequest, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const applications = await Application.find({ jobId: req.params.id })
      .populate("jobSeekerId", "name email bio skills portfolioLink")
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;


