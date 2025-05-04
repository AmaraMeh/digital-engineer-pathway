
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type NodeType = "main" | "sub" | "topic";

interface Node {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  status?: string;
  courseId?: string;
  completed?: boolean;
  progress?: number;
  children?: Node[];
}

// Update your data initialization to match the Node type
const htmlData: Node[] = [
  {
    id: "html-basics",
    label: "HTML Basics",
    type: "main" as NodeType,
    description: "Learn the fundamentals of HTML",
    children: [
      {
        id: "html-intro",
        label: "Introduction to HTML",
        type: "sub" as NodeType,
        status: "available",
        courseId: "html-basics",
        description: "Learn what HTML is and how it structures the web",
        completed: true,
        progress: 100,
      },
      {
        id: "html-elements",
        label: "HTML Elements",
        type: "sub" as NodeType,
        status: "available",
        courseId: "html-basics",
        description: "Learn about different HTML elements and their usage",
        completed: false,
        progress: 0,
      },
      {
        id: "html-attributes",
        label: "HTML Attributes",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "html-basics",
        description: "Understand how to use attributes to modify HTML elements",
        completed: false,
        progress: 0,
      },
    ],
  },
];

const cssData: Node[] = [
  {
    id: "css-basics",
    label: "CSS Basics",
    type: "main" as NodeType,
    description: "Learn the fundamentals of CSS",
    children: [
      {
        id: "css-intro",
        label: "Introduction to CSS",
        type: "sub" as NodeType,
        status: "available",
        courseId: "css-basics",
        description: "Learn what CSS is and how it styles the web",
        completed: false,
        progress: 0,
      },
      {
        id: "css-selectors",
        label: "CSS Selectors",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "css-basics",
        description: "Learn how to select HTML elements with CSS",
        completed: false,
        progress: 0,
      },
      {
        id: "css-properties",
        label: "CSS Properties",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "css-basics",
        description: "Understand common CSS properties and their values",
        completed: false,
        progress: 0,
      },
    ],
  },
];

const jsData: Node[] = [
  {
    id: "js-basics",
    label: "JavaScript Basics",
    type: "main" as NodeType,
    description: "Learn the fundamentals of JavaScript",
    children: [
      {
        id: "js-intro",
        label: "Introduction to JavaScript",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "js-basics",
        description: "Learn what JavaScript is and how it adds interactivity",
        completed: false,
        progress: 0,
      },
      {
        id: "js-variables",
        label: "JavaScript Variables",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "js-basics",
        description: "Learn how to declare and use variables in JavaScript",
        completed: false,
        progress: 0,
      },
      {
        id: "js-functions",
        label: "JavaScript Functions",
        type: "sub" as NodeType,
        status: "locked",
        courseId: "js-basics",
        description: "Understand how to define and call functions in JavaScript",
        completed: false,
        progress: 0,
      },
    ],
  },
];

// Make sure all nodes in the allData array are properly typed
const allData: Node[] = [...htmlData, ...cssData, ...jsData];

const Roadmaps = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Learning Roadmaps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allData.map((roadmap) => (
          <Card key={roadmap.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>{roadmap.label}</CardTitle>
              <CardDescription>{roadmap.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {roadmap.children?.map((course) => (
                  <li key={course.id} className="py-2">
                    <div className="flex items-center justify-between">
                      <Link to={`/courses/${course.courseId}`} className="hover:underline">
                        {course.label}
                      </Link>
                      <div>
                        {course.status === "available" && (
                          <Badge variant="secondary">Available</Badge>
                        )}
                        {course.status === "locked" && (
                          <Badge variant="outline">Locked</Badge>
                        )}
                        {course.completed && (
                          <Badge>Completed</Badge>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link to={`/courses/${roadmap.id}`} className="text-blue-500 hover:underline">
                View Roadmap
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
