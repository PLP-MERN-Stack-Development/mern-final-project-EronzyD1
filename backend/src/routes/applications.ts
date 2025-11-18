import express, { Response } from "express";
import { body, validationResult } from "express-validator";
import { authMiddleware, requireRole, AuthRequest } from "../middleware/auth.js";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

const router = express.Router();

// @route   POST /api/applications
// @desc    Apply for a job
// @access  Private/Job Seeker
router.post(
  "/",
  authMiddleware,
  requireRole("JOB_SEEKER"),
  [body("jobId").notEmpty(), body("coverLetter").optional().trim()],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { jobId, coverLetter } = req.body;

      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job || job.status !== "ACTIVE") {
        return res.status(404).json({ message: "Job not found" });
      }

      // Check if already applied
      const existingApp = await Application.findOne({
        jobId,
        jobSeekerId: req.userId,
      });

      if (existingApp) {
        return res.status(400).json({ message: "Already applied" });
      }

      const application = await Application.create({
        jobId,
        jobSeekerId: req.userId,
        coverLetter,
      });

      res.status(201).json({ application });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   GET /api/applications/my-applications
// @desc    Get job seeker's applications
// @access  Private/Job Seeker
router.get(
  "/my-applications/list",
  authMiddleware,
  requireRole("JOB_SEEKER"),
  async (req: AuthRequest, res: Response) => {
    try {
      const applications = await Application.find({ jobSeekerId: req.userId })
        .populate({
          path: "jobId",
          populate: { path: "employerId", select: "name company" },
        })
        .sort({ createdAt: -1 });

      res.json({ applications });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   PATCH /api/applications/:id/status
// @desc    Update application status
// @access  Private/Employer
router.patch(
  "/:id/status",
  authMiddleware,
  requireRole("EMPLOYER"),
  [body("status").isIn(["PENDING", "REVIEWED", "INTERVIEWED", "ACCEPTED", "REJECTED"])],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Verify employer owns the job
      const job = await Job.findById(application.jobId);
      if (job?.employerId.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      application.status = req.body.status;
      await application.save();

      res.json({ application });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
