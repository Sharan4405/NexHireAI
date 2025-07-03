import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import axios from "axios";
import * as cheerio from 'cheerio';
import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();
//cohere.init(process.env.COHERE_API_KEY);
const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/find-job-roles", upload.single("resume"), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const parsed = await pdfParse(pdfBuffer);
    const text = parsed.text;
    
    console.log("Before Cohere call");
    // 1️⃣ Cohere classification
    const cohereRes = await cohere.classify({
      model: "ba9ae9fd-27cc-4842-ab1a-e2370572ca8f-ft", // 🧠 You should have trained a Cohere classification model
      inputs: [text],
    });
    console.log(cohereRes);

    const jobRoles = cohereRes.classifications[0].labels;
    const topRoles = Object.entries(jobRoles)
      .sort((a, b) => b[1].confidence - a[1].confidence)
      .slice(0, 3)
      .map(([role]) => role);

    // 2️⃣ LinkedIn job scraping (for each top role)
    const jobResults = [];
    for (const role of topRoles) {
      const query = role.replace(/\s+/g, "+");
      const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${query}`;

      const { data: html } = await axios.get(searchUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      const $ = cheerio.load(html);
      const jobCards = $("ul.jobs-search__results-list li");

      jobCards.each((i, el) => {
        if (i < 5) {
          const title = $(el).find("h3").text().trim();
          const company = $(el).find("h4").text().trim();
          const location = $(el).find(".job-search-card__location").text().trim();
          const link = $(el).find("a").attr("href");

          if (
            link &&
            (link.startsWith('/jobs/view/') || link.startsWith('http')) &&
            title && !title.includes('*') &&
            company && !company.includes('*')
          ) {
            jobResults.push({
              role,
              title,
              company,
              location,
              link: link.startsWith('http') ? link : `https://www.linkedin.com${link}`,
            });
          }
        }
      });
    }

    res.json({ topRoles, jobResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;
