
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronLeft, ChevronRight, Play, Book, Flag, Award, Zap, Code, FileCode } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import "../styles/confetti.css";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz" | "exercise";
  content: string;
  duration: string;
  completed: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  totalLessons: number;
  completedLessons: number;
}

const htmlBasicsCourse: Course = {
  id: "html-basics",
  title: "HTML Basics",
  description: "Learn the fundamentals of HTML, tags, and document structure",
  sections: [
    {
      id: "introduction",
      title: "Introduction to HTML",
      lessons: [
        {
          id: "what-is-html",
          title: "What is HTML?",
          type: "text",
          content: `
            <div class="space-y-4">
              <h2 class="text-2xl font-bold">What is HTML?</h2>
              <p>HTML (Hypertext Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display the content.</p>
              
              <div class="bg-muted p-4 rounded-md my-4 font-mono text-sm">
                &lt;!DOCTYPE html&gt;<br>
                &lt;html&gt;<br>
                &lt;head&gt;<br>
                &nbsp;&nbsp;&lt;title&gt;My First HTML Page&lt;/title&gt;<br>
                &lt;/head&gt;<br>
                &lt;body&gt;<br>
                &nbsp;&nbsp;&lt;h1&gt;Hello, World!&lt;/h1&gt;<br>
                &nbsp;&nbsp;&lt;p&gt;This is my first HTML page.&lt;/p&gt;<br>
                &lt;/body&gt;<br>
                &lt;/html&gt;
              </div>
              
              <p>HTML elements are represented by tags, written using angle brackets. Tags usually come in pairs like <code>&lt;h1&gt;</code> and <code>&lt;/h1&gt;</code>, with the content placed in between the opening and closing tags.</p>
              
              <h3 class="text-xl font-semibold mt-6">Key Points:</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>HTML is not a programming language; it's a markup language</li>
                <li>HTML uses "markup" to annotate text, images, and other content for display in a browser</li>
                <li>HTML documents have a hierarchical structure</li>
                <li>Modern HTML is HTML5, which includes new elements and attributes</li>
              </ul>
            </div>
          `,
          duration: "5 min",
          completed: false
        },
        {
          id: "html-document-structure",
          title: "HTML Document Structure",
          type: "text",
          content: `
            <div class="space-y-4">
              <h2 class="text-2xl font-bold">HTML Document Structure</h2>
              <p>Every HTML document has a required structure including the following declarations and elements:</p>
              
              <h3 class="text-xl font-semibold mt-4">1. DOCTYPE Declaration</h3>
              <p>The DOCTYPE declaration tells the browser which version of HTML the page is using.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;!DOCTYPE html&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">2. HTML Root Element</h3>
              <p>The <code>&lt;html&gt;</code> element is the root element of an HTML page and contains all other HTML elements.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;html lang="en"&gt;
                  <br>&nbsp;&nbsp;<!-- Other HTML content -->
                  <br>&lt;/html&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">3. Head Section</h3>
              <p>The <code>&lt;head&gt;</code> element contains meta-information about the document that isn't displayed on the page.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;head&gt;
                  <br>&nbsp;&nbsp;&lt;meta charset="UTF-8"&gt;
                  <br>&nbsp;&nbsp;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
                  <br>&nbsp;&nbsp;&lt;title&gt;Page Title&lt;/title&gt;
                  <br>&lt;/head&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">4. Body Section</h3>
              <p>The <code>&lt;body&gt;</code> element contains the visible page content that users see in their browser.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;body&gt;
                  <br>&nbsp;&nbsp;&lt;h1&gt;My First Heading&lt;/h1&gt;
                  <br>&nbsp;&nbsp;&lt;p&gt;My first paragraph.&lt;/p&gt;
                  <br>&lt;/body&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Complete Basic Structure</h3>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;!DOCTYPE html&gt;<br>
                &lt;html lang="en"&gt;<br>
                &lt;head&gt;<br>
                &nbsp;&nbsp;&lt;meta charset="UTF-8"&gt;<br>
                &nbsp;&nbsp;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;<br>
                &nbsp;&nbsp;&lt;title&gt;Page Title&lt;/title&gt;<br>
                &lt;/head&gt;<br>
                &lt;body&gt;<br>
                &nbsp;&nbsp;&lt;h1&gt;My First Heading&lt;/h1&gt;<br>
                &nbsp;&nbsp;&lt;p&gt;My first paragraph.&lt;/p&gt;<br>
                &lt;/body&gt;<br>
                &lt;/html&gt;
              </div>
              
              <p>This structure forms the foundation of every HTML document. Understanding these elements is essential for creating well-formed HTML pages.</p>
            </div>
          `,
          duration: "8 min",
          completed: false
        },
        {
          id: "basic-html-elements",
          title: "Basic HTML Elements",
          type: "text",
          content: `
            <div class="space-y-4">
              <h2 class="text-2xl font-bold">Basic HTML Elements</h2>
              <p>HTML uses various elements to structure content. Here are some of the most common elements you'll use:</p>
              
              <h3 class="text-xl font-semibold mt-4">Headings</h3>
              <p>HTML provides six levels of headings, from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code> (least important).</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;h1&gt;Main Heading&lt;/h1&gt;<br>
                &lt;h2&gt;Subheading&lt;/h2&gt;<br>
                &lt;h3&gt;Section Heading&lt;/h3&gt;<br>
                &lt;h4&gt;Smaller Heading&lt;/h4&gt;<br>
                &lt;h5&gt;Even Smaller Heading&lt;/h5&gt;<br>
                &lt;h6&gt;Smallest Heading&lt;/h6&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Paragraphs</h3>
              <p>The <code>&lt;p&gt;</code> tag defines a paragraph of text.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;p&gt;This is a paragraph of text. Paragraphs are block-level elements that automatically add some space before and after the content.&lt;/p&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Links</h3>
              <p>The <code>&lt;a&gt;</code> tag creates hyperlinks to other web pages, files, or locations within the same page.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;a href="https://www.example.com"&gt;Visit Example.com&lt;/a&gt;<br>
                &lt;a href="about.html"&gt;About Us&lt;/a&gt;<br>
                &lt;a href="#section"&gt;Jump to Section&lt;/a&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Images</h3>
              <p>The <code>&lt;img&gt;</code> tag embeds images in your HTML document.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;img src="image.jpg" alt="Description of the image" width="300" height="200"&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Lists</h3>
              <p>HTML supports ordered lists (<code>&lt;ol&gt;</code>) and unordered lists (<code>&lt;ul&gt;</code>).</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;!-- Unordered list --&gt;<br>
                &lt;ul&gt;<br>
                &nbsp;&nbsp;&lt;li&gt;Item 1&lt;/li&gt;<br>
                &nbsp;&nbsp;&lt;li&gt;Item 2&lt;/li&gt;<br>
                &nbsp;&nbsp;&lt;li&gt;Item 3&lt;/li&gt;<br>
                &lt;/ul&gt;<br><br>
                
                &lt;!-- Ordered list --&gt;<br>
                &lt;ol&gt;<br>
                &nbsp;&nbsp;&lt;li&gt;First step&lt;/li&gt;<br>
                &nbsp;&nbsp;&lt;li&gt;Second step&lt;/li&gt;<br>
                &nbsp;&nbsp;&lt;li&gt;Third step&lt;/li&gt;<br>
                &lt;/ol&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Divs and Spans</h3>
              <p>The <code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> elements are used for grouping and styling content.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;div&gt;Block-level container for content&lt;/div&gt;<br>
                &lt;p&gt;Text with a &lt;span&gt;highlighted&lt;/span&gt; word.&lt;/p&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Practice Exercises</h3>
              <p>Try creating a simple HTML document that includes:</p>
              <ol class="list-decimal pl-6 space-y-1">
                <li>An appropriate document structure</li>
                <li>A main heading</li>
                <li>Several paragraphs of text</li>
                <li>A link to another website</li>
                <li>An image (you can use a placeholder URL like https://via.placeholder.com/150)</li>
                <li>Both ordered and unordered lists</li>
              </ol>
            </div>
          `,
          duration: "15 min",
          completed: false
        }
      ]
    },
    {
      id: "html-forms",
      title: "HTML Forms",
      lessons: [
        {
          id: "basic-form-structure",
          title: "Basic Form Structure",
          type: "text",
          content: `
            <div class="space-y-4">
              <h2 class="text-2xl font-bold">Basic Form Structure</h2>
              <p>HTML forms are used to collect user input. The <code>&lt;form&gt;</code> element defines a form that contains form elements.</p>
              
              <h3 class="text-xl font-semibold mt-4">Form Element</h3>
              <p>The <code>&lt;form&gt;</code> element is a container for different types of input elements.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;form action="/submit-form" method="post"&gt;
                  <br>&nbsp;&nbsp;<!-- Form elements go here -->
                  <br>&lt;/form&gt;
              </div>
              
              <h4 class="text-lg font-medium mt-2">Form Attributes:</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li><code>action</code>: Specifies where to send the form data when submitted</li>
                <li><code>method</code>: Specifies the HTTP method to use (get or post)</li>
              </ul>
              
              <h3 class="text-xl font-semibold mt-6">Input Elements</h3>
              <p>The <code>&lt;input&gt;</code> element is the most commonly used form element and can be displayed in several ways, depending on the <code>type</code> attribute.</p>
              
              <h4 class="text-lg font-medium mt-4">Text Input</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;label for="username"&gt;Username:&lt;/label&gt;<br>
                &lt;input type="text" id="username" name="username" placeholder="Enter your username"&gt;
              </div>
              
              <h4 class="text-lg font-medium mt-4">Password Input</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;label for="password"&gt;Password:&lt;/label&gt;<br>
                &lt;input type="password" id="password" name="password"&gt;
              </div>
              
              <h4 class="text-lg font-medium mt-4">Radio Buttons</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="radio" id="male" name="gender" value="male"&gt;<br>
                &lt;label for="male"&gt;Male&lt;/label&gt;<br>
                <br>
                &lt;input type="radio" id="female" name="gender" value="female"&gt;<br>
                &lt;label for="female"&gt;Female&lt;/label&gt;
              </div>
              
              <h4 class="text-lg font-medium mt-4">Checkboxes</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"&gt;<br>
                &lt;label for="vehicle1"&gt;I have a bike&lt;/label&gt;<br>
                <br>
                &lt;input type="checkbox" id="vehicle2" name="vehicle2" value="Car"&gt;<br>
                &lt;label for="vehicle2"&gt;I have a car&lt;/label&gt;
              </div>
              
              <h4 class="text-lg font-medium mt-4">Submit Button</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="submit" value="Submit"&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-6">Complete Form Example</h3>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;form action="/submit-form" method="post"&gt;<br>
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="name"&gt;Name:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="text" id="name" name="name" required&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br>
                <br>
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="email"&gt;Email:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="email" id="email" name="email" required&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br>
                <br>
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label&gt;Gender:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="radio" id="male" name="gender" value="male"&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="male"&gt;Male&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="radio" id="female" name="gender" value="female"&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="female"&gt;Female&lt;/label&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br>
                <br>
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="message"&gt;Message:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;textarea id="message" name="message" rows="4" cols="50"&gt;&lt;/textarea&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br>
                <br>
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="submit" value="Submit"&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br>
                &lt;/form&gt;
              </div>
              
              <p>This is a basic form structure. In the next lesson, we'll cover form validation and more complex form elements.</p>
            </div>
          `,
          duration: "12 min",
          completed: false
        },
        {
          id: "form-validation",
          title: "Form Validation",
          type: "text",
          content: `
            <div class="space-y-4">
              <h2 class="text-2xl font-bold">Form Validation</h2>
              <p>Form validation helps ensure that users fill out forms in the correct format. HTML5 introduced several form validation features that can be used without JavaScript.</p>
              
              <h3 class="text-xl font-semibold mt-4">Required Fields</h3>
              <p>The <code>required</code> attribute specifies that an input field must be filled out before submitting the form.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="text" id="username" name="username" required&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Input Types for Validation</h3>
              <p>HTML5 introduced new input types that provide built-in validation:</p>
              
              <h4 class="text-lg font-medium mt-2">Email</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="email" id="email" name="email"&gt;
              </div>
              
              <h4 class="text-lg font-medium mt-2">URL</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="url" id="website" name="website"&gt;
              </div>
              
              <h4 class="text-lg font-medium mt-2">Number</h4>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="number" id="age" name="age" min="1" max="120"&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Pattern Attribute</h3>
              <p>The <code>pattern</code> attribute specifies a regular expression that the input field's value is checked against.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="text" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Format: 123-456-7890"&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Min and Max Attributes</h3>
              <p>You can specify minimum and maximum values for number, date, and range inputs.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="number" id="quantity" name="quantity" min="1" max="10"&gt;<br>
                &lt;input type="date" id="birthdate" name="birthdate" min="1900-01-01" max="2023-12-31"&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Length Validation</h3>
              <p>You can specify minimum and maximum input length using the <code>minlength</code> and <code>maxlength</code> attributes.</p>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;input type="text" id="username" name="username" minlength="3" maxlength="15"&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Complete Example with Validation</h3>
              <div class="bg-muted p-4 rounded-md my-2 font-mono text-sm">
                &lt;form action="/submit" method="post"&gt;<br>
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="name"&gt;Name:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="text" id="name" name="name" required minlength="2" maxlength="30"&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br><br>
                
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="email"&gt;Email:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="email" id="email" name="email" required&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br><br>
                
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="phone"&gt;Phone:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Format: 123-456-7890"&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br><br>
                
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="password"&gt;Password:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="password" id="password" name="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br><br>
                
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;label for="age"&gt;Age:&lt;/label&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="number" id="age" name="age" min="18" max="120" required&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br><br>
                
                &nbsp;&nbsp;&lt;div&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="submit" value="Submit"&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br>
                &lt;/form&gt;
              </div>
              
              <h3 class="text-xl font-semibold mt-4">Practice Exercise</h3>
              <p>Create a registration form with the following validated fields:</p>
              <ol class="list-decimal pl-6 space-y-1">
                <li>Username (required, between 4-15 characters)</li>
                <li>Email (required, valid email format)</li>
                <li>Password (required, at least 8 characters with at least one number and one uppercase letter)</li>
                <li>Confirm password (should match password)</li>
                <li>Age (between 18-120)</li>
                <li>Phone number (optional, but with pattern validation)</li>
                <li>A submit button</li>
              </ol>
            </div>
          `,
          duration: "15 min",
          completed: false
        }
      ]
    }
  ],
  totalLessons: 5,
  completedLessons: 0
};

const htmlFormsData: Course = {
  id: "html-forms",
  title: "HTML Forms & Validation",
  description: "Create interactive forms and implement client-side validation",
  sections: [
    // Similar structure as htmlBasicsCourse but with forms content
    {
      id: "form-basics",
      title: "Form Basics",
      lessons: []
    }
  ],
  totalLessons: 15,
  completedLessons: 0
};

const courseData: { [key: string]: Course } = {
  "html-basics": htmlBasicsCourse,
  "html-forms": htmlFormsData
};

const CourseContent = () => {
  const { currentUser } = useAuth();
  const { courseId } = useParams<{ courseId: string }>();
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [course, setCourse] = useState<Course | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("content");
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would fetch this from a database
    if (courseId && courseData[courseId]) {
      setCourse(courseData[courseId]);
      
      // Set the first lesson as active by default
      if (courseData[courseId].sections.length > 0 && 
          courseData[courseId].sections[0].lessons.length > 0) {
        setActiveLesson(courseData[courseId].sections[0].lessons[0].id);
      }
      
      // Calculate progress
      const totalLessons = courseData[courseId].totalLessons;
      const completedLessons = courseData[courseId].completedLessons;
      setProgress(totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0);
    }
  }, [courseId]);

  const handleLessonComplete = (lessonId: string) => {
    if (!course) return;
    
    let updatedSections = [...course.sections];
    let completedCount = 0;
    
    updatedSections = updatedSections.map(section => {
      const updatedLessons = section.lessons.map(lesson => {
        if (lesson.id === lessonId) {
          lesson.completed = true;
        }
        if (lesson.completed) {
          completedCount++;
        }
        return lesson;
      });
      return { ...section, lessons: updatedLessons };
    });
    
    const updatedCourse = {
      ...course,
      sections: updatedSections,
      completedLessons: completedCount
    };
    
    setCourse(updatedCourse);
    const newProgress = (completedCount / course.totalLessons) * 100;
    setProgress(newProgress);

    // Show confetti when completing a lesson
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const findCurrentLessonIndex = () => {
    if (!course || !activeLesson) return { sectionIndex: 0, lessonIndex: 0 };
    
    for (let i = 0; i < course.sections.length; i++) {
      const section = course.sections[i];
      for (let j = 0; j < section.lessons.length; j++) {
        if (section.lessons[j].id === activeLesson) {
          return { sectionIndex: i, lessonIndex: j };
        }
      }
    }
    
    return { sectionIndex: 0, lessonIndex: 0 };
  };

  const goToNextLesson = () => {
    if (!course) return;
    
    const { sectionIndex, lessonIndex } = findCurrentLessonIndex();
    const currentSection = course.sections[sectionIndex];
    
    // Check if there's another lesson in the current section
    if (lessonIndex < currentSection.lessons.length - 1) {
      setActiveLesson(currentSection.lessons[lessonIndex + 1].id);
      return;
    }
    
    // Check if there's another section
    if (sectionIndex < course.sections.length - 1) {
      const nextSection = course.sections[sectionIndex + 1];
      if (nextSection.lessons.length > 0) {
        setActiveLesson(nextSection.lessons[0].id);
        return;
      }
    }
  };

  const goToPrevLesson = () => {
    if (!course) return;
    
    const { sectionIndex, lessonIndex } = findCurrentLessonIndex();
    
    // Check if there's a previous lesson in the current section
    if (lessonIndex > 0) {
      setActiveLesson(course.sections[sectionIndex].lessons[lessonIndex - 1].id);
      return;
    }
    
    // Check if there's a previous section
    if (sectionIndex > 0) {
      const prevSection = course.sections[sectionIndex - 1];
      if (prevSection.lessons.length > 0) {
        setActiveLesson(prevSection.lessons[prevSection.lessons.length - 1].id);
        return;
      }
    }
  };

  const getCurrentLesson = () => {
    if (!course || !activeLesson) return null;
    
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        if (lesson.id === activeLesson) {
          return lesson;
        }
      }
    }
    
    return null;
  };

  const handleStartCourse = () => {
    if (course && course.id === 'html-basics') {
      navigate('/courses/html-basics/learn');
    }
  };

  const currentLesson = getCurrentLesson();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">You need to be logged in to view this page</h1>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`confetti-${i + 1} confetti-piece`}></div>
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <Link to="/courses" className="flex items-center text-muted-foreground mb-2">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Courses
              </Link>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground mt-1">{course.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Your progress</div>
                <div className="font-medium">{Math.round(progress)}% complete</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium text-sm">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="playground">Code Playground</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="animate-in fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 order-2 lg:order-1 h-fit sticky top-10">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Course Content</CardTitle>
                    <CardDescription>
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 pb-2">
                    <Accordion type="multiple" className="w-full">
                      {course.sections.map((section, idx) => (
                        <AccordionItem value={section.id} key={section.id} className="border-0 px-4">
                          <AccordionTrigger className="py-3 text-sm hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{idx + 1}. {section.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-2 border-l space-y-1">
                              {section.lessons.map((lesson, lessonIdx) => (
                                <div 
                                  key={lesson.id} 
                                  className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm cursor-pointer transition-colors ${activeLesson === lesson.id ? 'bg-primary text-primary-foreground' : lesson.completed ? 'text-muted-foreground' : 'hover:bg-muted'}`}
                                  onClick={() => setActiveLesson(lesson.id)}
                                >
                                  {lesson.completed ? (
                                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-500">
                                      <Check className="h-3 w-3 text-white" />
                                    </div>
                                  ) : (
                                    <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${activeLesson === lesson.id ? 'border-white' : 'border-muted-foreground'}`}>
                                      <span className="text-xs">{lessonIdx + 1}</span>
                                    </div>
                                  )}
                                  <span>{lesson.title}</span>
                                  <span className="ml-auto text-xs opacity-70">{lesson.duration}</span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button onClick={handleStartCourse} className="w-full" variant="outline">
                      <Zap className="mr-2 h-4 w-4" />
                      Interactive Learning Mode
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <Card className="animate-in fade-in">
                    <CardHeader>
                      {currentLesson && (
                        <>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="mb-2">
                              {currentLesson.type === "video" ? 
                                <Play className="h-3 w-3 mr-1" /> : 
                                currentLesson.type === "quiz" ? 
                                <FileCode className="h-3 w-3 mr-1" /> : 
                                currentLesson.type === "exercise" ? 
                                <Code className="h-3 w-3 mr-1" /> : 
                                <Book className="h-3 w-3 mr-1" />}
                              {currentLesson.type === "video" ? "Video" : 
                               currentLesson.type === "quiz" ? "Quiz" : 
                               currentLesson.type === "exercise" ? "Exercise" : "Reading"}
                            </Badge>
                            {currentLesson.completed && (
                              <Badge variant="secondary" className="mb-2">
                                <Check className="h-3 w-3 mr-1" /> Completed
                              </Badge>
                            )}
                          </div>
                          <CardTitle>{currentLesson.title}</CardTitle>
                        </>
                      )}
                    </CardHeader>
                    <CardContent>
                      {currentLesson && (
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <Button 
                        variant="outline"
                        onClick={goToPrevLesson}
                        disabled={findCurrentLessonIndex().sectionIndex === 0 && findCurrentLessonIndex().lessonIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous Lesson
                      </Button>
                      
                      <div className="flex gap-2">
                        {currentLesson && !currentLesson.completed && (
                          <Button onClick={() => handleLessonComplete(currentLesson.id)}>
                            <Flag className="h-4 w-4 mr-2" />
                            Mark as Complete
                          </Button>
                        )}
                        
                        <Button 
                          onClick={goToNextLesson}
                          disabled={findCurrentLessonIndex().sectionIndex === course.sections.length - 1 && 
                                    findCurrentLessonIndex().lessonIndex === course.sections[course.sections.length - 1].lessons.length - 1}
                        >
                          Next Lesson
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="overview" className="animate-in fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                  <CardDescription>Everything you need to know about this course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>Understand HTML document structure</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>Create semantic HTML markup</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>Build forms and collect user input</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>Apply validation to form fields</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Course Structure</h3>
                    <p className="text-muted-foreground mb-4">
                      This course is organized into {course.sections.length} sections with a total of {course.totalLessons} lessons.
                    </p>
                    <div className="space-y-4">
                      {course.sections.map((section, idx) => (
                        <div key={section.id}>
                          <h4 className="font-medium">{idx + 1}. {section.title}</h4>
                          <p className="text-sm text-muted-foreground">{section.lessons.length} lessons</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                    <p className="text-muted-foreground">
                      No prior knowledge required. This course is suitable for complete beginners.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setActiveTab("content")}>
                    Start Learning
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="playground" className="animate-in fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Code Playground</CardTitle>
                  <CardDescription>Practice your HTML skills in real-time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
                    <div className="border rounded-md p-4 bg-muted/30 h-full">
                      <div className="text-sm font-medium mb-2">HTML</div>
                      <pre className="h-[calc(100%-30px)] overflow-auto p-2 rounded bg-muted font-mono text-sm">
                        {`<!DOCTYPE html>
<html>
<head>
  <title>My HTML Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Welcome to my first HTML page.</p>
  
  <!-- Try adding more elements here -->
  
</body>
</html>`}
                      </pre>
                    </div>
                    <div className="border rounded-md p-4 h-full">
                      <div className="text-sm font-medium mb-2">Preview</div>
                      <div className="h-[calc(100%-30px)] overflow-auto p-2 rounded border">
                        <h1 className="text-2xl font-bold">Hello World!</h1>
                        <p>Welcome to my first HTML page.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline">
                      Reset Example
                    </Button>
                    <Button>
                      Run Code
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Note: This is a simplified playground. For a full interactive experience, try the lessons.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
