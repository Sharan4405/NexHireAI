import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import FeatureSelect from "@/pages/FeatureSelect";
import ColdEmailAgent from "@/pages/Agent/ColdEmailAgent";
import JobRoleFinder from "@/pages/Agent/JobRoleFinder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/FeatureSelect" element={<FeatureSelect />} />
        <Route path="/Agent/ColdEmailAgent" element={<ColdEmailAgent />} />   
        <Route path="/Agent/JobRoleFinder" element={<JobRoleFinder />} />
      </Routes>
    </BrowserRouter>
  );
}