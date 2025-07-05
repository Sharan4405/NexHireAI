import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import { parseResume } from "../utils/resumeparser.js";
import { scrapeLinkedIn } from "../utils/linkedinScraper.js";
import { scrapeCompanyDetails } from "../utils/companyScraper.js";
import { generateColdEmail } from "../utils/emailGenerator.js";
//import { sendDraftEmail } from "../services/gmailService.js";

const router = express.Router();

// Multer setup to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, "resume_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Main endpoint
router.post("/generate-email", upload.single("resume"), async (req, res) => {
  try {
    const { company, role, linkedin } = req.body;
    const resumePath = req.file?.path;

    if (!resumePath || !company || !role) {
      return res.status(400).json({ error: "Resume, company, and role are required." });
    }

    // Step 1: Extract text from PDF
    const resumeDataBuffer = fs.readFileSync(resumePath);
    const parsedPDF = await pdfParse(resumeDataBuffer);
    const resumeText = parsedPDF.text;

    // Step 2: Extract user info from resume
    const userInfo = await parseResume(resumeText);

    // Step 3: Optional LinkedIn data
    const linkedInData = linkedin ? await scrapeLinkedIn(linkedin) : null;

    // Step 4: Get company info
    const companyInfo = await scrapeCompanyDetails(company);
    if (!companyInfo) {
      return res.status(404).json({ error: "Company information not found." });
    }

    // Step 5: Generate cold email
    const coldEmail = await generateColdEmail({
      userInfo,
      linkedInData,
      company,
      role,
      companyInfo,
    });

    // Step 6: Send to Gmail Drafts (using Gmail API)
    await sendDraftEmail(userInfo.email, coldEmail.subject, coldEmail.body);

    return res.status(200).json({
      message: "Cold email generated and saved as Gmail draft.",
      email: coldEmail,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
