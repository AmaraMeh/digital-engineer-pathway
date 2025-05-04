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
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageNavigation } from "@/components/layout/PageNavigation";
import {
  Layout,
  List,
  Type,
  Image as ImageIcon,
  Link as LinkIcon,
  FileText,
  CheckCircle,
  PenTool,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CodeExercise {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: string;
  hints: string[];
  solution: string;
  explanation: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  codeExamples: {
    title: string;
    code: string;
    explanation: string;
  }[];
  exercises: {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    expectedOutput: string;
    hints: string[];
    solution: string;
    explanation: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  resources: {
    title: string;
    url: string;
    type: 'article' | 'video' | 'documentation';
  }[];
}

interface Module {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  lessons: Lesson[];
  prerequisites?: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface PlaygroundProps {
  initialCode: string;
  expectedOutput: string;
  onComplete: () => void;
}

const defaultLesson = {
  codeExamples: [],
  exercises: [],
  quiz: [],
  resources: []
};

const COURSE_MODULES: Module[] = [
  {
    id: "introduction",
    title: "Introduction to HTML",
    icon: BookOpen,
    description: "Learn the fundamentals of HTML and how to create your first web page",
    estimatedTime: "2 hours",
    difficulty: "beginner",
    lessons: [
      {
        ...defaultLesson,
        id: "what-is-html",
        title: "What is HTML?",
        content: `
          HTML (HyperText Markup Language) is the standard markup language for creating web pages.
          It describes the structure of a web page using elements and tags.

          Key Points:
          • HTML is not a programming language; it's a markup language
          • HTML elements tell the browser how to display the content
          • HTML tags label pieces of content such as "heading", "paragraph", "table", etc.

          Example:
          \`\`\`html
          <!DOCTYPE html>
          <html>
            <head>
              <title>My First Page</title>
            </head>
            <body>
              <h1>Welcome!</h1>
              <p>This is my first HTML page.</p>
            </body>
          </html>
          \`\`\`
        `,
        videoUrl: "https://example.com/html-intro-video",
        codeExamples: [
          {
            title: "Basic HTML Structure",
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`,
            explanation: "This is the basic structure of every HTML document. The DOCTYPE declaration tells the browser this is an HTML5 document."
          }
        ],
        exercises: [
          {
            id: "exercise-1",
            title: "Create Your First HTML Page",
            description: "Create a basic HTML page with a heading and paragraph",
            initialCode: "<!-- Write your HTML code here -->",
            expectedOutput: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to My Page</h1>
    <p>This is my first HTML page.</p>
  </body>
</html>`,
            hints: [
              "Start with the DOCTYPE declaration",
              "Add the html, head, and body tags",
              "Include a title in the head section",
              "Add a heading and paragraph in the body"
            ],
            solution: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to My Page</h1>
    <p>This is my first HTML page.</p>
  </body>
</html>`,
            explanation: "This exercise teaches you the basic structure of an HTML document and how to create simple content."
          }
        ],
        quiz: [
          {
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "Hyperlinks and Text Markup Language",
              "Home Tool Markup Language",
              "Hyper Text Making Links"
            ],
            correctAnswer: 0,
            explanation: "HTML stands for Hyper Text Markup Language. It's the standard markup language for creating web pages."
          }
        ],
        resources: [
          {
            title: "MDN HTML Basics",
            url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
            type: "documentation"
          },
          {
            title: "HTML5 Tutorial",
            url: "https://www.w3schools.com/html/",
            type: "article"
          }
        ]
      }
    ]
  },
  {
    id: "text-formatting",
    title: "Text & Formatting",
    icon: Type,
    description: "Learn how to format text and create structured content",
    estimatedTime: "1.5 hours",
    difficulty: "beginner",
    lessons: [
      {
        ...defaultLesson,
        id: "headings-paragraphs",
        title: "Headings & Paragraphs",
        content: `
          Headings:
          HTML has six levels of headings, from h1 to h6.
          
          \`\`\`html
          <h1>Main Heading</h1>
          <h2>Subheading</h2>
          <h3>Section Heading</h3>
          \`\`\`

          Paragraphs:
          The <p> tag defines a paragraph.

          \`\`\`html
          <p>This is a paragraph of text.</p>
          <p>This is another paragraph.</p>
          \`\`\`

          Text Formatting:
          \`\`\`html
          <strong>Bold text</strong>
          <em>Italic text</em>
          <mark>Highlighted text</mark>
          <sub>Subscript</sub>
          <sup>Superscript</sup>
          \`\`\`
        `,
        exercises: [
          {
            id: "exercise-2",
            title: "Create a Blog Post",
            description: "Create a blog post with headings, paragraphs, and formatted text",
            initialCode: "<!-- Create your blog post here -->",
            expectedOutput: `<!DOCTYPE html>
<html>
  <head>
    <title>My Blog Post</title>
  </head>
  <body>
    <h1>My First Blog Post</h1>
    <p>Welcome to my <strong>first</strong> blog post!</p>
    <h2>About Me</h2>
    <p>I'm learning <em>HTML</em> and having a great time.</p>
    <h3>My Goals</h3>
    <p>I want to become a <mark>web developer</mark>.</p>
  </body>
</html>`,
            hints: [
              "Use h1 for the main title",
              "Use h2 and h3 for subheadings",
              "Use p for paragraphs",
              "Use strong, em, and mark for formatting"
            ],
            solution: `<!DOCTYPE html>
<html>
  <head>
    <title>My Blog Post</title>
  </head>
  <body>
    <h1>My First Blog Post</h1>
    <p>Welcome to my <strong>first</strong> blog post!</p>
    <h2>About Me</h2>
    <p>I'm learning <em>HTML</em> and having a great time.</p>
    <h3>My Goals</h3>
    <p>I want to become a <mark>web developer</mark>.</p>
  </body>
</html>`,
            explanation: "This exercise teaches you how to structure content with headings and format text using HTML tags."
          }
        ],
        quiz: [
          {
            question: "Which tag is used for the most important heading?",
            options: ["h1", "h2", "h3", "h4"],
            correctAnswer: 0,
            explanation: "The h1 tag is used for the main heading of a page. It should be used only once per page and represents the most important heading."
          }
        ],
        resources: [
          {
            title: "HTML Text Formatting",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content",
            type: "documentation"
          }
        ]
      }
    ]
  },
  {
    id: "lists-tables",
    title: "Lists & Tables",
    icon: List,
    description: "Learn how to create structured content with lists and tables",
    estimatedTime: "2 hours",
    difficulty: "beginner",
    lessons: [
      {
        ...defaultLesson,
        id: "lists",
        title: "HTML Lists",
        content: `
          Unordered Lists:
          \`\`\`html
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
          \`\`\`

          Ordered Lists:
          \`\`\`html
          <ol>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ol>
          \`\`\`

          Definition Lists:
          \`\`\`html
          <dl>
            <dt>Term</dt>
            <dd>Definition</dd>
          </dl>
          \`\`\`

          Nested Lists:
          \`\`\`html
          <ul>
            <li>Item 1
              <ul>
                <li>Subitem 1.1</li>
                <li>Subitem 1.2</li>
              </ul>
            </li>
          </ul>
          \`\`\`
        `,
        codeExamples: [
          {
            title: "Basic List Example",
            code: `<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`,
            explanation: "A simple unordered list with three items"
          }
        ],
        exercises: [
          {
            id: "exercise-lists",
            title: "Create a Navigation Menu",
            description: "Create a navigation menu using an unordered list",
            initialCode: "<!-- Create your navigation menu here -->",
            expectedOutput: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`,
            hints: [
              "Use the nav element to wrap your navigation",
              "Create an unordered list with ul",
              "Each menu item should be a li element",
              "Use a elements for the links"
            ],
            solution: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`,
            explanation: "This exercise teaches you how to create a semantic navigation menu using lists."
          }
        ],
        quiz: [
          {
            question: "Which tag is used to create an unordered list?",
            options: ["<ol>", "<ul>", "<dl>", "<li>"],
            correctAnswer: 1,
            explanation: "The <ul> tag is used to create an unordered list, which typically displays with bullet points."
          }
        ],
        resources: [
          {
            title: "MDN Lists Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul",
            type: "documentation"
          }
        ]
      },
      {
        ...defaultLesson,
        id: "tables",
        title: "HTML Tables",
        content: `
          // ... existing content ...
        `,
        codeExamples: [],
        exercises: [],
        quiz: [],
        resources: []
      }
    ]
  },
  {
    id: "links-images",
    title: "Links & Images",
    icon: LinkIcon,
    description: "Learn how to add links and images to your web pages",
    estimatedTime: "2 hours",
    difficulty: "beginner",
    lessons: [
      {
        ...defaultLesson,
        id: "links",
        title: "HTML Links",
        content: `
          Basic Links:
          \`\`\`html
          <a href="https://example.com">Visit Example</a>
          \`\`\`

          Link Attributes:
          • href - URL or path
          • target - Where to open the link
          • rel - Relationship to target
          
          Examples:
          \`\`\`html
          <!-- External link -->
          <a href="https://example.com" target="_blank">Open in new tab</a>

          <!-- Internal link -->
          <a href="/about">About page</a>

          <!-- Email link -->
          <a href="mailto:example@email.com">Send email</a>

          <!-- Phone link -->
          <a href="tel:+1234567890">Call us</a>

          <!-- File download -->
          <a href="/files/document.pdf" download>Download PDF</a>
          \`\`\`
        `,
        codeExamples: [
          {
            title: "Basic Link Example",
            code: `<a href="https://example.com">Visit Example</a>`,
            explanation: "A simple link to an external website"
          }
        ],
        exercises: [
          {
            id: "exercise-links",
            title: "Create a Navigation Menu",
            description: "Create a navigation menu with internal and external links",
            initialCode: "<!-- Create your navigation menu here -->",
            expectedOutput: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="https://example.com" target="_blank">External Link</a></li>
    <li><a href="mailto:contact@example.com">Contact</a></li>
  </ul>
</nav>`,
            hints: [
              "Use nav for navigation sections",
              "Use ul and li for menu structure",
              "Use target='_blank' for external links",
              "Use mailto: for email links"
            ],
            solution: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="https://example.com" target="_blank">External Link</a></li>
    <li><a href="mailto:contact@example.com">Contact</a></li>
  </ul>
</nav>`,
            explanation: "This exercise teaches you how to create different types of links in HTML."
          }
        ],
        quiz: [
          {
            question: "Which attribute is used to specify the URL in a link?",
            options: ["src", "href", "link", "url"],
            correctAnswer: 1,
            explanation: "The href attribute is used to specify the URL that the link points to."
          }
        ],
        resources: [
          {
            title: "MDN Links Guide",
            url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks",
            type: "documentation"
          }
        ]
      },
      {
        ...defaultLesson,
        id: "images",
        title: "HTML Images",
        content: `
          Basic Image:
          \`\`\`html
          <img src="image.jpg" alt="Description">
          \`\`\`

          Image Attributes:
          • src - Image source
          • alt - Alternative text
          • width - Width in pixels
          • height - Height in pixels
          
          Responsive Images:
          \`\`\`html
          <!-- Multiple sizes -->
          <img srcset="small.jpg 300w,
                      medium.jpg 600w,
                      large.jpg 900w"
               sizes="(max-width: 500px) 300px,
                      (max-width: 900px) 600px,
                      900px"
               src="large.jpg"
               alt="Responsive image">

          <!-- Picture element -->
          <picture>
            <source media="(min-width: 800px)" srcset="large.jpg">
            <source media="(min-width: 400px)" srcset="medium.jpg">
            <img src="small.jpg" alt="Responsive image">
          </picture>
          \`\`\`
        `,
        codeExamples: [],
        exercises: [],
        quiz: [],
        resources: []
      }
    ]
  },
  {
    id: "forms",
    title: "Forms & Input",
    icon: PenTool,
    description: "Learn how to create interactive forms",
    estimatedTime: "3 hours",
    difficulty: "intermediate",
    lessons: [
      {
        ...defaultLesson,
        id: "forms-basics",
        title: "HTML Forms Basics",
        content: `
          Basic Form Structure:
          \`\`\`html
          <form action="/submit" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            
            <button type="submit">Submit</button>
          </form>
          \`\`\`

          Common Input Types:
          \`\`\`html
          <!-- Text input -->
          <input type="text">

          <!-- Password -->
          <input type="password">

          <!-- Email -->
          <input type="email">

          <!-- Number -->
          <input type="number">

          <!-- Checkbox -->
          <input type="checkbox">

          <!-- Radio buttons -->
          <input type="radio">

          <!-- File upload -->
          <input type="file">

          <!-- Date picker -->
          <input type="date">

          <!-- Color picker -->
          <input type="color">
          \`\`\`
        `,
        codeExamples: [
          {
            title: "Basic Form Example",
            code: `<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
  <button type="submit">Submit</button>
</form>`,
            explanation: "A simple form with a text input and submit button"
          }
        ],
        exercises: [
          {
            id: "exercise-form",
            title: "Create a Contact Form",
            description: "Create a contact form with name, email, and message fields",
            initialCode: "<!-- Create your contact form here -->",
            expectedOutput: `<form action="/submit" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
  </div>
  <button type="submit">Send Message</button>
</form>`,
            hints: [
              "Use form element with action and method",
              "Add labels for accessibility",
              "Use appropriate input types",
              "Add required attribute for validation"
            ],
            solution: `<form action="/submit" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
  </div>
  <button type="submit">Send Message</button>
</form>`,
            explanation: "This exercise teaches you how to create a basic contact form with proper structure and validation."
          }
        ],
        quiz: [
          {
            question: "Which attribute makes a form field required?",
            options: ["mandatory", "required", "validate", "must"],
            correctAnswer: 1,
            explanation: "The required attribute is used to make a form field mandatory."
          }
        ],
        resources: [
          {
            title: "MDN Forms Guide",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Forms",
            type: "documentation"
          }
        ]
      },
      {
        ...defaultLesson,
        id: "forms-advanced",
        title: "Advanced Form Features",
        content: `
          Form Validation:
          \`\`\`html
          <input type="text" required>
          <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$">
          <input type="number" min="0" max="100">
          \`\`\`

          Select Dropdowns:
          \`\`\`html
          <select name="country">
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
          \`\`\`

          Textarea:
          \`\`\`html
          <textarea name="message" rows="4" cols="50">
            Enter your message here...
          </textarea>
          \`\`\`

          Fieldset & Legend:
          \`\`\`html
          <fieldset>
            <legend>Personal Information</legend>
            <label>Name: <input type="text"></label>
            <label>Email: <input type="email"></label>
          </fieldset>
          \`\`\`
        `
      }
    ]
  },
  {
    id: "semantic-html",
    title: "Semantic HTML",
    icon: Layout,
    description: "Learn how to use semantic HTML elements",
    estimatedTime: "2 hours",
    difficulty: "intermediate",
    lessons: [
      {
        ...defaultLesson,
        id: "semantic-elements",
        title: "Semantic Elements",
        content: `
          Semantic HTML elements clearly describe their meaning:

          Page Structure:
          \`\`\`html
          <header>
            <nav>
              <!-- Navigation content -->
            </nav>
          </header>

          <main>
            <article>
              <section>
                <!-- Article section -->
              </section>
            </article>
            
            <aside>
              <!-- Sidebar content -->
            </aside>
          </main>

          <footer>
            <!-- Footer content -->
          </footer>
          \`\`\`

          Content Elements:
          \`\`\`html
          <article>
            <header>
              <h1>Article Title</h1>
              <time datetime="2024-03-20">March 20, 2024</time>
            </header>
            
            <section>
              <h2>Section Title</h2>
              <p>Section content...</p>
            </section>
            
            <footer>
              <p>Author: John Doe</p>
            </footer>
          </article>
          \`\`\`
        `,
        codeExamples: [],
        exercises: [],
        quiz: [],
        resources: []
      },
      {
        ...defaultLesson,
        id: "semantic-best-practices",
        title: "Semantic Best Practices",
        content: `
          Why Use Semantic HTML?
          • Better accessibility
          • Improved SEO
          • Clearer code structure
          • Easier maintenance

          Common Semantic Elements:
          \`\`\`html
          <!-- Navigation -->
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>

          <!-- Main content -->
          <main>
            <article>
              <header>
                <h1>Article Title</h1>
              </header>
              
              <section>
                <h2>Section Title</h2>
                <p>Content...</p>
              </section>
              
              <aside>
                <h3>Related Content</h3>
                <!-- Related content -->
              </aside>
            </article>
          </main>

          <!-- Footer -->
          <footer>
            <address>
              Contact: <a href="mailto:example@email.com">Email us</a>
            </address>
          </footer>
          \`\`\`
        `,
        codeExamples: [],
        exercises: [],
        quiz: [],
        resources: []
      }
    ]
  },
  {
    id: "accessibility",
    title: "HTML Accessibility",
    icon: FileText,
    description: "Learn how to make your HTML accessible",
    estimatedTime: "2.5 hours",
    difficulty: "intermediate",
    lessons: [
      {
        ...defaultLesson,
        id: "accessibility-basics",
        title: "Accessibility Basics",
        content: `
          ARIA Roles & Attributes:
          \`\`\`html
          <!-- Navigation -->
          <nav role="navigation" aria-label="Main navigation">
            <!-- Navigation content -->
          </nav>

          <!-- Form fields -->
          <input type="text" aria-label="Search" aria-required="true">

          <!-- Interactive elements -->
          <button aria-expanded="false" aria-controls="menu">
            Toggle Menu
          </button>
          \`\`\`

          Best Practices:
          • Use semantic HTML elements
          • Provide alternative text for images
          • Use proper heading hierarchy
          • Ensure keyboard navigation
          • Add ARIA labels where needed
        `,
        codeExamples: [],
        exercises: [],
        quiz: [],
        resources: []
      },
      {
        ...defaultLesson,
        id: "accessibility-advanced",
        title: "Advanced Accessibility",
        content: `
          Skip Links:
          \`\`\`html
          <a href="#main-content" class="skip-link">
            Skip to main content
          </a>
          \`\`\`

          Focus Management:
          \`\`\`html
          <div tabindex="0">
            Focusable element
          </div>
          \`\`\`

          Live Regions:
          \`\`\`html
          <div aria-live="polite">
            Content that updates dynamically
          </div>
          \`\`\`

          Form Accessibility:
          \`\`\`html
          <form>
            <label for="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              aria-required="true"
              aria-describedby="name-help"
            >
            <span id="name-help">
              Enter your full name
            </span>
          </form>
          \`\`\`
        `,
        codeExamples: [],
        exercises: [],
        quiz: [],
        resources: []
      }
    ]
  }
];

export const HtmlBasicsCourse = () => {
  const [activeModule, setActiveModule] = useState(COURSE_MODULES[0].id);
  const [activeLesson, setActiveLesson] = useState(COURSE_MODULES[0].lessons[0].id);
  const [progress, setProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [codeExercises, setCodeExercises] = useState<Record<string, { completed: boolean, code: string }>>({});
  const [certificates, setCertificates] = useState<string[]>([]);
  const [confetti, setConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'playground' | 'quiz' | 'exercises'>('content');
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
  
  const currentModule = COURSE_MODULES.find(m => m.id === activeModule);
  const currentLesson = currentModule?.lessons.find(l => l.id === activeLesson);
  
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
      correctAnswer: 0,
      explanation: "HTML stands for Hyper Text Markup Language. It's the standard markup language for creating web pages."
    },
    {
      question: "Which element is used to define the document's body?",
      options: [
        "<head>",
        "<document>",
        "<body>",
        "<html>"
      ],
      correctAnswer: 2,
      explanation: "The <body> tag is used to define the document's body."
    },
    {
      question: "Which tag creates a hyperlink?",
      options: [
        "<link>",
        "<a>",
        "<href>",
        "<hyperlink>"
      ],
      correctAnswer: 1,
      explanation: "The <a> tag is used to create a hyperlink."
    },
    {
      question: "Which HTML element is used to define the title of a document?",
      options: [
        "<meta>",
        "<head>",
        "<title>",
        "<header>"
      ],
      correctAnswer: 2,
      explanation: "The <title> tag is used to define the title of a document."
    },
    {
      question: "How do you create a numbered list in HTML?",
      options: [
        "<ul>",
        "<list>",
        "<nl>",
        "<ol>"
      ],
      correctAnswer: 3,
      explanation: "The <ol> tag is used to create a numbered list."
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
      setActiveLesson(nextLesson.id);
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

  // Render playground only if exercises exist
  const renderPlayground = () => {
    if (!currentLesson?.exercises?.length) {
      return (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No exercises available for this lesson.</p>
        </div>
      );
    }

    return (
      <InteractiveCodePlayground
        initialCode={currentLesson.exercises[0].initialCode}
        expectedOutput={currentLesson.exercises[0].expectedOutput}
        onComplete={() => handleCompleteExercise(currentLesson.exercises[0].id)}
      />
    );
  };

  // Render exercises only if they exist
  const renderExercises = () => {
    if (!currentLesson?.exercises?.length) {
      return (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No exercises available for this lesson.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {currentLesson.exercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle>{exercise.title}</CardTitle>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <InteractiveCodePlayground
                  initialCode={exercise.initialCode}
                  expectedOutput={exercise.expectedOutput}
                  onComplete={() => handleCompleteExercise(exercise.id)}
                />
                <div className="space-y-2">
                  <h4 className="font-medium">Hints</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {exercise.hints.map((hint, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // Render quiz only if it exists
  const renderQuiz = () => {
    if (!currentLesson?.quiz?.length) {
      return (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No quiz available for this lesson.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {currentLesson.quiz.map((question, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      variant={selectedAnswers[index] === optionIndex ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleAnswerSelect(index, optionIndex)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showResults && (
                  <div className={cn(
                    "p-4 rounded-lg",
                    selectedAnswers[index] === question.correctAnswer
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  )}>
                    <p className="font-medium">
                      {selectedAnswers[index] === question.correctAnswer
                        ? "Correct!"
                        : "Incorrect"}
                    </p>
                    <p className="text-sm mt-2">{question.explanation}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {!showResults && (
          <Button
            className="w-full"
            onClick={handleSubmitQuiz}
            disabled={!currentLesson?.quiz || Object.keys(selectedAnswers).length !== currentLesson.quiz.length}
          >
            Submit Quiz
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <PageNavigation />

        <div className="mb-8">
          <Badge className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            HTML Basics Course
          </Badge>
          <h1 className="text-4xl font-bold mb-2">Learn HTML</h1>
          <p className="text-xl text-muted-foreground">
            Master the fundamentals of HTML and web development
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
          {/* Course Navigation */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {progress}% Complete
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modules</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {COURSE_MODULES.map((module) => {
                    const Icon = module.icon;
                    return (
                      <div key={module.id} className="space-y-1">
                        <button
                          className={cn(
                            "w-full text-left px-4 py-2 hover:bg-muted/50 transition-colors",
                            activeModule === module.id && "bg-primary/10"
                          )}
                          onClick={() => {
                            setActiveModule(module.id);
                            setActiveLesson(module.lessons[0].id);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{module.title}</span>
                          </div>
                        </button>
                        {activeModule === module.id && (
                          <div className="pl-6 space-y-1">
                            {module.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                className={cn(
                                  "w-full text-left px-4 py-1.5 text-sm hover:bg-muted/50 transition-colors",
                                  activeLesson === lesson.id && "text-primary"
                                )}
                                onClick={() => setActiveLesson(lesson.id)}
                              >
                                {lesson.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {currentModule?.title}
                    </Badge>
                    <CardTitle>{currentLesson?.title}</CardTitle>
                  </div>
                  <Tabs defaultValue="content" value={activeTab} onValueChange={(value) => setActiveTab(value as 'content' | 'playground' | 'quiz' | 'exercises')}>
                    <TabsList>
                      <TabsTrigger value="content">
                        <Book className="w-4 h-4 mr-2" />
                        Content
                      </TabsTrigger>
                      <TabsTrigger value="playground">
                        <Code className="w-4 h-4 mr-2" />
                        Playground
                      </TabsTrigger>
                      <TabsTrigger value="exercises">
                        <Terminal className="w-4 h-4 mr-2" />
                        Exercises
                      </TabsTrigger>
                      <TabsTrigger value="quiz">
                        <Award className="w-4 h-4 mr-2" />
                        Quiz
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" value={activeTab} onValueChange={(value) => setActiveTab(value as 'content' | 'playground' | 'quiz' | 'exercises')}>
                  <TabsContent value="content">
                    <div className="space-y-6">
                      {currentLesson?.videoUrl && (
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={currentLesson.videoUrl}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                      )}
                      <div className="prose dark:prose-invert max-w-none">
                        {currentLesson?.content.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                      {currentLesson?.codeExamples && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Code Examples</h3>
                          {currentLesson.codeExamples.map((example, index) => (
                            <div key={index} className="space-y-2">
                              <h4 className="font-medium">{example.title}</h4>
                              <div className="bg-muted p-4 rounded-lg">
                                <pre className="whitespace-pre-wrap">{example.code}</pre>
                              </div>
                              <p className="text-sm text-muted-foreground">{example.explanation}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="playground">
                    {renderPlayground()}
                  </TabsContent>

                  <TabsContent value="exercises">
                    {renderExercises()}
                  </TabsContent>

                  <TabsContent value="quiz">
                    {renderQuiz()}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {currentLesson?.resources && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentLesson.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {resource.type === 'video' && <Play className="w-4 h-4" />}
                        {resource.type === 'article' && <FileText className="w-4 h-4" />}
                        {resource.type === 'documentation' && <Book className="w-4 h-4" />}
                        <span>{resource.title}</span>
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
