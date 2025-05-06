import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
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
import AdminPanel from "./pages/AdminPanel";
import CommunityDetails from "@/pages/CommunityDetails";
import DzConnect from "@/pages/dzconnect";
import UbejaiaGuide from "@/pages/ubejaia-guide";
import DepartmentPage from "@/pages/ubejaia-guide/departments/[departmentId]";
import YearPage from "@/pages/ubejaia-guide/years/[yearId]";
import GuidePage from "@/pages/ubejaia-guide/guides/[guideId]";
import FacultyPage from "@/pages/ubejaia-guide/faculties/[facultyId]";
import FacultiesPage from "@/pages/ubejaia-guide/faculties";
import CampusPage from "@/pages/ubejaia-guide/campus";
import HousingPage from "@/pages/ubejaia-guide/housing";
import TransportPage from "@/pages/ubejaia-guide/transport";
import RestaurantPage from "@/pages/ubejaia-guide/restauration";
import LibrariesPage from "@/pages/ubejaia-guide/libraries";
import StudentLifePage from "@/pages/ubejaia-guide/student-life";
import CalculatorPage from "@/pages/ubejaia-guide/calculator";

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
                <Route path="/community/:communityId" element={<CommunityDetails />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/battle-royale" element={<BattleRoyale />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/inbox/:userId" element={<Inbox />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/dzconnect" element={<DzConnect />} />
                
                {/* Ubejaia Guide Routes */}
                <Route path="/ubejaia-guide" element={<UbejaiaGuide />} />
                <Route path="/ubejaia-guide/faculties" element={<FacultiesPage />} />
                <Route path="/ubejaia-guide/faculties/:facultyId" element={<FacultyPage />} />
                <Route path="/ubejaia-guide/faculties/:facultyId/departments/:departmentId" element={<DepartmentPage />} />
                <Route path="/ubejaia-guide/campus" element={<CampusPage />} />
                <Route path="/ubejaia-guide/housing" element={<HousingPage />} />
                <Route path="/ubejaia-guide/transport" element={<TransportPage />} />
                <Route path="/ubejaia-guide/restauration" element={<RestaurantPage />} />
                <Route path="/ubejaia-guide/libraries" element={<LibrariesPage />} />
                <Route path="/ubejaia-guide/student-life" element={<StudentLifePage />} />
                <Route path="/ubejaia-guide/years/:yearId" element={<YearPage />} />
                <Route path="/ubejaia-guide/guides/:guideId" element={<GuidePage />} />
                <Route path="/ubejaia-guide/calculator" element={<CalculatorPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
