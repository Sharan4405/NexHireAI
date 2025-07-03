import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText, FaFileAlt, FaLinkedin } from "react-icons/fa";

const features = [
  {
    icon: <FaLinkedin size={40} className="text-blue-400" />,
    title: "AI Job Role Finder",
    description:
      "Not sure which roles to apply for? Upload your resume or LinkedIn profile and let NexHireAI analyze your strengths, experiences, and skills. Our agent will suggest real-time, relevant job roles on LinkedIn — complete with smart matching logic and direct application links.",
    path: "/Agent/JobRoleFinder",
  },
  {
    icon: <FaEnvelopeOpenText size={40} className="text-blue-400" />,
    title: "Personalized Cold Emails",
    description:
      "Struggling to get responses from recruiters? Let NexHireAI craft personalized, context-aware cold emails tailored to your profile and target roles. Just fill in a few prompts — our AI will generate high-converting outreach emails to help you stand out.",
    path: "/Agent/ColdEmailAgent",
  },
  {
    icon: <FaFileAlt size={40} className="text-blue-400" />,
    title: "Resume & LinkedIn Enhancer",
    description:
      "Make your profile recruiter-ready. Our AI refines your resume and LinkedIn profile content, highlighting your achievements and skills the way hiring managers want to see them — all while aligning with the job roles you’re targeting.",
    path: "/Agent/ResumeMatchAgent",
  },
];

export default function FeatureSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4 text-blue-400"
        >
          Choose Your AI Assistant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-20 max-w-3xl mx-auto"
        >
          NexHireAI empowers your job search with smart features. Pick one that
          best fits your application strategy.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              onClick={() => navigate(feature.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.10 }}
              whileHover={{
                scale: 1.05,
                
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-800 rounded-2xl border border-blue-700 p-6 cursor-pointer shadow-md hover:shadow-blue-600/20 transition-all duration-300 ease-in-out"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-center">
                {feature.title}
              </h2>
              <p className="text-gray-300 text-sm text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
