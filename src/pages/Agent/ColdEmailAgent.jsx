// src/pages/ColdEmailAgent.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const tones = ["Professional", "Friendly", "Bold"];
const ctaOptions = ["Request a call", "Want to connect", "Looking forward to your response"];

export default function ColdEmailAgent() {
  const [formData, setFormData] = useState({
    recipientType: "Individual",
    recipientName: "",
    role: "",
    background: "",
    achievements: "",
    tone: "Professional",
    cta: "Request a call",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generating Email with: ", formData);
  };

  const emailPreview = () => {
    const {
      recipientName,
      role,
      background,
      achievements,
      tone,
      cta,
      recipientType,
    } = formData;

    if (!recipientName && !role && !background) {
      return "Your cold email preview will appear here as you fill the form.";
    }

    return `Hi ${recipientName || "[Recipient]"},
    
I'm reaching out to express my interest in the ${role || "[Role]"} position ${
      recipientType === "Company" ? "at your company" : ""
    }. ${background || "[Brief background goes here]"}${
      achievements ? ` Notably, ${achievements}.` : ""
    }

${cta || "[CTA goes here]"}.

Best regards,
[Your Name]`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-10 px-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* === Left Side: Form === */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">Cold Email Generator</h1>
          <p className="text-gray-400 mb-6">
            Fill in the details to generate a personalized cold email.
          </p>

          {/* Each Field */}
          {[
            {
              label: "Who are you reaching out to?",
              name: "recipientType",
              type: "select",
              options: ["Individual", "Company"],
            },
            {
              label: "Recipient Name / Company",
              name: "recipientName",
              placeholder: "e.g. John Doe / Google",
            },
            {
              label: "Role You're Applying For",
              name: "role",
              placeholder: "e.g. Frontend Developer",
            },
            {
              label: "Your Background",
              name: "background",
              type: "textarea",
              rows: 3,
              placeholder: "Briefly describe your experience, skills, or projects",
            },
            {
              label: "Key Achievements (Optional)",
              name: "achievements",
              type: "textarea",
              rows: 2,
              placeholder: "e.g. Built an app used by 10K+ people",
            },
          ].map((field, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-800 p-4 rounded-xl border border-blue-700"
            >
              <label className="block mb-2 font-medium">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white p-2 rounded-md"
                >
                  {field.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  rows={field.rows}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full bg-slate-700 text-white p-2 rounded-md"
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full bg-slate-700 text-white p-2 rounded-md"
                />
              )}
            </motion.div>
          ))}

          {/* Tone and CTA Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{ label: "Tone", name: "tone", options: tones }, { label: "CTA", name: "cta", options: ctaOptions }].map(
              (field, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-800 p-4 rounded-xl border border-blue-700"
                >
                  <label className="block mb-2 font-medium">{field.label}</label>
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full bg-slate-700 text-white p-2 rounded-md"
                  >
                    {field.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </motion.div>
              )
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md"
          >
            Generate Cold Email
          </motion.button>
        </form>

        {/* === Right Side: Live Preview === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800 border border-blue-700 rounded-xl p-6 h-fit"
        >
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">📧 Live Preview</h2>
          <pre className="whitespace-pre-wrap text-gray-300">{emailPreview()}</pre>
        </motion.div>
      </div>
    </div>
  );
}
