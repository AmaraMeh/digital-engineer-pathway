import { InteractiveMindMap } from "./InteractiveMindMap";

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

const frontendData: Node[] = [
  {
    id: "internet",
    label: "Internet",
    type: "main",
    description: "Understanding how the internet works is fundamental to web development",
    children: [
      { 
        id: "internet-works", 
        label: "How does the internet work?", 
        type: "topic", 
        status: "recommended",
        courseId: "internet-basics",
        description: "Learn about the backbone of the web",
        completed: false,
        progress: 0
      },
      { 
        id: "http", 
        label: "What is HTTP?", 
        type: "topic", 
        status: "recommended",
        courseId: "http-fundamentals",
        description: "The protocol that powers the web",
        completed: false,
        progress: 0
      },
      { 
        id: "domain", 
        label: "What is Domain Name?", 
        type: "topic", 
        status: "recommended",
        courseId: "domains",
        description: "Understanding web addressing",
        completed: false,
        progress: 0
      },
      { 
        id: "dns", 
        label: "DNS and how it works?", 
        type: "topic", 
        status: "recommended",
        courseId: "dns-explained",
        description: "The internet's phone book",
        completed: false,
        progress: 0
      },
      { 
        id: "browsers", 
        label: "Browsers and how they work?", 
        type: "topic", 
        status: "recommended",
        courseId: "browser-internals",
        description: "Understanding browser rendering engines",
        completed: false,
        progress: 0
      },
    ]
  },
  {
    id: "html",
    label: "HTML",
    type: "main",
    description: "The building blocks of any website",
    children: [
      { 
        id: "html-basics", 
        label: "Learn the basics", 
        type: "topic", 
        status: "recommended",
        courseId: "html-basics",
        description: "HTML fundamentals for beginners",
        completed: true,
        progress: 100
      },
      { 
        id: "semantic-html", 
        label: "Writing Semantic HTML", 
        type: "topic", 
        status: "recommended",
        courseId: "semantic-html",
        description: "Creating meaningful markup",
        completed: false, 
        progress: 45
      },
      { 
        id: "forms-validation", 
        label: "Forms and Validations", 
        type: "topic", 
        status: "recommended",
        courseId: "html-forms",
        description: "Building interactive forms",
        completed: false,
        progress: 0
      },
      { 
        id: "accessibility", 
        label: "Accessibility", 
        type: "topic", 
        status: "recommended",
        courseId: "web-accessibility",
        description: "Making the web usable for everyone",
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "css",
    label: "CSS",
    type: "main",
    description: "Style and layout for your web pages",
    children: [
      { 
        id: "css-basics", 
        label: "Learn the basics", 
        type: "topic", 
        status: "recommended",
        courseId: "css-fundamentals",
        description: "CSS fundamentals for styling web pages",
        completed: false,
        progress: 20
      },
      { 
        id: "layouts", 
        label: "Making Layouts", 
        type: "topic", 
        status: "recommended", 
        courseId: "css-layouts",
        description: "Creating complex page layouts",
        completed: false,
        progress: 0
      },
      { 
        id: "responsive", 
        label: "Responsive Design", 
        type: "topic", 
        status: "recommended", 
        courseId: "responsive-web",
        description: "Adapting to different screen sizes",
        completed: false,
        progress: 0
      },
    ]
  },
  {
    id: "javascript",
    label: "JavaScript",
    type: "main",
    description: "Add interactivity to your websites",
    children: [
      { 
        id: "js-basics", 
        label: "Learn the Basics", 
        type: "topic", 
        status: "recommended", 
        courseId: "js-fundamentals",
        description: "JavaScript syntax and core concepts",
        completed: false,
        progress: 0
      },
      { 
        id: "dom", 
        label: "Learn DOM Manipulation", 
        type: "topic", 
        status: "recommended", 
        courseId: "dom-manipulation",
        description: "Interacting with page elements",
        completed: false,
        progress: 0
      },
      { 
        id: "fetch", 
        label: "Fetch API / Ajax", 
        type: "topic", 
        status: "recommended", 
        courseId: "fetch-api",
        description: "Making asynchronous requests",
        completed: false,
        progress: 0
      },
    ]
  },
  {
    id: "framework",
    label: "Frontend Framework",
    type: "main",
    description: "Tools to build complex user interfaces",
    children: [
      { 
        id: "react", 
        label: "React", 
        type: "topic", 
        status: "recommended", 
        courseId: "react-fundamentals",
        description: "Component-based UI library",
        completed: false,
        progress: 0
      },
      { 
        id: "vue", 
        label: "Vue.js", 
        type: "topic", 
        status: "alternative", 
        courseId: "vue-fundamentals",
        description: "Progressive JavaScript framework",
        completed: false,
        progress: 0
      },
      { 
        id: "angular", 
        label: "Angular", 
        type: "topic", 
        status: "alternative", 
        courseId: "angular-fundamentals",
        description: "Platform for building web applications",
        completed: false,
        progress: 0
      }
    ]
  }
];

export function FrontendRoadmap() {
  return (
    <InteractiveMindMap
      data={frontendData}
      title="Frontend Development Roadmap"
      description="A comprehensive guide to becoming a frontend developer, from basics to advanced concepts"
    />
  );
}
