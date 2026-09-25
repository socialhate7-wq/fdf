import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import AnalysisDetail from "@/pages/AnalysisDetail";
import ChannelDetail from "@/pages/ChannelDetail";
import AdminPanel from "@/pages/AdminPanel";
import ChannelsPage from "@/pages/ChannelsPage";
import ChannelCard from "@/pages/ChannelCard";
import MedusaPanel from "@/pages/MedusaPanel";
import VideoGeneratorPage from "@/pages/VideoGeneratorPage";
import FoodieRealityPage from "@/pages/FoodieRealityPage";
import FoodieVideoGeneratorPage from "@/pages/FoodieVideoGeneratorPage";
import FoodieProPage from "@/pages/FoodieProPage";
import FoodieCreatorPage from "@/pages/FoodieCreatorPage";

export default function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#09090B]">
        <div className="noise-overlay" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis/:id" element={<AnalysisDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/medusa" element={<MedusaPanel />} />
            <Route path="/card/:slug" element={<ChannelCard />} />
            <Route path="/videos" element={<VideoGeneratorPage />} />
            <Route path="/reality-check" element={<FoodieRealityPage />} />
            <Route path="/foodie-reality" element={<FoodieRealityPage />} />
            <Route path="/foodie-videos" element={<FoodieVideoGeneratorPage />} />
            <Route path="/foodie-reality/generator" element={<FoodieVideoGeneratorPage />} />
            <Route path="/foodie-pro" element={<FoodieProPage />} />
            <Route path="/foodie-fake-pro" element={<FoodieProPage />} />
            <Route path="/foodie-creator" element={<FoodieCreatorPage />} />
            <Route path="/foodie-fake-creator" element={<FoodieCreatorPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" theme="dark" />
      </div>
    </LanguageProvider>
  );
}
