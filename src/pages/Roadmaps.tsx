
import { FrontendRoadmap } from "@/components/roadmap/FrontendRoadmap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Roadmaps = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Learning Roadmaps</h1>
        <p className="text-xl text-muted-foreground">
          Follow structured learning paths to master programming and computer science fundamentals
        </p>
      </div>

      <Tabs defaultValue="frontend" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px] mx-auto mb-8">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
        </TabsList>
        
        <TabsContent value="frontend">
          <FrontendRoadmap />
        </TabsContent>
        
        <TabsContent value="backend">
          <Card className="w-full p-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Backend Development Roadmap</CardTitle>
              <CardDescription>
                Backend roadmap content is coming soon. Check back later!
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        
        <TabsContent value="devops">
          <Card className="w-full p-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">DevOps Roadmap</CardTitle>
              <CardDescription>
                DevOps roadmap content is coming soon. Check back later!
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Roadmaps;
