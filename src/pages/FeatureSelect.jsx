import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText, FaFileAlt, FaLinkedin } from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt size={40} className="text-blue-400" />,
    title: "AI Resume → Job Match",
    description:
      "Stop guessing which jobs fit your profile. Upload your resume and let NexHireAI intelligently parse your skills, experience, and achievements to fetch real-time job listings that actually align — with fit scores and direct links.",
    path: "/Agent/ResumeMatchAgent",
  },
  {
    icon: <FaEnvelopeOpenText size={40} className="text-blue-400" />,
    title: "Personalised Cold Emails",
    description:
      "Tired of sending generic emails? Our AI crafts cold emails tailored to your personality, experience, and the specific role — giving you a higher chance to connect and convert. Just answer a few prompts and get a ready-to-send professional message.",
    path: "/Agent/ColdEmailAgent",
  },
  {
    icon: <FaLinkedin size={40} className="text-blue-400" />,
    title: "AI LinkedIn → Job Match",
    description:
      "Leverage your LinkedIn like never before. Our agent scans your public LinkedIn data and matches you with opportunities that suit your career path — perfect if you haven’t finalized a resume yet or want a quick match on the go.",
    path: "/Agent/LinkedinMatchAgent",
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
