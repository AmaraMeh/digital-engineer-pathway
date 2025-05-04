
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, Code, BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const HtmlBasicsCourse = () => {
  const [activeTab, setActiveTab] = useState("lesson-1");
  const [progress, setProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  const lessons = [
    { id: "lesson-1", title: "Introduction to HTML" },
    { id: "lesson-2", title: "HTML Document Structure" },
    { id: "lesson-3", title: "HTML Elements" },
    { id: "quiz", title: "Quiz" }
  ];
  
  const quizQuestions: QuizQuestion[] = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Text Making Links"
      ],
      correctAnswer: 0
    },
    {
      question: "Which element is used to define the document's body?",
      options: [
        "<head>",
        "<document>",
        "<body>",
        "<html>"
      ],
      correctAnswer: 2
    },
    {
      question: "Which tag creates a hyperlink?",
      options: [
        "<link>",
        "<a>",
        "<href>",
        "<hyperlink>"
      ],
      correctAnswer: 1
    },
  ];
  
  const handleNextLesson = (currentId: string) => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      setActiveTab(nextLesson.id);
      setProgress(Math.round(((currentIndex + 1) / (lessons.length - 1)) * 100));
    }
  };
  
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };
  
  const handleSubmitQuiz = () => {
    const totalQuestions = quizQuestions.length;
    let correctAnswers = 0;
    
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    setShowResults(true);
    setProgress(100);
    
    toast({
      title: `Quiz completed! Score: ${score}%`,
      description: `You got ${correctAnswers} out of ${totalQuestions} questions correct.`,
    });
  };
  
  const isAnswerCorrect = (questionIndex: number, answerIndex: number) => {
    return showResults && selectedAnswers[questionIndex] === answerIndex && 
           quizQuestions[questionIndex].correctAnswer === answerIndex;
  };
  
  const isAnswerWrong = (questionIndex: number, answerIndex: number) => {
    return showResults && selectedAnswers[questionIndex] === answerIndex && 
           quizQuestions[questionIndex].correctAnswer !== answerIndex;
  };
  
  const getHighlightClass = (questionIndex: number, answerIndex: number) => {
    if (isAnswerCorrect(questionIndex, answerIndex)) {
      return "bg-green-100 border-green-500 text-green-700";
    } else if (isAnswerWrong(questionIndex, answerIndex)) {
      return "bg-red-100 border-red-500 text-red-700";
    } else if (showResults && quizQuestions[questionIndex].correctAnswer === answerIndex) {
      return "bg-green-100 border-green-500 text-green-700 opacity-50";
    }
    return selectedAnswers[questionIndex] === answerIndex ? "bg-blue-100 border-blue-500" : "";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Card className="sticky top-24 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>HTML Basics</CardTitle>
              <CardDescription>Learn the fundamentals of HTML</CardDescription>
              <div className="mt-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Beginner</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      activeTab === lesson.id ? "border-primary bg-primary/5" : "hover:bg-accent"
                    }`}
                    onClick={() => setActiveTab(lesson.id)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      progress >= (index / (lessons.length - 1)) * 100 ? "bg-primary text-white" : "bg-muted"
                    }`}>
                      {progress >= (index / (lessons.length - 1)) * 100 ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span>{lesson.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-2/3">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  {lessons.map(lesson => (
                    <TabsTrigger key={lesson.id} value={lesson.id} className="text-sm">
                      {lesson.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="lesson-1" className="animate-fade-in">
                  <CardTitle>Introduction to HTML</CardTitle>
                  <CardDescription>Understanding the basics of HTML</CardDescription>
                  
                  <div className="mt-6 space-y-4">
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-bold text-lg mb-2">What is HTML?</h3>
                      <p className="mb-4">HTML stands for <span className="font-bold">H</span>yper<span className="font-bold">T</span>ext <span className="font-bold">M</span>arkup <span className="font-bold">L</span>anguage and is the standard markup language for creating web pages.</p>
                      
                      <div className="bg-muted p-3 rounded-md my-4 font-mono text-sm overflow-x-auto">
                        <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
  </body>
</html>`}</code>
                      </div>
                      
                      <p>HTML uses elements (tags) to structure content on a webpage.</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-bold text-lg mb-2">Key Concepts</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>HTML documents have a .html extension</li>
                        <li>HTML tags usually come in pairs: opening tag and closing tag</li>
                        <li>The closing tag has a forward slash before the tag name</li>
                        <li>HTML elements can be nested (contain other elements)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="lesson-2" className="animate-fade-in">
                  <CardTitle>HTML Document Structure</CardTitle>
                  <CardDescription>Learn about the basic structure of an HTML document</CardDescription>
                  
                  <div className="mt-6 space-y-4">
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-bold text-lg mb-2">Basic Document Structure</h3>
                      <p className="mb-4">Every HTML document follows a standard structure:</p>
                      
                      <div className="bg-muted p-3 rounded-md my-4 font-mono text-sm overflow-x-auto">
                        <code>{`<!DOCTYPE html>
<html>
  <head>
    <!-- Meta information, title, CSS links, etc. -->
    <title>Page Title</title>
  </head>
  <body>
    <!-- Visible content of the page -->
  </body>
</html>`}</code>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-bold text-lg mb-2">Important Elements</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><code className="bg-muted px-1 rounded">&lt;!DOCTYPE html&gt;</code> - Declares the document type</li>
                        <li><code className="bg-muted px-1 rounded">&lt;html&gt;</code> - The root element</li>
                        <li><code className="bg-muted px-1 rounded">&lt;head&gt;</code> - Contains meta information</li>
                        <li><code className="bg-muted px-1 rounded">&lt;title&gt;</code> - Defines the page title</li>
                        <li><code className="bg-muted px-1 rounded">&lt;body&gt;</code> - Contains the visible content</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="lesson-3" className="animate-fade-in">
                  <CardTitle>HTML Elements</CardTitle>
                  <CardDescription>Explore common HTML elements and their uses</CardDescription>
                  
                  <div className="mt-6 space-y-4">
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-bold text-lg mb-2">Text Elements</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><code className="bg-muted px-1 rounded">&lt;h1&gt; to &lt;h6&gt;</code> - Heading elements</li>
                        <li><code className="bg-muted px-1 rounded">&lt;p&gt;</code> - Paragraph</li>
                        <li><code className="bg-muted px-1 rounded">&lt;strong&gt;</code> - Bold text</li>
                        <li><code className="bg-muted px-1 rounded">&lt;em&gt;</code> - Italic text</li>
                      </ul>
                      
                      <div className="bg-muted p-3 rounded-md my-4 font-mono text-sm overflow-x-auto">
                        <code>{`<h1>This is a Heading 1</h1>
<h2>This is a Heading 2</h2>
<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>`}</code>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-bold text-lg mb-2">Links and Images</h3>
                      
                      <div className="bg-muted p-3 rounded-md my-4 font-mono text-sm overflow-x-auto">
                        <code>{`<!-- Link -->
<a href="https://example.com">Visit Example.com</a>

<!-- Image -->
<img src="image.jpg" alt="Description of the image">`}</code>
                      </div>
                      
                      <p>The <code className="bg-muted px-1 rounded">href</code> attribute specifies the URL, while the <code className="bg-muted px-1 rounded">src</code> attribute points to the image location. The <code className="bg-muted px-1 rounded">alt</code> attribute provides alternative text for accessibility.</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-bold text-lg mb-2">Lists</h3>
                      
                      <div className="bg-muted p-3 rounded-md my-4 font-mono text-sm overflow-x-auto">
                        <code>{`<!-- Ordered List -->
<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>

<!-- Unordered List -->
<ul>
  <li>Item</li>
  <li>Another item</li>
</ul>`}</code>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="quiz" className="animate-fade-in">
                  <CardTitle>Test Your Knowledge</CardTitle>
                  <CardDescription>Answer these questions about HTML basics</CardDescription>
                  
                  <div className="mt-6 space-y-6">
                    {quizQuestions.map((quizQuestion, qIndex) => (
                      <div key={qIndex} className="p-4 border rounded-lg bg-card">
                        <h3 className="font-bold text-lg mb-3">Q{qIndex + 1}: {quizQuestion.question}</h3>
                        
                        <div className="space-y-2">
                          {quizQuestion.options.map((option, oIndex) => (
                            <div 
                              key={oIndex}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                getHighlightClass(qIndex, oIndex)
                              }`}
                              onClick={() => !showResults && handleAnswerSelect(qIndex, oIndex)}
                            >
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                  selectedAnswers[qIndex] === oIndex ? "bg-primary border-primary" : ""
                                }`}>
                                  {selectedAnswers[qIndex] === oIndex && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                                {showResults && isAnswerCorrect(qIndex, oIndex) && (
                                  <Check className="ml-auto h-5 w-5 text-green-500" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardFooter className="flex justify-between border-t p-4">
              {activeTab !== "lesson-1" && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const currentIndex = lessons.findIndex(lesson => lesson.id === activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(lessons[currentIndex - 1].id);
                    }
                  }}
                >
                  Previous
                </Button>
              )}
              <div></div>
              {activeTab === "quiz" ? (
                <Button 
                  onClick={handleSubmitQuiz} 
                  disabled={Object.keys(selectedAnswers).length < quizQuestions.length || showResults}
                  className="group"
                >
                  {showResults ? "Completed!" : "Submit Answers"}
                  {!showResults && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              ) : (
                <Button onClick={() => handleNextLesson(activeTab)} className="group">
                  Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
