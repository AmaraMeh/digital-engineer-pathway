import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, GraduationCap, Building2, Users, Calendar,
  BookOpen, FileText, Library, MapPin, HelpCircle,
  Sun, Moon, ChevronRight, Globe, Mail, Phone
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroBackgroundAnimation } from "@/components/HeroBackgroundAnimation";
import { FloatingParticles } from "@/components/FloatingParticles";

const popularGuides = [
  {
    id: "registration",
    title: "Guide d'Inscription",
    description: "Processus complet d'inscription et réinscription",
    level: "Important",
    duration: "15 min de lecture"
  },
  {
    id: "campus",
    title: "Découvrir le Campus",
    description: "Tout sur les installations et services",
    level: "Essentiel",
    duration: "10 min de lecture"
  },
  {
    id: "services",
    title: "Services Étudiants",
    description: "Services disponibles pour les étudiants",
    level: "Utile",
    duration: "8 min de lecture"
  }
];

const studentServices = [
  {
    id: "library",
    title: "Bibliothèque",
    description: "Accès aux ressources documentaires",
    icon: Library
  },
  {
    id: "housing",
    title: "Hébergement",
    description: "Résidences universitaires",
    icon: Building2
  },
  {
    id: "health",
    title: "Santé",
    description: "Services médicaux universitaires",
    icon: HelpCircle
  }
];

const Index = () => {
  const [currentTab, setCurrentTab] = useState("guides");
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleUbejaiaGuide = () => {
    navigate('/ubejaia-guide');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <Navbar />
      
      <div className="relative min-h-screen">
        <HeroBackgroundAnimation />
        <FloatingParticles />
        
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
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-500" />
            )}
          </Button>
        </motion.div>
        
        {/* Hero Section */}
        <section className="relative py-32 px-4 min-h-[90vh] flex items-center">
          <div className="container mx-auto">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 px-6 py-2 text-base bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Building2 className="w-5 h-5 mr-2" />
                Université de Béjaïa
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Guide Complet pour les Étudiants
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                Découvrez toutes les ressources et informations nécessaires pour réussir vos études à l'Université de Béjaïa
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" onClick={handleUbejaiaGuide}>
                  <Book className="w-6 h-6 mr-3" />
                  Accéder au Guide
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2" onClick={() => navigate('/ubejaia-guide/guides/registration')}>
                  <FileText className="w-6 h-6 mr-3" />
                  Guide d'Inscription
                </Button>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Développé avec ❤️ par <span className="font-semibold text-primary">Amara Mehdi</span>
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary">
                <Book className="w-4 h-4 mr-2" />
                Fonctionnalités
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Tout ce dont vous avez besoin</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Des outils et ressources essentiels pour votre parcours universitaire
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4">
                      <GraduationCap className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">Formations</CardTitle>
                    <CardDescription className="text-base">
                      Explorez nos programmes de formation en licence et master avec des détails complets sur chaque spécialité
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full group" onClick={() => navigate('/ubejaia-guide/years/l1')}>
                      Découvrir
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">Campus</CardTitle>
                    <CardDescription className="text-base">
                      Découvrez nos installations modernes et services universitaires pour une expérience étudiante optimale
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full group" onClick={() => navigate('/ubejaia-guide/guides/campus')}>
                      Explorer
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">Services</CardTitle>
                    <CardDescription className="text-base">
                      Accédez à tous les services disponibles pour les étudiants, de l'inscription à la vie étudiante
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full group" onClick={() => navigate('/ubejaia-guide/guides/services')}>
                      Consulter
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-24 container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-2 px-3 py-1 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Book className="w-4 h-4 mr-2" />
              Ressources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ressources Essentielles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accédez aux informations et services indispensables pour votre parcours universitaire
            </p>
          </motion.div>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="guides" className="text-lg py-3">
                  Guides Importants
                </TabsTrigger>
                <TabsTrigger value="services" className="text-lg py-3">
                  Services Étudiants
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="guides" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularGuides.map((guide, idx) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={`/ubejaia-guide/guides/${guide.id}`}>
                      <Card className="overflow-hidden h-full border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400">
                              {guide.level}
                            </Badge>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Book className="h-3 w-3 mr-1" />
                              {guide.duration}
                            </div>
                          </div>
                          <CardTitle>{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Book className="h-3 w-3" />
                            Consulter
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentServices.map((service, idx) => (
              <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <service.icon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle>{service.title}</CardTitle>
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ChevronRight className="h-3 w-3" />
                          En savoir plus
                </Button>
                      </CardFooter>
                    </Card>
              </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Statistics Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-2 px-3 py-1 text-sm bg-primary/10 text-primary">
                <Building2 className="w-4 h-4 mr-2" />
                Statistiques
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">L'Université en Chiffres</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Découvrez les chiffres clés de l'Université de Béjaïa
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-4xl font-bold text-primary">25041</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Étudiants en Licence</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-4xl font-bold text-primary">7907</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Étudiants en Master</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-4xl font-bold text-primary">267</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Professeurs</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Library className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-4xl font-bold text-primary">37</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Laboratoires de recherche</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-2 px-3 py-1 text-sm bg-primary/10 text-primary">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nous Contacter</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Besoin d'aide ? N'hésitez pas à nous contacter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
              </div>
                    <CardTitle>Téléphone</CardTitle>
              </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+213 34 81 68 31</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
              </div>
                    <CardTitle>Email</CardTitle>
                </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">contact@univ-bejaia.dz</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Globe className="w-5 h-5 text-primary" />
              </div>
                    <CardTitle>Site Web</CardTitle>
            </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">www.univ-bejaia.dz</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-background/50 border-t">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Université de Béjaïa Guide. Développé par{" "}
              <a 
                href="https://github.com/amara-mehdi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Amara Mehdi
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
