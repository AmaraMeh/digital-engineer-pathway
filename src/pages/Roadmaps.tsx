
import { FrontendRoadmap } from "@/components/roadmap/FrontendRoadmap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Server, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const Roadmaps = () => {
  const [selectedTab, setSelectedTab] = useState("frontend");
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
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Learning Roadmaps
          </h1>
          <p className="text-xl text-muted-foreground">
            Follow structured learning paths to master programming and computer science fundamentals
          </p>
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
          
          <div className="mb-8 text-center">
            <Badge className="mb-2 px-3 py-1 bg-primary/10 text-primary">
              {selectedTab === "frontend" ? "Frontend Development" : 
               selectedTab === "backend" ? "Backend Development" : "DevOps Engineering"}
            </Badge>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {roadmapDescriptions[selectedTab as keyof typeof roadmapDescriptions]}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            <TabsContent value="frontend" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FrontendRoadmap />
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
          </AnimatePresence>
        </Tabs>
      </div>
      
      <Footer />
    </>
  );
};

export default Roadmaps;
