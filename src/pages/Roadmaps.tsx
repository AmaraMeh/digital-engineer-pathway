import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Check, Lock, ChevronRight, Award, Star, Play, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/confetti.css";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  const [activeRoadmap, setActiveRoadmap] = useState<string | null>(null);
  const [showNodeDetails, setShowNodeDetails] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Filtered data based on activeRoadmap and search query
  const filteredData = activeRoadmap 
    ? allData.filter(item => item.id === activeRoadmap)
    : allData;

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
    if (node.completed) return "completed";
    if (node.status === "locked") return "locked";
    if (node.dependencies) {
      const allDependenciesCompleted = node.dependencies.every(depId => {
        const depNode = findNodeById(depId, allData);
        return depNode?.completed;
      });
      if (!allDependenciesCompleted) return "locked";
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
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  const renderNode = (node: Node, level: number = 0) => {
    const status = nodeStatus(node);
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = showNodeDetails === node.id;

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
            ${isSelected ? 'bg-primary/10 border-primary' : 'bg-gray-900/50 border-gray-800'}
            border-2 hover:border-primary/50
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNodeDetails(node.id === showNodeDetails ? null : node.id)}
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
              
              {node.progress !== undefined && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{node.progress}%</span>
                  </div>
                  <Progress value={node.progress} className="h-1.5" />
                </div>
              )}
            </div>
          </div>

          {node.children && node.children.length > 0 && (
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
          {isExpanded && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-2"
            >
              {node.children.map(child => renderNode(child, level + 1))}
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
      
          <div className="flex flex-wrap gap-2">
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
      </div>
      
        <div className="grid grid-cols-1 gap-6">
          {filteredBySearch.map(roadmap => (
          <motion.div
            key={roadmap.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            >
              {renderNode(roadmap)}
          </motion.div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
