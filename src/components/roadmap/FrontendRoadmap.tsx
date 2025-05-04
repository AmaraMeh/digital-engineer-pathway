
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, ArrowRight, ExternalLink } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "main" | "sub" | "topic";
  status?: "recommended" | "alternative" | "optional";
  children?: Node[];
  link?: string;
  courseId?: string;
  description?: string;
  completed?: boolean;
  progress?: number;
}

const frontendData: Node[] = [
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

export function FrontendRoadmap() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["internet", "html", "css"]));
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const toggleExpand = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  const getStatusClass = (status: string | undefined) => {
    switch (status) {
      case "recommended":
        return "bg-green-500/10 border-green-500/40 text-green-700";
      case "alternative":
        return "bg-amber-500/10 border-amber-500/40 text-amber-600";
      case "optional":
        return "bg-gray-500/10 border-gray-500/40 text-gray-600";
      default:
        return "bg-blue-500/10 border-blue-500/40 text-blue-700";
    }
  };
  
  const getProgressColor = (progress: number | undefined) => {
    if (progress === undefined) return "bg-gray-200";
    if (progress === 100) return "bg-green-500";
    if (progress > 0) return "bg-primary";
    return "bg-gray-200";
  };

  return (
    <div className="w-full">
      <Card className="mb-8 hover:shadow-lg transition-all">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Frontend Development Roadmap
          </CardTitle>
          <CardDescription className="text-lg">
            A comprehensive guide to becoming a frontend developer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Recommended Path</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm">Alternative Option</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm">Optional</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-10">
        {frontendData.map((node) => (
          <div key={node.id} className="relative">
            <Card 
              className="overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-primary animate-fade-in"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{node.label}</CardTitle>
                    <CardDescription>{node.description}</CardDescription>
                  </div>
                  {node.children && node.children.length > 0 && (
                    <Button 
                      variant={expandedNodes.has(node.id) ? "default" : "outline"} 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(node.id);
                      }}
                      className="transition-transform duration-300"
                    >
                      {expandedNodes.has(node.id) ? "Collapse" : "Expand"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              {expandedNodes.has(node.id) && (
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4 animate-fade-in">
                  {node.children?.map((child) => (
                    <div 
                      key={child.id} 
                      className={cn(
                        "bg-card border rounded-xl p-4 hover:shadow-md transition-transform hover:-translate-y-1",
                        hoveredNode === node.id && "animate-fade-in"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={cn(getStatusClass(child.status))}>
                          {child.status === "recommended" ? "Recommended" : 
                           child.status === "alternative" ? "Alternative" : "Optional"}
                        </Badge>
                        {child.completed && (
                          <Badge variant="outline" className="border-green-500 text-green-500 flex gap-1">
                            <Check className="h-3 w-3" /> Completed
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-1">{child.label}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{child.description}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{child.progress || 0}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getProgressColor(child.progress)}`}
                            style={{ width: `${child.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <Button variant="outline" size="sm" asChild className="gap-1">
                          <Link to={`/courses/${child.courseId}`}>
                            <BookOpen className="h-4 w-4" /> Course Details
                          </Link>
                        </Button>
                        <Button size="sm" asChild className="gap-1 group">
                          <Link to={`/courses/${child.courseId}/learn`}>
                            {child.progress && child.progress > 0 ? "Continue" : "Start Learning"}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
