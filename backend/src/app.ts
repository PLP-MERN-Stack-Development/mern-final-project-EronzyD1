import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import jobRoutes from "./routes/jobs.js";
import applicationRoutes from "./routes/applications.js";

dotenv.config();

const app = express();

// --- CORS CONFIG ---
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CORS_ORIGIN,
  process.env.CLIENT_URL,
]
  .filter(Boolean); // remove undefined values

app.use(
  cors({
    origin(origin, callback) {
      // allow Postman / curl (no origin) & our whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

// --- CORE MIDDLEWARE ---
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
