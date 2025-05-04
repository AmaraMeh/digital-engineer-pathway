
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ArrowRight, BookOpen, Play, Code } from "lucide-react";

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
  const [nodesPosition, setNodesPosition] = useState<Record<string, { x: number, y: number }>>({});
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [centerPosition, setCenterPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Generate initial positions
    if (mapContainerRef.current) {
      const containerWidth = mapContainerRef.current.clientWidth;
      const containerHeight = mapContainerRef.current.clientHeight;
      
      setCenterPosition({
        x: containerWidth / 2,
        y: containerHeight / 2
      });
      
      const positions: Record<string, { x: number, y: number }> = {};
      
      // Place main nodes in a circle around the center
      data.forEach((node, index) => {
        const angle = (index / data.length) * 2 * Math.PI;
        const radius = Math.min(containerWidth, containerHeight) * 0.35;
        
        positions[node.id] = {
          x: centerPosition.x + radius * Math.cos(angle),
          y: centerPosition.y + radius * Math.sin(angle)
        };
        
        // For child nodes, place them in smaller circles around their parents
        if (node.children) {
          node.children.forEach((child, childIndex) => {
            const childAngle = ((childIndex / node.children!.length) * 2 * Math.PI) + angle;
            const childRadius = 150; // Smaller radius for children
            
            positions[child.id] = {
              x: positions[node.id].x + childRadius * Math.cos(childAngle),
              y: positions[node.id].y + childRadius * Math.sin(childAngle)
            };
          });
        }
      });
      
      setNodesPosition(positions);
    }
  }, [data, mapContainerRef.current?.clientWidth, mapContainerRef.current?.clientHeight]);

  const toggleExpand = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.6));
  };

  const resetView = () => {
    setScale(1);
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

  const renderNode = (node: Node) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;
    const position = nodesPosition[node.id] || { x: 0, y: 0 };
    
    return (
      <motion.div 
        key={node.id}
        className="absolute"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: position.x,
          y: position.y,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        style={{ left: -100, top: -80 }} // Offset to center the node
      >
        <motion.div
          className={`cursor-pointer w-[200px] rounded-xl bg-white dark:bg-gray-900 border-2 ${
            isSelected 
              ? "border-primary shadow-lg shadow-primary/20" 
              : "border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50"
          } overflow-hidden transition-all`}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
        >
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">{node.label}</h3>
            {node.description && <p className="text-xs text-gray-500 dark:text-gray-400">{node.description.substring(0, 60)}...</p>}
            
            {node.progress !== undefined && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{node.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(node.progress)}`}
                    style={{ width: `${node.progress || 0}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {node.children && node.children.length > 0 && (
              <div className="mt-3 text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                >
                  {isExpanded ? "Collapse" : "Expand"}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Render connections between nodes */}
        {node.children && isExpanded && node.children.map(child => {
          const childPosition = nodesPosition[child.id];
          if (!childPosition) return null;
          
          const startX = position.x;
          const startY = position.y;
          const endX = childPosition.x;
          const endY = childPosition.y;
          
          return (
            <motion.div 
              key={`${node.id}-${child.id}`} 
              className="absolute top-0 left-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
            >
              <svg 
                style={{
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: Math.abs(endX - startX) + 400, 
                  height: Math.abs(endY - startY) + 400,
                  overflow: 'visible'
                }}
              >
                <motion.path
                  d={`M${startX},${startY} Q${(startX+endX)/2},${(startY+endY)/2 - 50} ${endX},${endY}`}
                  stroke="var(--primary)" 
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          );
        })}
        
        {/* Render child nodes */}
        {isExpanded && node.children && node.children.map(child => renderNode(child))}
      </motion.div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
          {description}
        </p>
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={handleZoomOut}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </Button>
        <Button variant="outline" size="sm" onClick={resetView}>Reset</Button>
        <Button variant="outline" size="sm" onClick={handleZoomIn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </Button>
      </div>
      
      <Card className="relative overflow-hidden border-2 rounded-xl border-primary/20 shadow-xl shadow-primary/5 w-full" style={{ height: "70vh" }}>
        <div className="z-10 absolute top-2 left-2 right-2 flex justify-between items-center p-2 rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50">
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-500/10 border-green-500/40 text-green-700 dark:text-green-400">Recommended</Badge>
            <Badge variant="outline" className="bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400">Alternative</Badge>
            <Badge variant="outline" className="bg-gray-500/10 border-gray-500/40 text-gray-600 dark:text-gray-400">Optional</Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Click on a topic to view details
          </div>
        </div>
        
        <div
          ref={mapContainerRef}
          className="relative h-full w-full overflow-hidden p-4"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformOrigin: 'center center' }}
          >
            {data.map(node => renderNode(node))}
          </motion.div>
        </div>
      </Card>
      
      <AnimatePresence>
        {selectedNode && (() => {
          let selectedNodeData: Node | null = null;
          
          // Find the selected node in the data
          for (const node of data) {
            if (node.id === selectedNode) {
              selectedNodeData = node;
              break;
            }
            
            if (node.children) {
              for (const child of node.children) {
                if (child.id === selectedNode) {
                  selectedNodeData = child;
                  break;
                }
              }
            }
          }
          
          if (!selectedNodeData) return null;
          
          return (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6"
            >
              <Card className="border-2 border-primary/20 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge className={getStatusClass(selectedNodeData.status)}>
                        {selectedNodeData.status === "recommended" ? "Recommended" : 
                         selectedNodeData.status === "alternative" ? "Alternative" : "Optional"}
                      </Badge>
                      <h2 className="text-2xl font-bold mt-2">{selectedNodeData.label}</h2>
                    </div>
                    {selectedNodeData.completed && (
                      <Badge variant="outline" className="border-green-500 text-green-500 flex gap-1">
                        <Check className="h-3 w-3" /> Completed
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{selectedNodeData.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{selectedNodeData.progress || 0}%</span>
                    </div>
                    <Progress 
                      value={selectedNodeData.progress || 0} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <Button variant="outline" asChild className="gap-1">
                      <Link to={`/courses/${selectedNodeData.courseId}`}>
                        <BookOpen className="h-4 w-4" /> Course Details
                      </Link>
                    </Button>
                    <Button asChild className="gap-1 group bg-gradient-to-r from-primary to-purple-600">
                      <Link to={`/courses/${selectedNodeData.courseId}/learn`}>
                        <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        {selectedNodeData.progress && selectedNodeData.progress > 0 ? "Continue Learning" : "Start Learning"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
