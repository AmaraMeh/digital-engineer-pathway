
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, Code, BookOpen, ExternalLink, ArrowRight, Award, Flag, Book, Terminal, Play, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InteractiveCodePlayground } from "./InteractiveCodePlayground";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const [codeExercises, setCodeExercises] = useState<Record<string, { completed: boolean, code: string }>>({
    'exercise-1': { completed: false, code: '<h1>My First Heading</h1>\n<p>My first paragraph.</p>' },
    'exercise-2': { completed: false, code: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>' },
  });
  const [certificates, setCertificates] = useState<string[]>([]);
  const [confetti, setConfetti] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load saved progress and certificates from local storage or database
    const savedProgress = localStorage.getItem(`course-progress-html-basics-${currentUser?.uid}`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    const savedCertificates = localStorage.getItem(`certificates-${currentUser?.uid}`);
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    }
    
    // Update the document title
    document.title = "HTML Basics Course | Learn to Code";
    
    return () => {
      document.title = "Learn to Code";
    };
  }, [currentUser?.uid]);
  
  const lessons = [
    { id: "lesson-1", title: "Introduction to HTML" },
    { id: "lesson-2", title: "HTML Document Structure" },
    { id: "lesson-3", title: "HTML Elements" },
    { id: "playground", title: "Practice Playground" },
    { id: "exercises", title: "Coding Exercises" },
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
    {
      question: "Which HTML element is used to define the title of a document?",
      options: [
        "<meta>",
        "<head>",
        "<title>",
        "<header>"
      ],
      correctAnswer: 2
    },
    {
      question: "How do you create a numbered list in HTML?",
      options: [
        "<ul>",
        "<list>",
        "<nl>",
        "<ol>"
      ],
      correctAnswer: 3
    }
  ];
  
  const saveProgress = (newProgress: number) => {
    setProgress(newProgress);
    
    // Save to local storage
    localStorage.setItem(`course-progress-html-basics-${currentUser?.uid}`, JSON.stringify(newProgress));
    
    // In a real app, you would also save to a database
    console.log(`Saving progress for user ${currentUser?.uid}: ${newProgress}%`);
  };
  
  const handleNextLesson = (currentId: string) => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      setActiveTab(nextLesson.id);
      const newProgress = Math.round(((currentIndex + 1) / (lessons.length - 1)) * 100);
      saveProgress(newProgress);
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
    saveProgress(100);
    
    if (score >= 80 && !certificates.includes('html-basics')) {
      // Award certificate
      const updatedCertificates = [...certificates, 'html-basics'];
      setCertificates(updatedCertificates);
      localStorage.setItem(`certificates-${currentUser?.uid}`, JSON.stringify(updatedCertificates));
      
      // Show celebration
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000);
      
      toast({
        title: "🎉 Congratulations!",
        description: `You've earned the HTML Basics Certificate with a score of ${score}%!`,
      });
    } else {
      toast({
        title: `Quiz completed! Score: ${score}%`,
        description: `You got ${correctAnswers} out of ${totalQuestions} questions correct.`,
      });
    }
  };
  
  const handleCompleteExercise = (exerciseId: string) => {
    setCodeExercises(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        completed: true
      }
    }));
    
    const completedCount = Object.values(codeExercises).filter(ex => ex.completed).length + 1;
    const totalExercises = Object.keys(codeExercises).length;
    const exerciseProgress = Math.round((completedCount / totalExercises) * 25) + 50; // Exercises worth 25% of course
    
    saveProgress(exerciseProgress);
    
    toast({
      title: "Exercise Completed!",
      description: "Great job! You've successfully completed this exercise.",
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
      return "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    } else if (isAnswerWrong(questionIndex, answerIndex)) {
      return "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    } else if (showResults && quizQuestions[questionIndex].correctAnswer === answerIndex) {
      return "bg-green-100 border-green-500 text-green-700 opacity-50 dark:bg-green-900/30 dark:text-green-400 dark:opacity-50";
    }
    return selectedAnswers[questionIndex] === answerIndex ? "bg-blue-100 border-blue-500 dark:bg-blue-900/20" : "";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-confetti"></div>
        </div>
      )}
      
      <motion.div 
        className="flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:w-1/3">
          <Card className="sticky top-24 hover:shadow-lg transition-all border-2 border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="font-bold flex items-center">
                <Book className="mr-2 h-5 w-5 text-primary" />
                HTML Basics
              </CardTitle>
              <CardDescription>Learn the fundamentals of HTML</CardDescription>
              <div className="mt-2 flex gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 dark:hover:bg-primary/30">Beginner</Badge>
                <Badge variant="outline" className="border-amber-500/30 text-amber-500">Top Course</Badge>
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
                  <motion.div 
                    key={lesson.id} 
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      activeTab === lesson.id ? "border-primary bg-primary/5 dark:bg-primary/10" : "hover:bg-accent"
                    }`}
                    onClick={() => setActiveTab(lesson.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      progress >= (index / (lessons.length - 1)) * 100 ? "bg-primary text-white" : "bg-muted"
                    }`}>
                      {progress >= (index / (lessons.length - 1)) * 100 ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span>{lesson.title}</span>
                  </motion.div>
                ))}
              </div>
              
              {certificates.includes('html-basics') && (
                <motion.div 
                  className="mt-6 p-4 border border-amber-500/30 rounded-lg bg-amber-50/50 dark:bg-amber-900/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-2">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-700 dark:text-amber-400">Certificate Earned</h4>
                      <p className="text-sm text-amber-600 dark:text-amber-300">HTML Basics - Complete</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-2/3">
          <Card className="hover:shadow-lg transition-all border-2 border-primary/20">
            <CardHeader className="border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-4 bg-muted/50">
                  {lessons.map(lesson => (
                    <TabsTrigger key={lesson.id} value={lesson.id} className="text-xs md:text-sm">
                      {lesson.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="lesson-1" className="animate-fade-in m-0 p-0">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Introduction to HTML
                  </CardTitle>
                  <CardDescription>Understanding the basics of HTML</CardDescription>
                  
                  <div className="mt-6 space-y-6">
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
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
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <h3 className="font-bold text-lg mb-2">Key Concepts</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>HTML documents have a .html extension</li>
                        <li>HTML tags usually come in pairs: opening tag and closing tag</li>
                        <li>The closing tag has a forward slash before the tag name</li>
                        <li>HTML elements can be nested (contain other elements)</li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <h3 className="font-bold text-lg mb-2">Interactive Example</h3>
                      <p className="mb-4">See how changing HTML affects the page in real-time:</p>
                      
                      <InteractiveCodePlayground
                        initialHtml="<h1>Welcome to HTML!</h1>\n<p>This is a simple example.</p>\n<button>Click me</button>"
                        initialCss="h1 { color: #3b82f6; }\nbutton { background-color: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }"
                        initialJs="const button = document.querySelector('button');\nbutton.addEventListener('click', () => {\n  alert('Button clicked!');\n});"
                        height="250px"
                      />
                    </motion.div>
                  </div>
                </TabsContent>
                
                <TabsContent value="lesson-2" className="animate-fade-in m-0 p-0">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    HTML Document Structure
                  </CardTitle>
                  <CardDescription>Learn about the basic structure of an HTML document</CardDescription>
                  
                  <div className="mt-6 space-y-6">
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
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
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <h3 className="font-bold text-lg mb-2">Important Elements</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><code className="bg-muted px-1 rounded">&lt;!DOCTYPE html&gt;</code> - Declares the document type</li>
                        <li><code className="bg-muted px-1 rounded">&lt;html&gt;</code> - The root element</li>
                        <li><code className="bg-muted px-1 rounded">&lt;head&gt;</code> - Contains meta information</li>
                        <li><code className="bg-muted px-1 rounded">&lt;title&gt;</code> - Defines the page title</li>
                        <li><code className="bg-muted px-1 rounded">&lt;body&gt;</code> - Contains the visible content</li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <h3 className="font-bold text-lg mb-2">Visual Structure</h3>
                      <div className="my-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                        <div className="border-2 border-primary p-3 rounded-lg">
                          <div className="font-semibold text-center mb-2">&lt;!DOCTYPE html&gt;</div>
                          <div className="border-2 border-blue-500 p-3 rounded-lg">
                            <div className="font-semibold text-center mb-2">&lt;html&gt;</div>
                            
                            <div className="border-2 border-amber-500 p-3 rounded-lg mb-4">
                              <div className="font-semibold text-center mb-2">&lt;head&gt;</div>
                              <div className="border border-dashed border-amber-500 p-2 rounded-lg text-center">
                                &lt;meta&gt;, &lt;title&gt;, &lt;link&gt;, etc.
                              </div>
                            </div>
                            
                            <div className="border-2 border-green-500 p-3 rounded-lg">
                              <div className="font-semibold text-center mb-2">&lt;body&gt;</div>
                              <div className="border border-dashed border-green-500 p-2 rounded-lg text-center">
                                &lt;h1&gt;, &lt;p&gt;, &lt;div&gt;, etc.
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">Visual representation of HTML document structure</p>
                    </motion.div>
                  </div>
                </TabsContent>
                
                <TabsContent value="lesson-3" className="animate-fade-in m-0 p-0">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    HTML Elements
                  </CardTitle>
                  <CardDescription>Explore common HTML elements and their uses</CardDescription>
                  
                  <div className="mt-6 space-y-6">
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
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
                      
                      <div className="mt-4 p-4 border rounded bg-white dark:bg-gray-900">
                        <h1 className="text-2xl font-bold">This is a Heading 1</h1>
                        <h2 className="text-xl font-bold">This is a Heading 2</h2>
                        <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <h3 className="font-bold text-lg mb-2">Links and Images</h3>
                      
                      <div className="bg-muted p-3 rounded-md my-4 font-mono text-sm overflow-x-auto">
                        <code>{`<!-- Link -->
<a href="https://example.com">Visit Example.com</a>

<!-- Image -->
<img src="https://via.placeholder.com/150" alt="Description of the image">`}</code>
                      </div>
                      
                      <p>The <code className="bg-muted px-1 rounded">href</code> attribute specifies the URL, while the <code className="bg-muted px-1 rounded">src</code> attribute points to the image location. The <code className="bg-muted px-1 rounded">alt</code> attribute provides alternative text for accessibility.</p>
                      
                      <div className="mt-4 p-4 border rounded bg-white dark:bg-gray-900">
                        <a href="#" className="text-blue-500 hover:underline">Visit Example.com</a>
                        <br />
                        <img src="https://via.placeholder.com/150" alt="Placeholder" className="mt-2" />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border rounded-lg bg-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
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
                      
                      <div className="mt-4 p-4 border rounded bg-white dark:bg-gray-900">
                        <strong>Ordered List:</strong>
                        <ol className="list-decimal pl-5 mt-1">
                          <li>First item</li>
                          <li>Second item</li>
                        </ol>
                        
                        <strong className="mt-4 block">Unordered List:</strong>
                        <ul className="list-disc pl-5 mt-1">
                          <li>Item</li>
                          <li>Another item</li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
                
                <TabsContent value="playground" className="animate-fade-in m-0 p-0">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Terminal className="mr-2 h-5 w-5 text-primary" />
                    Interactive Code Playground
                  </CardTitle>
                  <CardDescription>Practice HTML, CSS, and JavaScript together</CardDescription>
                  
                  <div className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <InteractiveCodePlayground 
                        initialHtml="<!DOCTYPE html>\n<html>\n<head>\n  <title>My Playground</title>\n</head>\n<body>\n  <h1>Welcome to HTML Playground</h1>\n  <p>Start editing this code to practice your HTML skills!</p>\n  \n  <!-- Try adding elements below -->\n  \n</body>\n</html>"
                        initialCss="body {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\nh1 {\n  color: #3b82f6;\n  border-bottom: 2px solid #e2e8f0;\n  padding-bottom: 10px;\n}\n\n/* Add your CSS here */"
                        initialJs="// You can add JavaScript here\nconsole.log('Playground loaded!');\n\n// Example: Add an event listener\n// document.querySelector('h1').addEventListener('click', () => {\n//   alert('You clicked the heading!');\n// });"
                      />
                    </motion.div>
                    
                    <div className="mt-8 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <h3 className="font-bold mb-2 flex items-center">
                        <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                        Challenge Yourself:
                      </h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Create a simple webpage with a heading, paragraph, and an image</li>
                        <li>Add a navigation menu with 3 links</li>
                        <li>Create a simple contact form with name, email, and message fields</li>
                        <li>Use CSS to style your page, adding colors and margins</li>
                        <li>Add a simple JavaScript interaction (like an alert when clicking a button)</li>
                      </ol>
                      <p className="mt-3 text-sm text-muted-foreground">
                        These exercises will help you practice what you've learned. Feel free to experiment!
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="exercises" className="animate-fade-in m-0 p-0">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Code className="mr-2 h-5 w-5 text-primary" />
                    Coding Exercises
                  </CardTitle>
                  <CardDescription>Complete these exercises to practice HTML skills</CardDescription>
                  
                  <div className="mt-6 space-y-8">
                    <motion.div
                      className="border rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-muted p-4 border-b flex items-center justify-between">
                        <h3 className="font-semibold">Exercise 1: Basic HTML Structure</h3>
                        {codeExercises['exercise-1'].completed && (
                          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-500">
                            <Check className="h-3 w-3 mr-1" /> Completed
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <p className="mb-4">Create a basic HTML document with a heading and a paragraph.</p>
                        
                        <InteractiveCodePlayground
                          initialHtml={codeExercises['exercise-1'].code}
                          initialCss=""
                          initialJs=""
                          height="200px"
                        />
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            onClick={() => handleCompleteExercise('exercise-1')} 
                            disabled={codeExercises['exercise-1'].completed}
                            className="gap-1"
                          >
                            <Flag className="h-4 w-4 mr-1" />
                            {codeExercises['exercise-1'].completed ? "Completed" : "Mark as Complete"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="border rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="bg-muted p-4 border-b flex items-center justify-between">
                        <h3 className="font-semibold">Exercise 2: Working with Lists</h3>
                        {codeExercises['exercise-2'].completed && (
                          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-500">
                            <Check className="h-3 w-3 mr-1" /> Completed
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <p className="mb-4">Create an unordered list with at least 3 items.</p>
                        
                        <InteractiveCodePlayground
                          initialHtml={codeExercises['exercise-2'].code}
                          initialCss=""
                          initialJs=""
                          height="200px"
                        />
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            onClick={() => handleCompleteExercise('exercise-2')} 
                            disabled={codeExercises['exercise-2'].completed}
                            className="gap-1"
                          >
                            <Flag className="h-4 w-4 mr-1" />
                            {codeExercises['exercise-2'].completed ? "Completed" : "Mark as Complete"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
                
                <TabsContent value="quiz" className="animate-fade-in m-0 p-0">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Test Your Knowledge
                  </CardTitle>
                  <CardDescription>Answer these questions about HTML basics</CardDescription>
                  
                  <div className="mt-6 space-y-6">
                    {quizQuestions.map((quizQuestion, qIndex) => (
                      <motion.div 
                        key={qIndex} 
                        className="p-4 border rounded-lg bg-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: qIndex * 0.1 }}
                      >
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
                        
                        {showResults && (
                          <div className="mt-3 text-sm">
                            <div className={
                              selectedAnswers[qIndex] === quizQuestion.correctAnswer 
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }>
                              {selectedAnswers[qIndex] === quizQuestion.correctAnswer 
                                ? "✓ Correct!" 
                                : `✗ Incorrect. The correct answer is: ${quizQuestion.options[quizQuestion.correctAnswer]}`
                              }
                            </div>
                          </div>
                        )}
                      </motion.div>
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
                  className="gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-4 w-4 mr-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  Previous
                </Button>
              )}
              <div></div>
              {activeTab === "quiz" ? (
                <Button 
                  onClick={handleSubmitQuiz} 
                  disabled={Object.keys(selectedAnswers).length < quizQuestions.length || showResults}
                  className="group gap-1 bg-gradient-to-r from-primary to-purple-600"
                >
                  {showResults ? "Completed!" : "Submit Answers"}
                  {!showResults && <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              ) : (
                <Button onClick={() => handleNextLesson(activeTab)} className="group gap-1 bg-gradient-to-r from-primary to-purple-600">
                  Next Lesson
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};
