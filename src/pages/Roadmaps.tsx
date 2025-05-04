
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Laptop, Server, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { InteractiveMindMap } from "@/components/roadmap/InteractiveMindMap";
import { FrontendRoadmap } from "@/components/roadmap/FrontendRoadmap";

// Frontend roadmap data structure
const frontendData = [
  {
    id: "internet",
    label: "Internet",
    type: "main",
    description: "Understanding how the internet works is fundamental to web development",
    children: [
      { 
        id: "internet-works", 
        label: "How does the internet work?", 
        type: "topic", 
        status: "recommended",
        courseId: "internet-basics",
        description: "Learn about the backbone of the web",
        completed: false,
        progress: 0
      },
      { 
        id: "http", 
        label: "What is HTTP?", 
        type: "topic", 
        status: "recommended",
        courseId: "http-fundamentals",
        description: "The protocol that powers the web",
        completed: false,
        progress: 0
      },
      { 
        id: "domain", 
        label: "What is Domain Name?", 
        type: "topic", 
        status: "recommended",
        courseId: "domains",
        description: "Understanding web addressing",
        completed: false,
        progress: 0
      },
      { 
        id: "dns", 
        label: "DNS and how it works?", 
        type: "topic", 
        status: "recommended",
        courseId: "dns-explained",
        description: "The internet's phone book",
        completed: false,
        progress: 0
      },
      { 
        id: "browsers", 
        label: "Browsers and how they work?", 
        type: "topic", 
        status: "recommended",
        courseId: "browser-internals",
        description: "Understanding browser rendering engines",
        completed: false,
        progress: 0
      },
    ]
  },
  {
    id: "html",
    label: "HTML",
    type: "main",
    description: "The building blocks of any website",
    children: [
      { 
        id: "html-basics", 
        label: "Learn the basics", 
        type: "topic", 
        status: "recommended",
        courseId: "html-basics",
        description: "HTML fundamentals for beginners",
        completed: true,
        progress: 100
      },
      { 
        id: "semantic-html", 
        label: "Writing Semantic HTML", 
        type: "topic", 
        status: "recommended",
        courseId: "semantic-html",
        description: "Creating meaningful markup",
        completed: false, 
        progress: 45
      },
      { 
        id: "forms-validation", 
        label: "Forms and Validations", 
        type: "topic", 
        status: "recommended",
        courseId: "html-forms",
        description: "Building interactive forms",
        completed: false,
        progress: 0
      },
      { 
        id: "accessibility", 
        label: "Accessibility", 
        type: "topic", 
        status: "recommended",
        courseId: "web-accessibility",
        description: "Making the web usable for everyone",
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "css",
    label: "CSS",
    type: "main",
    description: "Style and layout for your web pages",
    children: [
      { 
        id: "css-basics", 
        label: "Learn the basics", 
        type: "topic", 
        status: "recommended",
        courseId: "css-fundamentals",
        description: "CSS fundamentals for styling web pages",
        completed: false,
        progress: 20
      },
      { 
        id: "layouts", 
        label: "Making Layouts", 
        type: "topic", 
        status: "recommended", 
        courseId: "css-layouts",
        description: "Creating complex page layouts",
        completed: false,
        progress: 0
      },
      { 
        id: "responsive", 
        label: "Responsive Design", 
        type: "topic", 
        status: "recommended", 
        courseId: "responsive-web",
        description: "Adapting to different screen sizes",
        completed: false,
        progress: 0
      },
    ]
  },
  {
    id: "javascript",
    label: "JavaScript",
    type: "main",
    description: "Add interactivity to your websites",
    children: [
      { 
        id: "js-basics", 
        label: "Learn the Basics", 
        type: "topic", 
        status: "recommended", 
        courseId: "js-fundamentals",
        description: "JavaScript syntax and core concepts",
        completed: false,
        progress: 0
      },
      { 
        id: "dom", 
        label: "Learn DOM Manipulation", 
        type: "topic", 
        status: "recommended", 
        courseId: "dom-manipulation",
        description: "Interacting with page elements",
        completed: false,
        progress: 0
      },
      { 
        id: "fetch", 
        label: "Fetch API / Ajax", 
        type: "topic", 
        status: "recommended", 
        courseId: "fetch-api",
        description: "Making asynchronous requests",
        completed: false,
        progress: 0
      },
    ]
  },
  {
    id: "framework",
    label: "Frontend Framework",
    type: "main",
    description: "Tools to build complex user interfaces",
    children: [
      { 
        id: "react", 
        label: "React", 
        type: "topic", 
        status: "recommended", 
        courseId: "react-fundamentals",
        description: "Component-based UI library",
        completed: false,
        progress: 0
      },
      { 
        id: "vue", 
        label: "Vue.js", 
        type: "topic", 
        status: "alternative", 
        courseId: "vue-fundamentals",
        description: "Progressive JavaScript framework",
        completed: false,
        progress: 0
      },
      { 
        id: "angular", 
        label: "Angular", 
        type: "topic", 
        status: "alternative", 
        courseId: "angular-fundamentals",
        description: "Platform for building web applications",
        completed: false,
        progress: 0
      }
    ]
  }
];

const Roadmaps = () => {
  const [selectedTab, setSelectedTab] = useState("frontend");
  const [viewMode, setViewMode] = useState<"mindmap" | "list">("mindmap");
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setLoaded(true);
    
    // Show toast when user switches tabs
    if (loaded && selectedTab !== "frontend") {
      toast({
        title: "Coming Soon!",
        description: `The ${selectedTab === "backend" ? "Backend" : "DevOps"} roadmap is currently under development.`,
      });
    }
  }, [selectedTab, loaded, toast]);
  
  const roadmapDescriptions = {
    frontend: "Master HTML, CSS, JavaScript and modern frontend frameworks to build stunning user interfaces",
    backend: "Learn server-side programming, databases, APIs, and system architecture",
    devops: "Explore continuous integration, deployment, containerization, and cloud services"
  };

  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Learning Roadmaps
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Follow structured learning paths to master programming and computer science fundamentals
          </motion.p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full grid-cols-3 md:w-[600px] mx-auto">
              <TabsTrigger value="frontend" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Laptop className="h-4 w-4" />
                <span>Frontend</span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Server className="h-4 w-4" />
                <span>Backend</span>
              </TabsTrigger>
              <TabsTrigger value="devops" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Terminal className="h-4 w-4" />
                <span>DevOps</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-6 flex justify-between items-center">
            <div className="text-center mx-auto">
              <Badge className="mb-2 px-3 py-1 bg-primary/10 text-primary">
                {selectedTab === "frontend" ? "Frontend Development" : 
                 selectedTab === "backend" ? "Backend Development" : "DevOps Engineering"}
              </Badge>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {roadmapDescriptions[selectedTab as keyof typeof roadmapDescriptions]}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Badge 
                className={`cursor-pointer px-3 py-1 ${viewMode === "mindmap" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-primary/20"}`}
                onClick={() => setViewMode("mindmap")}
              >
                Mind Map
              </Badge>
              <Badge 
                className={`cursor-pointer px-3 py-1 ${viewMode === "list" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-primary/20"}`}
                onClick={() => setViewMode("list")}
              >
                List View
              </Badge>
            </div>
          </div>
          
          <TabsContent value="frontend" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {viewMode === "mindmap" ? (
                <InteractiveMindMap 
                  data={frontendData} 
                  title="Frontend Development Roadmap" 
                  description="A visual guide to becoming a frontend developer"
                />
              ) : (
                <FrontendRoadmap />
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="backend" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-full p-6 hover:shadow-lg transition-all border-dashed">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">Backend Development Roadmap</CardTitle>
                  <CardDescription className="text-lg">
                    Backend roadmap content is coming soon. Check back later!
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="devops" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-full p-6 hover:shadow-lg transition-all border-dashed">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">DevOps Roadmap</CardTitle>
                  <CardDescription className="text-lg">
                    DevOps roadmap content is coming soon. Check back later!
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </>
  );
};

export default Roadmaps;
