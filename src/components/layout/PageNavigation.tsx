import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PageNavigationProps {
  showBack?: boolean;
  showHome?: boolean;
  className?: string;
}

export function PageNavigation({ showBack = true, showHome = true, className = "" }: PageNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // Don't show navigation on home page
  if (location.pathname === "/") return null;

  return (
    <div className={`flex items-center gap-2 mb-6 ${className}`}>
      {showBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('navigation.back')}
        </Button>
      )}
      {showHome && location.pathname !== "/" && (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2"
        >
          <Link to="/">
            <Home className="h-4 w-4" />
            {t('navigation.home')}
          </Link>
        </Button>
      )}
    </div>
  );
} 