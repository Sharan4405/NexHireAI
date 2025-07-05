import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function scrapeLinkedIn(linkedinURL) {
  if (!linkedinURL) return null;

  try {
    const apiKey = process.env.PROXYCURL_API_KEY;

    const response = await axios.get("https://nubela.co/proxycurl/api/v2/linkedin", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        url: linkedinURL,
        fallback_to_cache: "on",
        use_cache: "if-present",
      },
    });

    const data = response.data;

    return {
      currentPosition: data.occupation,
      skills: data.skills || [],
      experience: data.experience || [],
      summary: data.summary,
    };
  } catch (err) {
    console.error("Failed to fetch LinkedIn info:", err.message);
    return null;
  }
}
