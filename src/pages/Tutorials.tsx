import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, BookOpen, Code, Star, Clock, Users, Play } from "lucide-react";

const tutorials = [
  {
    title: "React Fundamentals",
    level: "Beginner",
    duration: "2 hours",
    students: "1.2k",
    description: "Learn the core concepts of React and build your first application.",
    icon: Code
  },
  {
    title: "CSS Grid Layout",
    level: "Intermediate",
    duration: "1.5 hours",
    students: "850",
    description: "Master CSS Grid to create complex layouts with ease.",
    icon: BookOpen
  },
  {
    title: "TypeScript Basics",
    level: "Beginner",
    duration: "3 hours",
    students: "950",
    description: "Get started with TypeScript and learn how to write type-safe code.",
    icon: Code
  },
  {
    title: "Advanced JavaScript",
    level: "Advanced",
    duration: "4 hours",
    students: "650",
    description: "Deep dive into advanced JavaScript concepts and patterns.",
    icon: Code
  },
  {
    title: "Responsive Design",
    level: "Intermediate",
    duration: "2.5 hours",
    students: "1.1k",
    description: "Learn how to create responsive websites that work on all devices.",
    icon: BookOpen
  },
  {
    title: "Web Performance",
    level: "Advanced",
    duration: "3 hours",
    students: "500",
    description: "Optimize your website's performance and improve user experience.",
    icon: Code
  }
];

const categories = [
  "All",
  "React",
  "JavaScript",
  "TypeScript",
  "CSS",
  "Performance",
  "Web Development"
];

const Tutorials = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary">
            <Star className="w-4 h-4 mr-2" />
            Learn & Grow
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Interactive Tutorials
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Master web development with our comprehensive tutorials and hands-on exercises.
        </motion.p>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tutorials..."
              className="pl-10 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </motion.div>
      </section>

      {/* Tutorials Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, idx) => (
            <motion.div
              key={tutorial.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <tutorial.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {tutorial.students} students
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-4 w-fit">
                    {tutorial.level}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  <Button className="w-full gap-2 group">
                    Start Learning
                    <Play className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <motion.div
          className="p-8 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-gray-200/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already learning with CodePathway.
          </p>
          <Button size="lg" className="gap-2 group">
            Get Started
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Tutorials; 