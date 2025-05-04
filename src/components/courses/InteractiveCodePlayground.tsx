
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RefreshCw, Code, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlaygroundProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  height?: string;
  readOnly?: boolean;
}

export const InteractiveCodePlayground = ({
  initialHtml = '<h1>Hello World</h1>\n<p>Start coding!</p>',
  initialCss = 'h1 {\n  color: blue;\n}\n\np {\n  font-style: italic;\n}',
  initialJs = 'console.log("Hello from JavaScript!");',
  height = "400px",
  readOnly = false
}: PlaygroundProps) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState<string>("html");
  const { toast } = useToast();
  
  useEffect(() => {
    updateOutput();
  }, []);
  
  const updateOutput = () => {
    const combinedOutput = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setOutput(combinedOutput);
  };
  
  const handleRun = () => {
    updateOutput();
    toast({
      title: "Code executed!",
      description: "Your code has been updated in the preview."
    });
  };
  
  const handleReset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
    
    setTimeout(() => {
      updateOutput();
      toast({
        title: "Code reset",
        description: "Your playground has been reset to the initial state."
      });
    }, 0);
  };
  
  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Code downloaded",
      description: "Your HTML file has been downloaded."
    });
  };
  
  return (
    <div className="w-full">
      <Card className="w-full border-2 border-primary/20 shadow-xl">
        <CardHeader className="pb-2 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Code className="mr-2 h-4 w-4" />
              Interactive Code Playground
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRun} className="gap-1">
                <Play className="h-3 w-3" /> Run
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
                <RefreshCw className="h-3 w-3" /> Reset
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1">
                <Download className="h-3 w-3" /> Download
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                </TabsList>
                
                <div className="border rounded-md mt-2" style={{ height }}>
                  <TabsContent value="html" className="h-full m-0 p-0">
                    <textarea
                      className="w-full h-full p-4 resize-none font-mono bg-gray-50 dark:bg-gray-900 focus:outline-none"
                      value={html}
                      onChange={(e) => setHtml(e.target.value)}
                      placeholder="Write your HTML here..."
                      readOnly={readOnly}
                    />
                  </TabsContent>
                  
                  <TabsContent value="css" className="h-full m-0 p-0">
                    <textarea
                      className="w-full h-full p-4 resize-none font-mono bg-gray-50 dark:bg-gray-900 focus:outline-none"
                      value={css}
                      onChange={(e) => setCss(e.target.value)}
                      placeholder="Write your CSS here..."
                      readOnly={readOnly}
                    />
                  </TabsContent>
                  
                  <TabsContent value="js" className="h-full m-0 p-0">
                    <textarea
                      className="w-full h-full p-4 resize-none font-mono bg-gray-50 dark:bg-gray-900 focus:outline-none"
                      value={js}
                      onChange={(e) => setJs(e.target.value)}
                      placeholder="Write your JavaScript here..."
                      readOnly={readOnly}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            
            <div>
              <div className="border rounded-md mb-2 p-2 bg-gray-100 dark:bg-gray-800">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Preview</span>
              </div>
              <div className="border rounded-md" style={{ height }}>
                <iframe
                  title="Code Preview"
                  className="w-full h-full bg-white dark:bg-gray-900"
                  srcDoc={output}
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
