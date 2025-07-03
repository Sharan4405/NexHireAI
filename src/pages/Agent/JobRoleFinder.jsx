import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function JobRoleFinder() {
  const [resume, setResume] = useState(null);
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobResults, setJobResults] = useState([]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setJobSuggestions([]);

    const payload = new FormData();
    payload.append("resume", resume);

    try {
      const response = await fetch("http://localhost:3000/find-job-roles", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      setJobSuggestions(data.topRoles || []);
      setJobResults(data.jobResults || []);
    } catch (err) {
      console.error(err);
      setJobSuggestions(["Error fetching suggestions."]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 text-white px-4 py-10 min-h-screen w-screen">
      <div className="w-full max-w-3xl flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-blue-400 mb-4"
      >
        AI Job Role Finder
      </motion.h1>
      <p className="text-gray-400 text-sm mb-8 text-center max-w-xl">
        Upload your resume to get personalized job role suggestions sourced from LinkedIn and tailored to your experience.
      </p>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-2xl border border-blue-700 shadow-md w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        encType="multipart/form-data"
      >
        <div>
          <label className="block mb-1 font-medium">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className="w-full bg-slate-700 text-white p-2 rounded-md"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md"
        >
          {loading ? "Finding Roles..." : "Find Job Roles"}
        </motion.button>
      </motion.form>

      {jobResults.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mt-10 max-w-xl bg-slate-800 p-6 rounded-xl border border-green-700"
  >
    <h2 className="text-xl font-semibold text-green-400 mb-4">💼 LinkedIn Opportunities</h2>
    {jobSuggestions.map((role) => (
      <div key={role} className="mb-4">
        <h3 className="text-lg font-bold text-green-300 mb-2">#{role}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {jobResults.filter(j => j.role === role).length === 0 && (
            <li>No jobs found for this role.</li>
          )}
          {jobResults.filter(j => j.role === role).map((job, idx) => (
            <li key={idx}>
              <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                {job.title}
              </a> at <span className="font-semibold">{job.company}</span> ({job.location})
            </li>
          ))}
        </ul>
      </div>
    ))}
  </motion.div>
)}
</div>
    </div>
  );
}
