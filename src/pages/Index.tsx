
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Code, Terminal, Laptop, Server, ArrowRight, Play, Award, ChevronRight, Sparkles } from "lucide-react";

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
    description: "Build stunning user interfaces with HTML, CSS, and modern JavaScript frameworks",
    progress: 45,
    link: "/roadmaps",
    featured: true
  },
  {
    title: "Backend Development",
    icon: Server,
    description: "Master server-side programming, databases, APIs, and system design",
    progress: 0,
    link: "/roadmaps",
    comingSoon: true
  },
  {
    title: "Full Stack Development",
    icon: Code,
    description: "Become proficient in both frontend and backend technologies",
    progress: 0,
    link: "/roadmaps",
    comingSoon: true
  },
  {
    title: "DevOps Engineering",
    icon: Terminal,
    description: "Learn CI/CD, containerization, and cloud infrastructure",
    progress: 0,
    link: "/roadmaps",
    comingSoon: true
  }
];

const popularCourses = [
  {
    id: "html-basics",
    title: "HTML Basics",
    description: "Learn the fundamentals of HTML, the building block of the web",
    image: "https://via.placeholder.com/300x200",
    level: "Beginner",
    duration: "2 hours"
  },
  {
    id: "css-fundamentals",
    title: "CSS Fundamentals",
    description: "Style your HTML with CSS to create beautiful websites",
    image: "https://via.placeholder.com/300x200",
    level: "Beginner",
    duration: "3 hours"
  },
  {
    id: "js-fundamentals",
    title: "JavaScript Essentials",
    description: "Add interactivity to your websites with JavaScript",
    image: "https://via.placeholder.com/300x200",
    level: "Beginner",
    duration: "4 hours"
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
  
  return (
    <>
      <Navbar />
      
      <div className="relative">
        <HeroBackgroundAnimation />
        <FloatingParticles />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary">
                Welcome to the Coding Odyssey
              </Badge>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The Future of <span className="relative">
                Programming Education
                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full"></span>
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Master programming through interactive learning experiences, hands-on projects, and guided roadmaps designed for the developers of tomorrow.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 group">
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2">
                View Roadmaps
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
                Learning Paths
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Learning Track</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Follow structured paths designed to transform you into a confident developer
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tracks.map((track, idx) => (
                <motion.div
                  key={track.title}
                  className={`rounded-xl overflow-hidden group cursor-pointer ${
                    track.featured ? "border-2 border-primary" : "border border-gray-200 dark:border-gray-800"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={track.link} className="block">
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-full ${
                          track.featured ? "bg-primary/10 text-primary" : "bg-gray-100 dark:bg-gray-800 text-muted-foreground"
                        }`}>
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
                      
                      <h3 className="font-bold text-xl mb-2">{track.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{track.description}</p>
                      
                      {track.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Your progress</span>
                            <span>{track.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${track.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/60 p-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-800">
                      <span className="text-sm font-medium">
                        {track.comingSoon ? "Get notified" : track.progress > 0 ? "Continue Learning" : "Start Learning"}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
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
              Learning Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dive into Learning</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully designed resources to accelerate your learning journey
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
                        <div className="overflow-hidden h-40">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
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
                Ready to Begin Your Journey?
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Start learning today and transform your future in the world of programming.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Browse Courses
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default Index;
