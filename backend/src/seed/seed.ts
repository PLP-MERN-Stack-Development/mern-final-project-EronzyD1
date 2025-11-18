import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB(process.env.MONGODB_URI as string);

    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log("🗑️  Cleared existing data");

    const passwordHash = await bcrypt.hash("password123", 10);
    const adminPasswordHash = await bcrypt.hash("admin123", 10);

    // Create Admin
    const admin = await User.create({
      role: "ADMIN",
      email: "admin@jobhub.com",
      passwordHash: adminPasswordHash,
      name: "Admin User",
      bio: "System Administrator",
    });
    console.log("✅ Created admin user");

    // Create Employers
    const employers = await User.insertMany([
      {
        role: "EMPLOYER",
        email: "employer1@example.com",
        passwordHash,
        name: "John Smith",
        company: "Tech Solutions Inc",
        bio: "Looking for talented developers to join our team",
        location: { city: "San Francisco", state: "CA", country: "USA" },
      },
      {
        role: "EMPLOYER",
        email: "employer2@example.com",
        passwordHash,
        name: "Sarah Johnson",
        company: "Creative Studios",
        bio: "We hire creative minds",
        location: { city: "New York", state: "NY", country: "USA" },
      },
      {
        role: "EMPLOYER",
        email: "employer3@example.com",
        passwordHash,
        name: "Mike Davis",
        company: "Digital Marketing Hub",
        bio: "Leading digital marketing agency",
        location: { city: "Los Angeles", state: "CA", country: "USA" },
      },
    ]);
    console.log("✅ Created 3 employers");

    // Create Job Seekers
    const jobSeekers = await User.insertMany([
      {
        role: "JOB_SEEKER",
        email: "seeker1@example.com",
        passwordHash,
        name: "Alex Thompson",
        bio: "Full-stack developer passionate about building amazing web applications",
        skills: ["React", "Node.js", "MongoDB", "TypeScript", "Express"],
        portfolioLink: "https://alexportfolio.com",
        location: { city: "San Francisco", state: "CA", country: "USA" },
      },
      {
        role: "JOB_SEEKER",
        email: "seeker2@example.com",
        passwordHash,
        name: "Emma Wilson",
        bio: "UI/UX designer with 3 years of experience creating beautiful interfaces",
        skills: ["Figma", "Adobe XD", "Sketch", "Illustrator", "Photoshop"],
        portfolioLink: "https://emmadesigns.com",
        location: { city: "New York", state: "NY", country: "USA" },
      },
      {
        role: "JOB_SEEKER",
        email: "seeker3@example.com",
        passwordHash,
        name: "Jordan Lee",
        bio: "Marketing specialist focused on digital campaigns and brand growth",
        skills: ["Google Analytics", "SEO", "Content Writing", "Social Media"],
        portfolioLink: "https://jordanmarketing.com",
        location: { city: "Los Angeles", state: "CA", country: "USA" },
      },
      {
        role: "JOB_SEEKER",
        email: "seeker4@example.com",
        passwordHash,
        name: "Taylor Chen",
        bio: "Backend developer specializing in scalable systems",
        skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
        portfolioLink: "https://taylorchen.dev",
        location: { city: "San Francisco", state: "CA", country: "USA" },
      },
      {
        role: "JOB_SEEKER",
        email: "seeker5@example.com",
        passwordHash,
        name: "Morgan Brown",
        bio: "Content writer and copy editor with expertise in tech and lifestyle niches",
        skills: ["Content Writing", "Copy Editing", "SEO", "WordPress"],
        portfolioLink: "https://morganwrites.com",
        location: { city: "Austin", state: "TX", country: "USA" },
      },
    ]);
    console.log("✅ Created 5 job seekers");

    // Create Jobs
    const jobs = await Job.insertMany([
      {
        employerId: employers[0]._id,
        title: "Senior Full-Stack Developer",
        description:
          "We're looking for an experienced full-stack developer to join our dynamic team. You'll work on cutting-edge web applications using React and Node.js.",
        requiredSkills: ["React", "Node.js", "TypeScript", "MongoDB"],
        budget: 8000,
        rateType: "FIXED",
        location: { city: "San Francisco", state: "CA", country: "USA" },
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[0]._id,
        title: "Junior Frontend Developer",
        description:
          "Perfect entry-level position for someone looking to start their career. You'll work with our senior developers to build amazing user interfaces.",
        requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
        budget: 3500,
        rateType: "FIXED",
        location: { city: "San Francisco", state: "CA", country: "USA" },
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[1]._id,
        title: "UI/UX Designer",
        description:
          "Join our creative team to design stunning user interfaces for web and mobile applications. Must have experience with Figma and design systems.",
        requiredSkills: ["Figma", "Adobe XD", "Sketch", "Design Systems"],
        budget: 6000,
        rateType: "FIXED",
        location: { city: "New York", state: "NY", country: "USA" },
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[1]._id,
        title: "Graphic Designer",
        description:
          "We need a talented graphic designer to create marketing materials, logos, and brand assets for our clients.",
        requiredSkills: ["Illustrator", "Photoshop", "InDesign"],
        budget: 4000,
        rateType: "FIXED",
        location: { city: "New York", state: "NY", country: "USA" },
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[2]._id,
        title: "Digital Marketing Specialist",
        description:
          "Looking for a marketing expert to help manage our digital campaigns, social media, and content strategy.",
        requiredSkills: ["Google Analytics", "SEO", "Social Media", "Content Strategy"],
        budget: 5000,
        rateType: "FIXED",
        location: { city: "Los Angeles", state: "CA", country: "USA" },
        deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[2]._id,
        title: "Content Writer",
        description:
          "We need a skilled content writer to create engaging blog posts, articles, and web content on various topics.",
        requiredSkills: ["Content Writing", "SEO", "WordPress"],
        budget: 2500,
        rateType: "FIXED",
        location: { city: "Los Angeles", state: "CA", country: "USA" },
        deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[0]._id,
        title: "Backend Developer",
        description:
          "Join our backend team to build robust APIs and scalable systems using modern technologies.",
        requiredSkills: ["Python", "Django", "PostgreSQL", "Docker"],
        budget: 7500,
        rateType: "FIXED",
        location: { city: "San Francisco", state: "CA", country: "USA" },
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[1]._id,
        title: "Web Designer",
        description:
          "Create beautiful, responsive websites using modern design principles and web technologies.",
        requiredSkills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        budget: 4500,
        rateType: "FIXED",
        location: { city: "New York", state: "NY", country: "USA" },
        deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[2]._id,
        title: "Social Media Manager",
        description:
          "Manage social media accounts, create engaging content, and grow our online presence.",
        requiredSkills: ["Social Media", "Content Creation", "Analytics"],
        budget: 3500,
        rateType: "FIXED",
        location: { city: "Los Angeles", state: "CA", country: "USA" },
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      {
        employerId: employers[0]._id,
        title: "DevOps Engineer",
        description:
          "Help us maintain and scale our infrastructure. Experience with AWS, Docker, and CI/CD required.",
        requiredSkills: ["AWS", "Docker", "CI/CD", "Linux"],
        budget: 9000,
        rateType: "FIXED",
        location: { city: "San Francisco", state: "CA", country: "USA" },
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
    ]);
    console.log("✅ Created 10 jobs");

    // Create Applications
    const applications = await Application.insertMany([
      {
        jobId: jobs[0]._id,
        jobSeekerId: jobSeekers[0]._id,
        coverLetter: "I'm excited about this opportunity. I have extensive experience with React and Node.js.",
        status: "PENDING",
      },
      {
        jobId: jobs[0]._id,
        jobSeekerId: jobSeekers[3]._id,
        coverLetter: "I'm a backend specialist with Python and Django experience. Perfect fit for this role.",
        status: "REVIEWED",
      },
      {
        jobId: jobs[2]._id,
        jobSeekers: jobSeekers[1]._id,
        coverLetter: "I've been designing interfaces for 3 years. Love to work with your creative team.",
        status: "PENDING",
      },
      {
        jobId: jobs[3]._id,
        jobSeekers: jobSeekers[1]._id,
        coverLetter: "I specialize in brand identity and marketing materials.",
        status: "PENDING",
      },
      {
        jobId: jobs[4]._id,
        jobSeekers: jobSeekers[2]._id,
        coverLetter: "I have 5 years of experience in digital marketing and campaign management.",
        status: "REVIEWED",
      },
      {
        jobId: jobs[5]._id,
        jobSeekers: jobSeekers[4]._id,
        coverLetter: "I write engaging content for tech and lifestyle brands. Let's create something great.",
        status: "PENDING",
      },
      {
        jobId: jobs[1]._id,
        jobSeekers: jobSeekers[0]._id,
        coverLetter: "I'm looking to start my career and would love to learn from your team.",
        status: "PENDING",
      },
      {
        jobId: jobs[6]._id,
        jobSeekers: jobSeekers[3]._id,
        coverLetter: "Backend development is my passion. I'd love to join your team.",
        status: "REVIEWED",
      },
      {
        jobId: jobs[7]._id,
        jobSeekers: jobSeekers[1]._id,
        coverLetter: "I create responsive, accessible web designs.",
        status: "PENDING",
      },
      {
        jobId: jobs[8]._id,
        jobSeekers: jobSeekers[2]._id,
        coverLetter: "Social media is where brands connect with audiences. I'd love to help grow yours.",
        status: "PENDING",
      },
      {
        jobId: jobs[9]._id,
        jobSeekers: jobSeekers[0]._id,
        coverLetter: "I have experience with AWS and Docker. Ready to scale your infrastructure.",
        status: "INTERVIEWED",
      },
      {
        jobId: jobs[4]._id,
        jobSeekers: jobSeekers[4]._id,
        coverLetter: "I can help create content for your marketing campaigns.",
        status: "PENDING",
      },
      {
        jobId: jobs[2]._id,
        jobSeekers: jobSeekers[2]._id,
        coverLetter: "Looking to pivot from marketing to design.",
        status: "REJECTED",
      },
      {
        jobId: jobs[0]._id,
        jobSeekers: jobSeekers[2]._id,
        coverLetter: "I'm skilled in multiple areas including development.",
        status: "PENDING",
      },
      {
        jobId: jobs[3]._id,
        jobSeekers: jobSeekers[4]._id,
        coverLetter: "I can help with both design and copy for your graphics needs.",
        status: "PENDING",
      },
    ]);
    console.log("✅ Created 15 applications");

    console.log("\n✨ Seed data created successfully!");
    console.log("\n📋 Test Credentials:");
    console.log("Admin: admin@jobhub.com / admin123");
    console.log("Employer: employer1@example.com / password123");
    console.log("Job Seeker: seeker1@example.com / password123");
    console.log("\n🎉 Ready to go!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();


