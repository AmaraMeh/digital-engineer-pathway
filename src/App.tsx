import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProgressProvider } from "@/context/ProgressContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Roadmaps from "./pages/Roadmaps";
import Courses from "./pages/Courses";
import CourseContent from "./pages/CourseContent";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { HtmlBasicsCourse } from "./components/courses/HtmlBasicsCourse";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Blog from "./pages/Blog";
import Tutorials from "./pages/Tutorials";
import Community from "./pages/Community";
import FAQ from "./pages/FAQ";
import Leaderboard from "./pages/Leaderboard";
import BattleRoyale from "./pages/BattleRoyale";
import Inbox from "@/pages/Inbox";
import AdminPanel from './pages/AdminPanel';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime)
    },
  },
});

// Get the base URL from Vite's environment
const baseUrl = import.meta.env.BASE_URL;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ProgressProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Router basename={baseUrl}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/roadmaps" element={<Roadmaps />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:courseId" element={<CourseContent />} />
                  <Route path="/courses/html-basics/learn" element={<HtmlBasicsCourse />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/battle-royale" element={<BattleRoyale />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/inbox/:userId" element={<Inbox />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </TooltipProvider>
          </ProgressProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
