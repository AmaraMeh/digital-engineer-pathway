
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Lock, ChevronRight, Award, Star, Play } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/confetti.css";

type NodeType = "main" | "sub" | "topic";

interface Node {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  status?: string;
  courseId?: string;
  completed?: boolean;
  progress?: number;
  children?: Node[];
  dependencies?: string[];
  tags?: string[];
}

// Update your data initialization to match the Node type
const htmlData: Node[] = [
  {
    id: "html-basics",
    label: "HTML Basics",
    type: "main" as NodeType,
    description: "Learn the fundamentals of HTML",
    progress: 33,
    tags: ["beginner", "essential", "foundation"],
    children: [
      {
        id: "html-intro",
        label: "Introduction to HTML",
        type: "sub" as NodeType,
        status: "available",
        courseId: "html-basics",
        description: "Learn what HTML is and how it structures the web",
        completed: true,
        progress: 100,
      },
      {
        id: "html-elements",
        label: "HTML Elements",
        type: "sub" as NodeType,
        status: "available",
        courseId: "html-basics",
        description: "Learn about different HTML elements and their usage",
        completed: false,
        progress: 0,
      },
      {
        id: "html-attributes",
        label: "HTML Attributes",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "html-basics",
        description: "Understand how to use attributes to modify HTML elements",
        completed: false,
        progress: 0,
        dependencies: ["html-elements"],
      },
    ],
  },
];

const cssData: Node[] = [
  {
    id: "css-basics",
    label: "CSS Basics",
    type: "main" as NodeType,
    description: "Learn the fundamentals of CSS",
    progress: 0,
    tags: ["beginner", "essential", "styling"],
    dependencies: ["html-basics"],
    children: [
      {
        id: "css-intro",
        label: "Introduction to CSS",
        type: "sub" as NodeType,
        status: "available",
        courseId: "css-basics",
        description: "Learn what CSS is and how it styles the web",
        completed: false,
        progress: 0,
      },
      {
        id: "css-selectors",
        label: "CSS Selectors",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "css-basics",
        description: "Learn how to select HTML elements with CSS",
        completed: false,
        progress: 0,
        dependencies: ["css-intro"],
      },
      {
        id: "css-properties",
        label: "CSS Properties",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "css-basics",
        description: "Understand common CSS properties and their values",
        completed: false,
        progress: 0,
        dependencies: ["css-selectors"],
      },
    ],
  },
];

const jsData: Node[] = [
  {
    id: "js-basics",
    label: "JavaScript Basics",
    type: "main" as NodeType,
    description: "Learn the fundamentals of JavaScript",
    progress: 0,
    tags: ["beginner", "essential", "interactive"],
    dependencies: ["html-basics", "css-basics"],
    children: [
      {
        id: "js-intro",
        label: "Introduction to JavaScript",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "js-basics",
        description: "Learn what JavaScript is and how it adds interactivity",
        completed: false,
        progress: 0,
      },
      {
        id: "js-variables",
        label: "JavaScript Variables",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "js-basics",
        description: "Learn how to declare and use variables in JavaScript",
        completed: false,
        progress: 0,
        dependencies: ["js-intro"],
      },
      {
        id: "js-functions",
        label: "JavaScript Functions",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "js-basics",
        description: "Understand how to define and call functions in JavaScript",
        completed: false,
        progress: 0,
        dependencies: ["js-variables"],
      },
    ],
  },
];

const reactData: Node[] = [
  {
    id: "react-basics",
    label: "React Fundamentals",
    type: "main" as NodeType,
    description: "Learn the core concepts of React",
    progress: 0,
    tags: ["intermediate", "framework", "UI"],
    dependencies: ["js-basics"],
    children: [
      {
        id: "react-intro",
        label: "Introduction to React",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "react-basics",
        description: "Learn what React is and its core principles",
        completed: false,
        progress: 0,
      },
      {
        id: "react-components",
        label: "React Components",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "react-basics",
        description: "Learn how to create and use React components",
        completed: false,
        progress: 0,
        dependencies: ["react-intro"],
      },
      {
        id: "react-hooks",
        label: "React Hooks",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "react-basics",
        description: "Master the use of hooks for state and effects",
        completed: false,
        progress: 0,
        dependencies: ["react-components"],
      },
    ],
  },
];

// Make sure all nodes in the allData array are properly typed
const allData: Node[] = [...htmlData, ...cssData, ...jsData, ...reactData];

const Roadmaps = () => {
  const [activeRoadmap, setActiveRoadmap] = useState<string | null>(null);
  const [showNodeDetails, setShowNodeDetails] = useState<string | null>(null);

  // Filtered data based on activeRoadmap
  const filteredData = activeRoadmap 
    ? allData.filter(item => item.id === activeRoadmap)
    : allData;

  const nodeStatus = (node: Node): "completed" | "active" | "locked" => {
    if (node.completed) return "completed";
    if (node.status === "locked") return "locked";
    if (node.dependencies) {
      // Check if all dependencies are completed
      const allDependenciesCompleted = node.dependencies.every(depId => {
        // Find the dependency node
        const depNode = findNodeById(depId, allData);
        return depNode?.completed;
      });
      if (!allDependenciesCompleted) return "locked";
    }
    return "active";
  };

  // Helper function to find a node by ID in the tree
  const findNodeById = (id: string, nodes: Node[]): Node | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(id, node.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Learning Roadmaps
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Follow structured learning paths to master web development skills. Each roadmap is designed to guide you from beginner to advanced concepts.
        </p>
      </div>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeRoadmap === null ? "default" : "outline"} 
          onClick={() => setActiveRoadmap(null)}
          className="rounded-full"
        >
          All Paths
        </Button>
        {allData.map(roadmap => (
          <Button 
            key={roadmap.id}
            variant={activeRoadmap === roadmap.id ? "default" : "outline"}
            onClick={() => setActiveRoadmap(roadmap.id)}
            className="rounded-full"
          >
            {roadmap.label}
          </Button>
        ))}
      </div>
      
      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((roadmap) => (
          <motion.div
            key={roadmap.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className="h-full bg-white shadow-lg rounded-lg overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-1">
                  <CardTitle className="text-xl font-bold">{roadmap.label}</CardTitle>
                  {roadmap.tags && roadmap.tags.length > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {roadmap.tags[0]}
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">{roadmap.description}</CardDescription>
                
                {/* Progress indicator */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{roadmap.progress || 0}%</span>
                  </div>
                  <Progress value={roadmap.progress || 0} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Included Topics:</h3>
                <ul className="space-y-3">
                  {roadmap.children?.map((course) => (
                    <motion.li 
                      key={course.id} 
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div 
                        className={`
                          flex items-center p-2 rounded-md cursor-pointer
                          ${showNodeDetails === course.id ? 'bg-muted' : 'hover:bg-muted/50'}
                          ${nodeStatus(course) === "locked" ? "opacity-60" : ""}
                        `}
                        onClick={() => setShowNodeDetails(
                          showNodeDetails === course.id ? null : course.id
                        )}
                      >
                        <div className="mr-3">
                          {nodeStatus(course) === "completed" ? (
                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : nodeStatus(course) === "locked" ? (
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <Play className="h-4 w-4 text-primary" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium text-sm">{course.label}</div>
                          {course.progress !== undefined && (
                            <div className="w-full bg-muted h-1 rounded-full mt-1">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Expanded details */}
                      {showNodeDetails === course.id && (
                        <motion.div 
                          className="mt-2 ml-11 pl-2 border-l-2 border-muted"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                          <Link 
                            to={
                              nodeStatus(course) !== "locked" 
                                ? `/courses/${course.courseId}` 
                                : "#"
                            }
                            className={nodeStatus(course) === "locked" ? "pointer-events-none" : ""}
                          >
                            <Button 
                              size="sm" 
                              variant={nodeStatus(course) === "locked" ? "outline" : "default"}
                              className="w-full mt-2"
                              disabled={nodeStatus(course) === "locked"}
                            >
                              {nodeStatus(course) === "locked" 
                                ? "Locked" 
                                : nodeStatus(course) === "completed"
                                ? "Review Course" 
                                : "Start Learning"}
                            </Button>
                          </Link>
                          
                          {nodeStatus(course) === "locked" && course.dependencies && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              <p>Complete these first:</p>
                              <ul className="mt-1 list-disc list-inside">
                                {course.dependencies.map(depId => {
                                  const dep = findNodeById(depId, allData);
                                  return dep ? (
                                    <li key={depId}>{dep.label}</li>
                                  ) : null;
                                })}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-2 border-t">
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{roadmap.children?.length || 0} topics</span>
                  </div>
                  <Link to={`/courses/${roadmap.id}`} className="text-primary hover:underline flex items-center text-sm font-medium">
                    View Full Roadmap
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
