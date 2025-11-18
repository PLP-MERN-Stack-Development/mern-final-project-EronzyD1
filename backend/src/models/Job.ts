import mongoose, { Schema } from "mongoose";

export interface IJob extends mongoose.Document {
  employerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  requiredSkills: string[];
  budget: number;
  rateType: "HOURLY" | "FIXED";
  location: {
    city: string;
    state: string;
    country: string;
  };
  deadline: Date;
  status: "ACTIVE" | "CLOSED" | "FILLED";
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    employerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: [String],
    budget: { type: Number, required: true },
    rateType: {
      type: String,
      enum: ["HOURLY", "FIXED"],
      default: "FIXED",
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "CLOSED", "FILLED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>("Job", JobSchema);


