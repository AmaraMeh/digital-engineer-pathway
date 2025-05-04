
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  type: "main" | "sub" | "topic";
  status?: "recommended" | "alternative" | "optional";
  children?: Node[];
  link?: string;
}

const frontendData: Node[] = [
  {
    id: "internet",
    label: "Internet",
    type: "main",
    children: [
      { id: "internet-works", label: "How does the internet work?", type: "topic", status: "recommended" },
      { id: "http", label: "What is HTTP?", type: "topic", status: "recommended" },
      { id: "domain", label: "What is Domain Name?", type: "topic", status: "recommended" },
      { id: "hosting", label: "What is hosting?", type: "topic", status: "recommended" },
      { id: "dns", label: "DNS and how it works?", type: "topic", status: "recommended" },
      { id: "browsers", label: "Browsers and how they work?", type: "topic", status: "recommended" },
    ]
  },
  {
    id: "html",
    label: "HTML",
    type: "main",
    children: [
      { id: "html-basics", label: "Learn the basics", type: "topic", status: "recommended" },
      { id: "semantic-html", label: "Writing Semantic HTML", type: "topic", status: "recommended" },
      { id: "forms-validation", label: "Forms and Validations", type: "topic", status: "recommended" },
      { id: "accessibility", label: "Accessibility", type: "topic", status: "recommended" },
      { id: "seo-basics", label: "SEO Basics", type: "topic", status: "optional" },
    ]
  },
  {
    id: "css",
    label: "CSS",
    type: "main",
    children: [
      { id: "css-basics", label: "Learn the basics", type: "topic", status: "recommended" },
      { id: "layouts", label: "Making Layouts", type: "topic", status: "recommended" },
      { id: "responsive", label: "Responsive Design", type: "topic", status: "recommended" },
    ]
  },
  {
    id: "javascript",
    label: "JavaScript",
    type: "main",
    children: [
      { id: "js-basics", label: "Learn the Basics", type: "topic", status: "recommended" },
      { id: "dom", label: "Learn DOM Manipulation", type: "topic", status: "recommended" },
      { id: "fetch", label: "Fetch API / Ajax (XHR)", type: "topic", status: "recommended" },
    ]
  },
  {
    id: "vcs",
    label: "Version Control Systems",
    type: "main",
    children: [
      { id: "git", label: "Git", type: "sub", status: "recommended" },
      { id: "github", label: "GitHub", type: "topic", status: "recommended" },
      { id: "gitlab", label: "GitLab", type: "topic", status: "alternative" },
      { id: "bitbucket", label: "Bitbucket", type: "topic", status: "alternative" },
    ]
  },
  {
    id: "package-managers",
    label: "Package Managers",
    type: "main",
    children: [
      { id: "npm", label: "npm", type: "topic", status: "recommended" },
      { id: "pnpm", label: "pnpm", type: "topic", status: "alternative" },
      { id: "yarn", label: "yarn", type: "topic", status: "alternative" },
    ]
  },
  {
    id: "framework",
    label: "Pick a Framework",
    type: "main",
    children: [
      { id: "react", label: "React", type: "topic", status: "recommended" },
      { id: "vue", label: "Vue.js", type: "topic", status: "alternative" },
      { id: "angular", label: "Angular", type: "topic", status: "alternative" },
      { id: "svelte", label: "Svelte", type: "topic", status: "alternative" },
      { id: "solid", label: "Solid JS", type: "topic", status: "alternative" },
    ]
  }
];

export function FrontendRoadmap() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["internet", "html", "css"]));

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
        return "bg-green-500/10 border-green-500/40 text-green-500";
      case "alternative":
        return "bg-amber-500/10 border-amber-500/40 text-amber-500";
      case "optional":
        return "bg-gray-500/10 border-gray-500/40 text-gray-500";
      default:
        return "bg-blue-500/10 border-blue-500/40 text-blue-500";
    }
  };

  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Frontend Development Roadmap</CardTitle>
          <CardDescription>
            A comprehensive guide to becoming a frontend developer in 2023
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Personal Recommendation</span>
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
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md min-w-[120px] text-center">
                {node.label}
              </div>
              {node.children && node.children.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleExpand(node.id)}
                >
                  {expandedNodes.has(node.id) ? "Collapse" : "Expand"}
                </Button>
              )}
            </div>
            
            {/* Line extending down */}
            {node.children && node.children.length > 0 && expandedNodes.has(node.id) && (
              <div className="absolute top-12 left-14 bottom-0 w-1 bg-blue-500/30 -ml-[2px]"></div>
            )}
            
            {node.children && node.children.length > 0 && expandedNodes.has(node.id) && (
              <div className="ml-16 space-y-4 relative">
                {node.children.map((child, childIndex) => (
                  <div key={child.id} className="relative">
                    {/* Horizontal connection line */}
                    <div className="absolute top-1/2 -left-8 w-8 h-1 bg-blue-500/30 -ml-1 transform -translate-y-1/2"></div>
                    
                    {child.type === "sub" ? (
                      <>
                        <div className={cn(
                          "px-4 py-2 rounded-md border text-center flex items-center justify-center gap-2",
                          getStatusClass(child.status)
                        )}>
                          {child.label}
                        </div>
                      </>
                    ) : (
                      <div className={cn(
                        "px-4 py-2 rounded-md border",
                        getStatusClass(child.status)
                      )}>
                        <Link 
                          to={child.link || `/learn/${node.id}/${child.id}`} 
                          className="flex items-center justify-between hover:opacity-80 transition-opacity"
                        >
                          <span>{child.label}</span>
                          <span className="text-xs underline">Learn</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
