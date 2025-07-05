import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function parseResume(resumeText) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const hfModel = "dslim/bert-base-NER";

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${hfModel}`,
      { inputs: resumeText },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const entities = response.data;

    // Extract details manually from entities
    let name = "User";
    let email = resumeText.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/)?.[0] || "";
    let skills = [];

    entities.forEach((entity) => {
      const word = entity.word;
      const label = entity.entity_group || entity.entity;

      if (label.includes("PER") && name === "User") name = word;
      if (label.includes("SKILL") || label.includes("MISC")) skills.push(word);
    });

    // Clean up duplicates, partials
    skills = Array.from(new Set(skills.map((s) => s.replace("##", "")))).filter(Boolean);

    return {
      name,
      email,
      skills,
    };
  } catch (err) {
    console.error("Failed to parse resume via Hugging Face:", err.message);

    // Fallback logic if Hugging Face fails
    return {
      name: "User",
      email: resumeText.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/)?.[0] || "unknown@example.com",
      skills: [],
    };
  }
}
