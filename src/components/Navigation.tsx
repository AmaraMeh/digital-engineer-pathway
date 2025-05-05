import { Link } from "react-router-dom";
import { Users, MessageSquare, Calendar, Code, Book, Trophy, Star, Heart, Share2, Bell, Settings, Plus, ArrowRight } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CodePathway</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="/community" className="text-sm font-medium transition-colors hover:text-primary">
                Community
              </Link>
              <Link to="/dzconnect" className="text-sm font-medium transition-colors hover:text-primary">
                DZCONNECT
              </Link>
              <Link to="/events" className="text-sm font-medium transition-colors hover:text-primary">
                Events
              </Link>
              <Link to="/resources" className="text-sm font-medium transition-colors hover:text-primary">
                Resources
              </Link>
            </div>
          </div>
          // ... existing code ...
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 