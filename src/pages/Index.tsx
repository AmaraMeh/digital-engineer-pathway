import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, GraduationCap, BookOpen, Users, Globe, Landmark, Library, FlaskConical, Languages, Stethoscope, School, MapPin, PartyPopper, HandMetal, ArrowDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import "../styles/confetti.css";

const faculties = [
  { name: "Technologie", icon: FlaskConical, color: "text-blue-500" },
  { name: "Sciences Exactes", icon: BookOpen, color: "text-purple-500" },
  { name: "Sciences de la Nature et de la Vie", icon: Globe, color: "text-green-500" },
  { name: "Sciences Économiques, Commerciales et des Sciences de Gestion", icon: Landmark, color: "text-yellow-500" },
  { name: "Droit et Sciences Politiques", icon: Library, color: "text-red-500" },
  { name: "Lettres et Langues", icon: Languages, color: "text-pink-500" },
  { name: "Sciences Humaines et Sociales", icon: Users, color: "text-orange-500" },
  { name: "Médecine", icon: Stethoscope, color: "text-emerald-500" },
];

const campuses = [
  { name: "Targa Ouzemour", desc: "Le principal campus universitaire, accueillant la majorité des facultés et services.", icon: School, color: "text-blue-500" },
  { name: "Aboudaou", desc: "Un campus dédié à certaines filières et à la vie étudiante.", icon: MapPin, color: "text-purple-500" },
  { name: "El Kseur", desc: "Un site d'enseignement et de recherche en pleine expansion.", icon: GraduationCap, color: "text-green-500" },
];

// Animated background for hero
const HeroBackgroundAnimation = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/40 via-purple-500/20 to-blue-500/10 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/30 via-pink-500/20 to-transparent blur-3xl opacity-40 dark:opacity-20 -z-10 rounded-full"></div>
    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
    <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
  </div>
);

// Floating animated particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    const newParticles = Array.from({length: 30}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 10,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

function ConfettiCelebration({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="confetti-container pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <div key={i} className={`confetti-${(i % 20) + 1} confetti-piece`}></div>
      ))}
    </div>
  );
}

export default function Index() {
  const { theme, setTheme, isDarkMode } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'dark');
  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative">
        <HeroBackgroundAnimation />
        <FloatingParticles />
        <ConfettiCelebration show={showConfetti} />
        {/* Floating Welcome Message */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              className="fixed top-24 left-1/2 z-50 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-3xl animate-bounce">👋</span>
              <span className="font-bold text-lg text-primary">Bienvenue à l'Université de Béjaïa !</span>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Theme Toggle Button */}
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-lg transition-all"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-500" />
            )}
          </Button>
        </motion.div>

        {/* Hero Section */}
        <section className="relative py-20 px-4 min-h-[80vh] flex items-center">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary flex items-center gap-2">
                  <PartyPopper className="w-4 h-4 text-pink-500 animate-bounce" />
                  Guide de l'étudiant
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-fade-in">
                  Université de Béjaïa
                </h1>
                <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
                  Découvrez les facultés, campus, services et toutes les informations utiles pour réussir votre parcours universitaire à l'Université de Béjaïa.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:scale-105 transition-transform" onClick={handleCelebrate}>
                    Explorer le guide
                  </Button>
                </div>
              </motion.div>
              {/* Scroll Down Indicator */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
              >
                <span className="text-muted-foreground text-xs mb-1">Scroll</span>
                <ArrowDown className="h-7 w-7 animate-bounce text-primary" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Faculties Section */}
        <section className="py-24 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:from-transparent dark:via-gray-900/30 dark:to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Facultés</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                L'université de Béjaïa compte 8 facultés couvrant tous les domaines majeurs de la formation supérieure.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {faculties.map((faculty, idx) => (
                <motion.div
                  key={faculty.name}
                  className={`rounded-xl bg-white dark:bg-gray-900 shadow p-6 text-center border border-gray-200 dark:border-gray-800 hover:scale-110 hover:shadow-2xl transition-transform cursor-pointer group relative overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.12 }}
                >
                  <span className={`inline-flex items-center justify-center mb-3 rounded-full bg-gradient-to-br from-primary/10 to-blue-100/20 p-3 shadow group-hover:scale-110 transition-transform ${faculty.color}`}>
                    <faculty.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-bold text-xl mb-2 text-primary group-hover:text-blue-600 transition-colors">{faculty.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Section */}
        <section className="py-24 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:from-transparent dark:via-blue-900/20 dark:to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Campus</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Plusieurs campus modernes : Targa Ouzemour, Aboudaou, El Kseur, offrant un cadre d'étude agréable et des infrastructures de qualité.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {campuses.map((campus, idx) => (
                <motion.div
                  key={campus.name}
                  className={`rounded-xl bg-white dark:bg-gray-900 shadow p-6 border border-gray-200 dark:border-gray-800 hover:scale-110 hover:shadow-2xl transition-transform cursor-pointer group relative overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.12 }}
                >
                  <span className={`inline-flex items-center justify-center mb-3 rounded-full bg-gradient-to-br from-primary/10 to-blue-100/20 p-3 shadow group-hover:scale-110 transition-transform ${campus.color}`}>
                    <campus.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-blue-600 transition-colors">{campus.name}</h3>
                  <p className="text-muted-foreground group-hover:text-primary transition-colors">{campus.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* More Info Section (placeholder) */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Et bien plus...
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Découvrez les services aux étudiants, les activités, les bibliothèques, les œuvres universitaires, les procédures d'inscription, et toutes les informations utiles pour réussir votre vie universitaire à Béjaïa.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button size="lg" variant="outline">
                Voir toutes les rubriques du guide
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
