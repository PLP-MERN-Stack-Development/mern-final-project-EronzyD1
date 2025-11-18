import mongoose, { Schema } from "mongoose";

export interface IApplication extends mongoose.Document {
  jobId: mongoose.Types.ObjectId;
  jobSeekerId: mongoose.Types.ObjectId;
  coverLetter?: string;
  status: "PENDING" | "REVIEWED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobSeekerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverLetter: String,
    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "INTERVIEWED", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IApplication>("Application", ApplicationSchema);


