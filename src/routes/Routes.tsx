import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Auth from "../pages/Auth";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Dashboard from "../pages/dashboard";
import Assessment from "../pages/assessment";
import History from "../pages/history";
import Insights from "../pages/insights";
import Onboarding from "../pages/onboarding";
import Profile from "../pages/profile";
import Report from "../pages/report";

import Toolkit from "../pages/toolkit";
import MyProfile from "../pages/my-career/profile";
import AIReadiness from "../pages/ai-readiness";
import CareerIdentity from "../pages/career-identity";
import Workshops from "../pages/workshops";
import ThreeBAnalysisPage from "../pages/three-b-analysis";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      <Route element={<AuthenticatedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/3b-analysis" element={<ThreeBAnalysisPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />

        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/ai-readiness" element={<AIReadiness />} />
        <Route path="/career-identity" element={<CareerIdentity />} />
        <Route path="/workshops" element={<Workshops />} />
      </Route>
    </Routes>
  );
}
