import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileUpload } from "react-icons/fa";

export default function ResumeMatchAgent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log("Resume submitted: ", file.name);
      // TODO: add API submission logic
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">
          Resume → Job Match
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Upload your resume and let NexHireAI find the best job matches for you based on your profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.label
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800 border border-blue-700 w-full p-8 flex flex-col items-center justify-center gap-4 rounded-xl cursor-pointer"
          >
            <FaFileUpload size={40} className="text-blue-400" />
            <span className="text-sm text-gray-300">
              {file ? file.name : "Click to upload resume (.pdf, .docx, .odt, etc.)"}
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.odt"
              onChange={handleFileChange}
              className="hidden"
            />
          </motion.label>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={`w-full py-3 px-6 rounded-xl font-semibold shadow-md transition ${
              file
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={!file}
          >
            Find Matching Jobs
          </motion.button>
        </form>
      </div>
    </div>
  );
}
