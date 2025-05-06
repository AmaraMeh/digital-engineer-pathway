import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Book, GraduationCap, Building2, Users, 
  BookOpen, FileText, Library, MapPin, HelpCircle,
  Home, Bus, Coffee, Utensils, Phone, Mail, ChevronLeft,
  Search, ChevronRight, ArrowRight, Calculator
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const guideCategories = [
  {
    id: "calculator",
    name: "Calculateur de Moyenne",
    icon: Calculator,
    description: "Calculez votre moyenne par semestre et module",
    color: "blue"
  },
  {
    id: "faculties",
    name: "Facultés",
    icon: Building2,
    description: "Explorez les différentes facultés et leurs formations",
    color: "blue"
  },
  {
    id: "student-life",
    name: "Vie Étudiante",
    icon: GraduationCap,
    description: "Découvrez les activités et services pour les étudiants",
    color: "blue"
  },
  {
    id: "campus",
    name: "Campus",
    icon: MapPin,
    description: "Découvrez nos campus et leurs installations",
    color: "purple"
  },
  {
    id: "housing",
    name: "Hébergement",
    icon: Home,
    description: "Résidences universitaires et logement étudiant",
    color: "blue"
  },
  {
    id: "transport",
    name: "Transport",
    icon: Bus,
    description: "Services de transport universitaire",
    color: "purple"
  },
  {
    id: "restauration",
    name: "Restauration",
    icon: Utensils,
    description: "Restaurants universitaires et cafétérias",
    color: "blue"
  },
  {
    id: "libraries",
    name: "Bibliothèques",
    icon: Library,
    description: "Bibliothèques et centres de documentation",
    color: "purple"
  }
];

const UbejaiaGuide = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Button
            variant="ghost"
            className="mb-4 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Building2 className="w-4 h-4 mr-2" />
                Guide Universitaire
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Université de Béjaïa
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                Votre guide complet pour découvrir l'université et ses services
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guideCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-${category.color}-500/5 via-purple-500/5 to-${category.color}-500/10 rounded-2xl blur-xl transition-opacity duration-300 ${
                hoveredCard === category.id ? 'opacity-100' : 'opacity-0'
              }`} />
              <Card className={`relative h-full transition-all duration-300 overflow-hidden backdrop-blur-sm border-2 ${
                hoveredCard === category.id 
                  ? 'border-blue-400 shadow-lg shadow-blue-500/10 scale-[1.02]' 
                  : 'border-slate-100 dark:border-slate-700'
              }`}>
                <CardHeader className="relative pb-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/5 rounded-full blur-2xl transform translate-x-16 -translate-y-8" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 p-3.5 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 transition-colors group-hover:scale-110 duration-300">
                      <category.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full mt-2 group/item border-blue-200 dark:border-blue-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
                    onClick={() => {
                      if (category.id === "calculator") {
                        navigate(`/ubejaia-guide/calculator`);
                      } else {
                        navigate(`/ubejaia-guide/${category.id}`);
                      }
                    }}
                  >
                    <span className="text-sm font-medium text-slate-600 group-hover/item:text-blue-600 dark:text-slate-300 dark:group-hover/item:text-blue-400 transition-colors">
                      Accéder à {category.name}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 text-blue-400 group-hover/item:text-blue-500 transition-colors transform group-hover/item:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <Badge className="mb-3 px-4 py-1.5 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Badge>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Besoin d'aide ?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="transform transition-all duration-300"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                <CardContent className="pt-8 pb-6">
                  <div className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4">
                      <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Téléphone</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">034 81 68 31</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="transform transition-all duration-300"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                <CardContent className="pt-8 pb-6">
                  <div className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4">
                      <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Email</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">contact@univ-bejaia.dz</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="transform transition-all duration-300"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                <CardContent className="pt-8 pb-6">
                  <div className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4">
                      <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Adresse</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Route de Targa Ouzemour, 06000</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UbejaiaGuide; 