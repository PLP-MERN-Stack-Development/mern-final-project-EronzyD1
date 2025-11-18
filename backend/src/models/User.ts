import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  role: "JOB_SEEKER" | "EMPLOYER" | "ADMIN";
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  avatar?: string;
  company?: string; // For employers
  bio?: string;
  skills?: string[];
  portfolioLink?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: ["JOB_SEEKER", "EMPLOYER", "ADMIN"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    phone: String,
    avatar: String,
    company: String,
    bio: String,
    skills: [String],
    portfolioLink: String,
    location: {
      city: String,
      state: String,
      country: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);


