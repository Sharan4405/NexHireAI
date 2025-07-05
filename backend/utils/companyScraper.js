import axios from "axios";
import * as cheerio from 'cheerio';

export async function getCompanyInfo(companyName) {
  try {
    // Search for the company on LinkedIn
    const searchUrl = `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(companyName)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    const $ = cheerio.load(response.data);
    
    // Try to find the first company result
    const companyCard = $('.search-result__info').first();
    
    if (companyCard.length === 0) {
      console.log(`No company found for: ${companyName}`);
      return {
        name: companyName,
        description: "Company information not available",
        industry: "Unknown",
        size: "Unknown",
        location: "Unknown",
        website: "",
        values: []
      };
    }

    // Extract company information
    const name = companyCard.find('.search-result__title').text().trim() || companyName;
    const description = companyCard.find('.search-result__description').text().trim() || "No description available";
    const industry = companyCard.find('.search-result__subtitle').text().trim() || "Unknown industry";
    
    // Try to get company size and location
    const details = companyCard.find('.search-result__details').text().trim();
    const sizeMatch = details.match(/(\d+[KMB]?)\s*(?:employees|staff)/i);
    const locationMatch = details.match(/([A-Za-z\s,]+)(?:\s*•|\s*$)/);
    
    const size = sizeMatch ? sizeMatch[1] : "Unknown";
    const location = locationMatch ? locationMatch[1].trim() : "Unknown";

    // Get company website if available
    const websiteLink = companyCard.find('a[href*="linkedin.com/company"]').attr('href');
    const website = websiteLink ? `https://www.linkedin.com${websiteLink}` : "";

    // Extract company values/culture keywords from description
    const values = extractCompanyValues(description);

    return {
      name,
      description,
      industry,
      size,
      location,
      website,
      values
    };

  } catch (error) {
    console.error("LinkedIn company lookup failed for:", companyName);
    console.error("Error:", error.message);
    
    // Return fallback data
    return {
      name: companyName,
      description: "Company information not available",
      industry: "Unknown",
      size: "Unknown", 
      location: "Unknown",
      website: "",
      values: []
    };
  }
}

function extractCompanyValues(description) {
  const valueKeywords = [
    "innovation", "collaboration", "excellence", "integrity", "diversity", 
    "inclusion", "sustainability", "customer-focused", "growth", "learning",
    "teamwork", "creativity", "leadership", "quality", "transparency",
    "agility", "passion", "results", "trust", "empowerment"
  ];
  
  const foundValues = [];
  const lowerDescription = description.toLowerCase();
  
  valueKeywords.forEach(keyword => {
    if (lowerDescription.includes(keyword)) {
      foundValues.push(keyword);
    }
  });
  
  return foundValues;
} 