import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import FeatureSelect from "@/pages/FeatureSelect";
import ColdEmailAgent from "@/pages/Agent/ColdEmailAgent";
import ResumeMatchAgent from "@/pages/Agent/ResumeMatchAgent";
import LinkedinMatchAgent from "@/pages/Agent/LinkedinMatchAgent"; // Assuming you have this page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/FeatureSelect" element={<FeatureSelect />} />
        <Route path="/Agent/ColdEmailAgent" element={<ColdEmailAgent />} />
        <Route path="/Agent/ResumeMatchAgent" element={<ResumeMatchAgent />} />
        <Route path="/Agent/LinkedinMatchAgent" element={<LinkedinMatchAgent />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}