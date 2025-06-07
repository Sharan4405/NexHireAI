import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

export default function NexHireLanding() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center justify-center">
      <section className="max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-blue-400 mb-6"
        >
          Welcome to NexHireAI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 mb-10"
        >
          Your AI-powered assistant to land your dream job. Get tailored job matches and personalized cold emails — all from one place.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-lg"
            onClick={() => window.location.href = '/FeatureSelect'}
          >
            Create Your Tomorrow →
          </Button>
        </motion.div>
      </section>

      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-xl font-semibold text-blue-400 mb-2">AI Resume Matching</h3>
          <p className="text-sm text-gray-400">
            Upload your resume and let NexHireAI find jobs that truly fit your skills and goals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-xl font-semibold text-blue-400 mb-2">Cold Email Generator</h3>
          <p className="text-sm text-gray-400">
            Stand out with personalized, AI-generated cold emails crafted for each job role.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-xl font-semibold text-blue-400 mb-2">Auto Job Discovery</h3>
          <p className="text-sm text-gray-400">
            NexHireAI actively searches the web and shows you job listings that match your profile.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
