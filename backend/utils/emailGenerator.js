import OpenAI from "openai";
import examples from "../data/emailExamples.js"; // 10 examples you uploaded

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set this in .env
});

export async function generateColdEmail(userInfo, role, companyInfo) {
  const { name, skills, experience, email } = userInfo;
  const { name: companyName, description, values } = companyInfo;

  const fewShots = examples.map((e, i) => `Example ${i + 1}:\n${e}`).join("\n\n");

  const prompt = `
You are an expert cold email writer. Given the following details, generate a personalized cold email that is:
- Concise (150–200 words)
- Tailored to the user's experience and skills
- Customized to the company values and role
- Professional, warm, and compelling

User Info:
Name: ${name}
Email: ${email}
Skills: ${skills?.join(", ") || "N/A"}
Experience: ${experience || "N/A"}
Role of interest: ${role || "Not specified"}

Company Info:
Name: ${companyName}
Description: ${description}
Values: ${values?.join(", ") || "N/A"}

${fewShots}

Now write a personalized cold email (do NOT include "Example X:"):

---

`;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 0.8,
  });

  return response.choices[0].message.content.trim();
}
