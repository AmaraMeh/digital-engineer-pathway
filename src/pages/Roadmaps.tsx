import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Check, Lock, ChevronRight, Award, Star, Play, Search, X, ChevronDown, ChevronUp, Trophy, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/confetti.css";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";

type NodeType = "main" | "sub" | "topic" | "section";

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

// Frontend Development Section
const frontendData: Node[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    description: "Master the fundamentals of frontend development",
    type: "section",
    children: [
      {
        id: "html-basics",
        label: "HTML Basics",
        description: "Learn the structure of web pages",
        type: "main",
        courseId: "html-basics",
        tags: ["Beginner"],
        children: [
          {
            id: "html-intro",
            label: "Introduction to HTML",
            description: "Understanding HTML structure and elements",
            type: "sub",
            completed: false
          },
          {
            id: "html-forms",
            label: "HTML Forms",
            description: "Creating interactive forms",
            type: "sub",
            completed: false
          },
          {
            id: "html-semantics",
            label: "HTML Semantics",
            description: "Using semantic HTML elements",
            type: "sub",
            completed: false
          }
        ]
      },
      {
        id: "css-basics",
        label: "CSS Basics",
        description: "Style your web pages beautifully",
        type: "main",
        courseId: "css-basics",
        tags: ["Beginner"],
        dependencies: ["html-basics"],
        children: [
          {
            id: "css-intro",
            label: "Introduction to CSS",
            description: "Understanding CSS selectors and properties",
            type: "sub",
            completed: false
          },
          {
            id: "css-layout",
            label: "CSS Layout",
            description: "Mastering CSS layout techniques",
            type: "sub",
            completed: false
          },
          {
            id: "css-responsive",
            label: "Responsive Design",
            description: "Making websites work on all devices",
            type: "sub",
            completed: false
          }
        ]
      },
      {
        id: "javascript-basics",
        label: "JavaScript Basics",
        description: "Add interactivity to your websites",
        type: "main",
        courseId: "javascript-basics",
        tags: ["Beginner"],
        dependencies: ["html-basics", "css-basics"],
        children: [
          {
            id: "js-intro",
            label: "Introduction to JavaScript",
            description: "Understanding JavaScript fundamentals",
            type: "sub",
            completed: false
          },
          {
            id: "js-dom",
            label: "DOM Manipulation",
            description: "Interacting with web page elements",
            type: "sub",
            completed: false
          },
          {
            id: "js-events",
            label: "Events and Handlers",
            description: "Responding to user interactions",
            type: "sub",
            completed: false
          }
        ]
      },
      {
        id: "react-fundamentals",
        label: "React Fundamentals",
        description: "Build modern web applications with React",
        type: "main",
        courseId: "react-fundamentals",
        tags: ["Intermediate"],
        dependencies: ["javascript-basics"],
        children: [
          {
            id: "react-intro",
            label: "Introduction to React",
            description: "Understanding React components and JSX",
            type: "sub",
            completed: false
          },
          {
            id: "react-hooks",
            label: "React Hooks",
            description: "Using React hooks for state management",
            type: "sub",
            completed: false
          },
          {
            id: "react-routing",
            label: "React Routing",
            description: "Implementing navigation in React apps",
            type: "sub",
            completed: false
          }
        ]
      }
    ]
  }
];

const Roadmaps = () => {
  const { t } = useLanguage();
  const { courseProgress, userStats, loading, refreshProgress } = useProgress();
  const [activeRoadmap, setActiveRoadmap] = useState<string | null>(null);
  const [showNodeDetails, setShowNodeDetails] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Refresh progress when component mounts
  useEffect(() => {
    refreshProgress();
  }, []);

  const getCourseProgress = (courseId: string) => {
    const course = courseProgress.find(course => course.courseId === courseId);
    return course?.progress || 0;
  };

  const isCourseCompleted = (courseId: string) => {
    const course = courseProgress.find(course => course.courseId === courseId);
    return course?.completed || false;
  };

  const getCourseStatus = (courseId: string) => {
    const progress = getCourseProgress(courseId);
    if (progress === 100) return "completed";
    if (progress > 0) return "active";
    return "locked";
  };

  // Filtered data based on activeRoadmap and search query
  const filteredData = activeRoadmap 
    ? frontendData.filter(item => item.id === activeRoadmap)
    : frontendData;

  const filteredBySearch = searchQuery.trim() === "" 
    ? filteredData 
    : filteredData.filter(node => {
        const matches = node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       node.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (node.children) {
          const childMatches = node.children.some(child => 
            child.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            child.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return matches || childMatches;
        }
        
        return matches;
      });

  const nodeStatus = (node: Node): "completed" | "active" | "locked" => {
    if (node.type === "main" && node.courseId) {
      return getCourseStatus(node.courseId);
    }
    if (node.completed) return "completed";
    if (node.status === "locked") return "locked";
    if (node.dependencies) {
      const allDependenciesCompleted = node.dependencies.every(depId => {
        const depNode = findNodeById(depId, frontendData);
        return depNode?.type === "main" && depNode.courseId ? isCourseCompleted(depNode.courseId) : depNode?.completed;
      });
      return allDependenciesCompleted ? "active" : "locked";
    }
    return "active";
  };

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

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderNode = (node: Node, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const status = nodeStatus(node);
    const hasChildren = node.children && node.children.length > 0;
    const progress = node.type === "main" && node.courseId ? getCourseProgress(node.courseId) : node.progress;

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: level * 0.1 }}
        className={`relative ${level > 0 ? 'ml-8' : ''}`}
      >
        <motion.div
          className={`
            group relative p-4 rounded-lg transition-all duration-300
            ${showNodeDetails === node.id ? 'bg-primary/10 border-primary' : 'bg-gray-900/50 border-gray-800'}
            border-2 hover:border-primary/50
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(node.id);
            } else if (status !== "locked") {
              setShowNodeDetails(node.id === showNodeDetails ? null : node.id);
            }
          }}
        >
          <div className="flex items-start gap-3">
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${status === "completed" ? "bg-green-500" : 
                status === "locked" ? "bg-gray-600" : "bg-primary"}
            `}>
              {status === "completed" ? (
                <Check className="w-4 h-4 text-white" />
              ) : status === "locked" ? (
                <Lock className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  {node.label}
                </h3>
                {node.tags && node.tags.length > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {node.tags[0]}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-400 mt-1">{node.description}</p>
              
              {progress !== undefined && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              )}

              {node.type === "main" && node.courseId && (
                <div className="mt-2 text-xs text-gray-400">
                  {courseProgress.find(course => course.courseId === node.courseId)?.completedLessons || 0} of {courseProgress.find(course => course.courseId === node.courseId)?.totalLessons || 0} lessons completed
                </div>
              )}
            </div>
          </div>

          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 text-gray-400 hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
            >
              {isExpanded ? (
                <ChevronRight className="w-4 h-4 rotate-90" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-2"
            >
              {node.children?.map(child => renderNode(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageNavigation />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
          Learning Roadmaps
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your path and follow our structured learning roadmaps to achieve your goals
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Badge variant="outline" className="px-4 py-1">
            <Star className="w-4 h-4 mr-2" />
            {userStats.completedCourses} Courses Completed
          </Badge>
          <Badge variant="outline" className="px-4 py-1">
            <Trophy className="w-4 h-4 mr-2" />
            Rank: {userStats.rank}
          </Badge>
          <Badge variant="outline" className="px-4 py-1">
            <Zap className="w-4 h-4 mr-2" />
            {userStats.learningStreak} Day Streak
          </Badge>
        </div>
      </motion.div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-800"
            />
            {searchQuery && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {filteredBySearch.map(node => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderNode(node)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
