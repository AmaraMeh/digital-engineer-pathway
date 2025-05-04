import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, X, Maximize2, Minimize2, RotateCcw, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  type: "main" | "sub" | "topic";
  status?: "recommended" | "alternative" | "optional";
  children?: Node[];
  courseId?: string;
  description?: string;
  completed?: boolean;
  progress?: number;
}

interface InteractiveMindMapProps {
  data: Node[];
  title: string;
  description: string;
}

export const InteractiveMindMap = ({ data, title, description }: InteractiveMindMapProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["html", "css"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNodes, setFilteredNodes] = useState<Node[]>(data);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth spring animations
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });
  const springRotation = useSpring(rotation, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNodes(data);
      return;
    }

    const searchLower = searchQuery.toLowerCase();
    const filterNodes = (nodes: Node[]): Node[] => {
      return nodes.filter(node => {
        const matches = node.label.toLowerCase().includes(searchLower) ||
                       node.description?.toLowerCase().includes(searchLower);
        
        if (node.children) {
          const filteredChildren = filterNodes(node.children);
          if (filteredChildren.length > 0) {
            return true;
          }
        }
        
        return matches;
      }).map(node => ({
        ...node,
        children: node.children ? filterNodes(node.children) : undefined
      }));
    };

    setFilteredNodes(filterNodes(data));
  }, [searchQuery, data]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    setOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };
      
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setScale(prev => Math.min(Math.max(prev - e.deltaY * 0.001, 0.5), 2));
    } else {
      setRotation(prev => prev + e.deltaX * 0.1);
    }
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

  const getStatusClass = (status: string | undefined) => {
    switch (status) {
      case "recommended":
        return "bg-green-500/10 border-green-500/40 text-green-700 dark:text-green-400";
      case "alternative":
        return "bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400";
      case "optional":
        return "bg-gray-500/10 border-gray-500/40 text-gray-600 dark:text-gray-400";
      default:
        return "bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-400";
    }
  };
  
  const getProgressColor = (progress: number | undefined) => {
    if (progress === undefined) return "bg-gray-200 dark:bg-gray-700";
    if (progress === 100) return "bg-green-500";
    if (progress > 0) return "bg-primary";
    return "bg-gray-200 dark:bg-gray-700";
  };

  const calculateNodePosition = (node: Node, index: number, total: number, level: number = 0) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 200 + (level * 150);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  const renderNode = (node: Node, index: number, total: number, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;
    const position = calculateNodePosition(node, index, total, level);
    
    return (
      <motion.div 
        key={node.id}
        className="absolute"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: position.x + offset.x,
          y: position.y + offset.y,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        style={{ left: -100, top: -80 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
        <motion.div
                className={cn(
                  "cursor-pointer w-[220px] rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-sm border-2",
                  "shadow-lg hover:shadow-xl transition-all duration-300",
            isSelected 
                    ? "border-primary shadow-primary/20" 
                    : "border-gray-700 dark:border-gray-600 hover:border-primary/50 dark:hover:border-primary/50"
                )}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
        >
          <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                      {node.label}
                    </h3>
                    {node.status && (
                      <Badge className={getStatusClass(node.status)}>
                        {node.status}
                      </Badge>
                    )}
                  </div>
                  
                  {node.description && (
                    <p className="text-xs text-gray-300 dark:text-gray-400 mb-3">
                      {node.description.substring(0, 60)}...
                    </p>
                  )}
            
            {node.progress !== undefined && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-300 dark:text-gray-400">{node.progress}%</span>
                </div>
                      <div className="w-full h-1.5 bg-gray-700 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div 
                    className={`h-full rounded-full ${getProgressColor(node.progress)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${node.progress || 0}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                </div>
              </div>
            )}
            
            {node.children && node.children.length > 0 && (
              <div className="mt-3 text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                        className="gap-1 text-gray-300 hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                >
                        {isExpanded ? (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Collapse
                          </>
                        ) : (
                          <>
                            <ChevronRight className="h-4 w-4" />
                            Expand
                          </>
                        )}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{node.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {node.children && isExpanded && node.children.map((child, childIndex) => {
          const childPosition = calculateNodePosition(child, childIndex, node.children!.length, level + 1);
          const startX = position.x + offset.x;
          const startY = position.y + offset.y;
          const endX = childPosition.x + offset.x;
          const endY = childPosition.y + offset.y;
          
          return (
            <motion.div 
              key={child.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: childPosition.x + offset.x,
                y: childPosition.y + offset.y,
                transition: { type: "spring", stiffness: 300, damping: 30 }
              }}
              style={{ left: -100, top: -80 }}
            >
              <svg 
                className="absolute"
                style={{
                  left: 0,
                  top: 0, 
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none"
                }}
              >
                <motion.path
                  d={`M ${startX + 100} ${startY + 80} C ${(startX + endX) / 2} ${startY + 80}, ${(startX + endX) / 2} ${endY + 80}, ${endX + 100} ${endY + 80}`}
                  stroke="rgba(99, 102, 241, 0.5)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
              {renderNode(child, childIndex, node.children!.length, level + 1)}
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-grid-pattern">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          {title}
        </h1>
          <p className="text-sm text-gray-300 mt-1">{description}</p>
      </div>
      
          <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/90 border-gray-700 text-gray-300"
            />
            {searchQuery && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
            className="bg-gray-900/90 border-gray-700 text-gray-300"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
            className="bg-gray-900/90 border-gray-700 text-gray-300"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setRotation(0);
              setScale(1);
              setOffset({ x: 0, y: 0 });
            }}
            className="bg-gray-900/90 border-gray-700 text-gray-300"
          >
            <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
      
      <motion.div
        ref={containerRef}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          scale: springScale,
          rotate: springRotation,
          cursor: isDragging ? "grabbing" : "grab"
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {filteredNodes.map((node, index) => renderNode(node, index, filteredNodes.length))}
        </div>
            </motion.div>
    </div>
  );
};
