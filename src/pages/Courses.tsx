
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Book, Code, Layout, Terminal, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

// Course data structure
type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  image?: string;
  progress?: number;
  tags: string[];
};

const coursesData: Course[] = [
  {
    id: "html-basics",
    title: "HTML Basics",
    description: "Learn the fundamentals of HTML, tags, and document structure",
    category: "Frontend",
    level: "beginner",
    duration: "2 hours",
    lessons: 12,
    progress: 0,
    tags: ["html", "web", "frontend"],
  },
  {
    id: "html-forms",
    title: "HTML Forms & Validation",
    description: "Create interactive forms and implement client-side validation",
    category: "Frontend",
    level: "beginner",
    duration: "3 hours",
    lessons: 15,
    progress: 0,
    tags: ["html", "forms", "validation", "frontend"],
  },
  {
    id: "css-basics",
    title: "CSS Foundations",
    description: "Style your HTML with CSS and learn about selectors and properties",
    category: "Frontend",
    level: "beginner",
    duration: "4 hours",
    lessons: 20,
    progress: 0,
    tags: ["css", "styling", "frontend"],
  },
  {
    id: "js-basics",
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript programming",
    category: "Frontend",
    level: "beginner",
    duration: "6 hours",
    lessons: 24,
    progress: 0,
    tags: ["javascript", "programming", "frontend"],
  },
  {
    id: "semantic-html",
    title: "Semantic HTML",
    description: "Write meaningful HTML that improves accessibility and SEO",
    category: "Frontend",
    level: "intermediate",
    duration: "1.5 hours",
    lessons: 8,
    progress: 0,
    tags: ["html", "accessibility", "seo", "frontend"],
  },
  {
    id: "html-accessibility",
    title: "Web Accessibility",
    description: "Build inclusive web experiences for all users",
    category: "Frontend",
    level: "intermediate",
    duration: "2.5 hours",
    lessons: 10,
    progress: 0,
    tags: ["html", "accessibility", "aria", "frontend"],
  }
];

const Courses = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filter === "all" || course.category.toLowerCase() === filter.toLowerCase();
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">You need to be logged in to view this page</h1>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Courses</h1>
          <p className="text-lg text-muted-foreground">
            Master web development with our comprehensive courses
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="devops">DevOps</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Tabs defaultValue="all" value={levelFilter} onValueChange={setLevelFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Levels</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in" data-aos="fade-up">
                <CardHeader className="p-6 pb-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1 text-balance">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </div>
                    <Badge variant={course.level === 'beginner' ? 'secondary' : course.level === 'intermediate' ? 'default' : 'destructive'} className="capitalize">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-4">
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <Progress value={course.progress || 0} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {course.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="capitalize text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button variant="outline" className="w-full mr-2">Preview</Button>
                  <Button asChild className="w-full">
                    <Link to={`/courses/${course.id}`}>
                      {course.progress && course.progress > 0 ? 'Continue' : 'Start'} Learning
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
              <Button onClick={() => { setSearchTerm(''); setFilter('all'); setLevelFilter('all'); }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
