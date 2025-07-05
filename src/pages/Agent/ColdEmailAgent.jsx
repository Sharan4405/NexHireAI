import { useState } from "react";
import { motion } from "framer-motion";

export default function ColdEmailAgent() {
  const [formData, setFormData] = useState({
    resume: null,
    linkedinUrl: "",
    company: "",
    role: "",
    recipientEmail: "",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedEmail("");
    setError("");

    // Validation: Either resume or LinkedIn URL must be provided
    if (!formData.resume && !formData.linkedinUrl.trim()) {
      setError("Please upload a resume or provide your LinkedIn profile URL.");
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append("resume", formData.resume);
    payload.append("company", formData.company);
    payload.append("role", formData.role);
    payload.append("linkedinUrl", formData.linkedinUrl);
    payload.append("recipientEmail", formData.recipientEmail);

    try {
      const response = await fetch("http://localhost:3000/cold-email/generate-email", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate email.");
      }

      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error generating email.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 text-white px-4 py-10 min-h-screen w-screen">
      <div className="w-full max-w-2xl">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 bg-slate-800 p-8 rounded-2xl border border-blue-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-blue-400">Cold Email Generator</h1>
        <p className="text-gray-400 text-sm">
          Upload your resume and target company name to generate a cold email.
        </p>

        <div>
          <label htmlFor="resume" className="block mb-1 font-medium">Upload Resume (PDF)</label>
          <input
            id="resume"
            type="file"
            accept=".pdf"
            name="resume"
            onChange={handleChange}
            className="w-full bg-slate-700 text-white p-2 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="linkedinUrl" className="block mb-1 font-medium">LinkedIn Profile (Optional)</label>
          <input
            id="linkedinUrl"
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full bg-slate-700 text-white p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="company" className="block mb-1 font-medium">Target Company</label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="w-full bg-slate-700 text-white p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block mb-1 font-medium">Role</label>
          <input
            id="role"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full bg-slate-700 text-white p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="recipientEmail" className="block mb-1 font-medium">Recipient Email</label>
          <input
            id="recipientEmail"
            type="email"
            name="recipientEmail"
            value={formData.recipientEmail}
            onChange={handleChange}
            placeholder="e.g. recruiter@company.com"
            className="w-full bg-slate-700 text-white p-2 rounded-md"
            required
          />
        </div>

        {error && (
          <div className="text-red-400 bg-red-900 bg-opacity-30 rounded-md p-2">
            {error}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Cold Email"}
        </motion.button>
      </motion.form>

      {generatedEmail && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 max-w-2xl bg-slate-800 p-6 rounded-xl border border-blue-700"
        >
          <h2 className="text-xl font-semibold text-blue-400 mb-4">✉️ Generated Email</h2>
          <pre className="whitespace-pre-wrap text-gray-300">{generatedEmail}</pre>
        </motion.div>
      )}
      </div>
    </div>
  );
}
