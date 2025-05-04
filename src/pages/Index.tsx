import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Code, Terminal, Laptop, Server, ArrowRight, Play, Award, ChevronRight, Sparkles, Heart, Star, Rocket, Moon, Sun, Twitter, Github, Linkedin, Youtube } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const features = [
  {
    title: "Interactive Learning",
    description: "Learn through interactive lessons, playgrounds, and coding exercises.",
    icon: Play,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    title: "Comprehensive Roadmaps",
    description: "Follow structured learning paths for various tech careers.",
    icon: ChevronRight,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  {
    title: "Code Playgrounds",
    description: "Practice your skills in our interactive code environments.",
    icon: Code,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  },
  {
    title: "Earn Certificates",
    description: "Get recognized for your knowledge with course certificates.",
    icon: Award,
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  }
];

const tracks = [
  {
    title: "Frontend Development",
    icon: Laptop,
    description: "Master the art of creating beautiful, responsive, and interactive user interfaces",
    progress: 45,
    link: "/roadmaps",
    featured: true
  },
  {
    title: "Backend Development",
    icon: Server,
    description: "Build robust server-side applications and APIs with modern technologies",
    progress: 0,
    link: "/roadmaps",
    comingSoon: true
  },
  {
    title: "Full Stack Development",
    icon: Code,
    description: "Become a versatile developer by mastering both frontend and backend technologies",
    progress: 0,
    link: "/roadmaps",
    comingSoon: true
  },
  {
    title: "DevOps Engineering",
    icon: Terminal,
    description: "Learn to deploy, monitor, and maintain applications at scale",
    progress: 0,
    link: "/roadmaps",
    comingSoon: true
  }
];

const popularCourses = [
  {
    id: "html-basics",
    title: "HTML Fundamentals",
    description: "Build the foundation of web development with HTML5",
    level: "Beginner",
    duration: "2 hours",
    icon: Code
  },
  {
    id: "css-fundamentals",
    title: "CSS Mastery",
    description: "Create stunning designs with modern CSS techniques",
    level: "Beginner",
    duration: "3 hours",
    icon: Laptop
  },
  {
    id: "js-fundamentals",
    title: "JavaScript Essentials",
    description: "Add interactivity and dynamic features to your websites",
    level: "Beginner",
    duration: "4 hours",
    icon: Terminal
  }
];

const HeroBackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/40 via-purple-500/20 to-blue-500/10 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/30 via-pink-500/20 to-transparent blur-3xl opacity-40 dark:opacity-20 -z-10 rounded-full"></div>
      
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
    </div>
  );
};

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);
  
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

const Index = () => {
  const [currentTab, setCurrentTab] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { theme, setTheme, isDarkMode } = useTheme();
  
  const handleStartLearning = () => {
    window.location.href = '/courses';
  };

  const handleExploreRoadmaps = () => {
    window.location.href = '/roadmaps';
  };

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <>
      <Navbar />
      
      <div className="relative">
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
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-500" />
            )}
          </Button>
        </motion.div>
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary">
                <Rocket className="w-4 h-4 mr-2" />
                Developed by Amara Mehdi
              </Badge>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transform Your Future with CodePathway<span className="relative">
                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full"></span>
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join thousands of learners who have transformed their careers through our interactive, project-based learning platform. Master in-demand skills and build real-world projects.
            </motion.p>

            {/* Developer Credit Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border shadow-sm">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Crafted with passion by Amara Mehdi</span>
              </div>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 group"
                onClick={handleStartLearning}
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2"
                onClick={handleExploreRoadmaps}
              >
                Explore Roadmaps
              </Button>
            </motion.div>
            
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="flex flex-col items-center p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`p-3 rounded-full mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-center text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Learning Tracks Section */}
        <section className="py-24 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:from-transparent dark:via-gray-900/30 dark:to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-2 px-3 py-1 text-sm bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Star className="w-4 h-4 mr-2" />
                Learning Paths
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path to Success</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Follow our carefully crafted learning paths designed to take you from beginner to professional
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tracks.map((track, idx) => (
                <motion.div
                  key={track.title}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={track.link} className="block">
                    <div className={`
                      relative p-6 rounded-xl overflow-hidden
                      bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50
                      backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50
                      group-hover:border-primary/50 transition-all duration-300
                      ${track.featured ? 'border-primary/50' : ''}
                    `}>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex justify-between items-start mb-4">
                        <div className={`
                          p-3 rounded-full
                          ${track.featured ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground'}
                        `}>
                          <track.icon className="h-6 w-6" />
                        </div>
                        {track.featured && (
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                            Featured
                          </Badge>
                        )}
                        {track.comingSoon && (
                          <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      
                      <div className="relative">
                        <h3 className="font-bold text-xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                          {track.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{track.description}</p>
                        
                        {track.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Your progress</span>
                              <span className="text-primary">{track.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                                style={{ width: `${track.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-800/50 flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          {track.comingSoon ? "Get notified" : track.progress > 0 ? "Continue Learning" : "Start Learning"}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" onClick={handleExploreRoadmaps}>
                View All Learning Paths
              </Button>
            </div>
          </div>
        </section>
        
        {/* Courses/Roadmaps Section */}
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
              Learning Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Learning Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of courses and interactive roadmaps
            </p>
          </motion.div>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="courses" className="text-lg py-3">
                  Popular Courses
                </TabsTrigger>
                <TabsTrigger value="roadmaps" className="text-lg py-3">
                  Interactive Roadmaps
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="courses" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={`/courses/${course.id}`}>
                      <Card className="overflow-hidden h-full border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400">
                              {course.level}
                            </Badge>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Book className="h-3 w-3 mr-1" />
                              {course.duration}
                            </div>
                          </div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Book className="h-3 w-3" />
                            Details
                          </Button>
                          <Button size="sm" className="gap-1 group">
                            <Play className="h-3 w-3 group-hover:scale-110 transition-transform" />
                            Start Learning
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button className="gap-1 group">
                  Explore All Courses
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="roadmaps" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center p-10 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-gray-200/50 dark:border-gray-800/50"
              >
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Interactive Learning Roadmaps</h3>
                <p className="max-w-2xl mx-auto mb-6 text-muted-foreground">
                  Our visual roadmaps guide you through the learning process with interactive mind maps, clear progression paths, and practical exercises.
                </p>
                <Button asChild className="gap-1 group bg-gradient-to-r from-primary to-purple-600">
                  <Link to="/roadmaps">
                    Explore Roadmaps
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent dark:from-primary/5 dark:via-purple-500/5 dark:to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to Transform Your Future?
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of successful developers who started their journey with us. Your future in tech starts here.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Browse Courses
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Code className="h-5 w-5" />
                  <span className="font-semibold">Developed by Amara Mehdi</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Digital Engineer Pathway. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
