import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor } from '@monaco-editor/react';

export interface PlaygroundProps {
  initialCode: string;
  expectedOutput: string;
  onComplete: () => void;
}

export const InteractiveCodePlayground = ({
  initialCode,
  expectedOutput,
  onComplete
}: PlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Reset state when initial code changes
    setCode(initialCode);
    setOutput('');
    setIsCorrect(false);
  }, [initialCode]);

  const handleRun = () => {
    // For HTML exercises, the output is the code itself
    setOutput(code);
    
    // Check if the code matches the expected output (ignoring whitespace)
    const normalizedCode = code.replace(/\s+/g, '').toLowerCase();
    const normalizedExpected = expectedOutput.replace(/\s+/g, '').toLowerCase();
    
    const correct = normalizedCode === normalizedExpected;
    setIsCorrect(correct);
    
    if (correct) {
      onComplete();
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <Tabs defaultValue="editor">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="space-y-4">
            <div className="h-[300px] border rounded-lg overflow-hidden">
              <Editor
                value={code}
                onChange={(value) => setCode(value || '')}
                language="html"
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button onClick={handleRun}>
                Run Code
              </Button>
              {isCorrect && (
                <span className="text-green-500">
                  ✓ Correct! Well done!
                </span>
              )}
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="h-[300px] border rounded-lg p-4 overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: output }} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
