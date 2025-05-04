
import { Link } from "react-router-dom";
import { Code, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CodePathway</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering the next generation of developers through comprehensive learning paths and expert guidance.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Learning Paths</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/roadmaps/frontend" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link to="/roadmaps/backend" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Backend Development
                </Link>
              </li>
              <li>
                <Link to="/roadmaps/devops" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  DevOps
                </Link>
              </li>
              <li>
                <Link to="/roadmaps/cybersecurity" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link to="/roadmaps/ai" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CodePathway. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
