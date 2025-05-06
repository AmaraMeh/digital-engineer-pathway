import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Book, GraduationCap, Building2, Users, 
  Sun, Moon, Menu, X
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">UB Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/ubejaia-guide">
              <Button variant="ghost" className="gap-2">
                <Book className="w-4 h-4" />
                Guide
              </Button>
            </Link>
            <Link to="/ubejaia-guide/faculties">
              <Button variant="ghost" className="gap-2">
                <Building2 className="w-4 h-4" />
                Facultés
              </Button>
            </Link>
            <Link to="/ubejaia-guide/years">
              <Button variant="ghost" className="gap-2">
                <GraduationCap className="w-4 h-4" />
                Années
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/ubejaia-guide">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Book className="w-4 h-4" />
                Guide
              </Button>
            </Link>
            <Link to="/ubejaia-guide/faculties">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Building2 className="w-4 h-4" />
                Facultés
              </Button>
            </Link>
            <Link to="/ubejaia-guide/years">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <GraduationCap className="w-4 h-4" />
                Années
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4" />
                  Mode Clair
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Mode Sombre
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}; 