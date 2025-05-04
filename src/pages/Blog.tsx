import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Calendar, User, Tag, Star } from "lucide-react";

const blogPosts = [
  {
    title: "Getting Started with React Hooks",
    author: "Amara Mehdi",
    date: "March 15, 2024",
    category: "React",
    description: "Learn how to use React Hooks to simplify your component logic and improve code organization.",
    readTime: "5 min read"
  },
  {
    title: "Building Responsive Web Design",
    author: "Amara Mehdi",
    date: "March 10, 2024",
    category: "CSS",
    description: "Master the art of creating responsive websites that work beautifully on all devices.",
    readTime: "7 min read"
  },
  {
    title: "JavaScript Best Practices",
    author: "Amara Mehdi",
    date: "March 5, 2024",
    category: "JavaScript",
    description: "Discover essential JavaScript best practices to write cleaner and more maintainable code.",
    readTime: "6 min read"
  },
  {
    title: "TypeScript for Beginners",
    author: "Amara Mehdi",
    date: "February 28, 2024",
    category: "TypeScript",
    description: "A comprehensive guide to getting started with TypeScript and its benefits.",
    readTime: "8 min read"
  },
  {
    title: "Web Performance Optimization",
    author: "Amara Mehdi",
    date: "February 20, 2024",
    category: "Performance",
    description: "Learn techniques to improve your website's performance and user experience.",
    readTime: "10 min read"
  },
  {
    title: "Modern CSS Techniques",
    author: "Amara Mehdi",
    date: "February 15, 2024",
    category: "CSS",
    description: "Explore modern CSS features and techniques to create stunning designs.",
    readTime: "6 min read"
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

const Blog = () => {
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
            Latest Articles
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CodePathway Blog
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Stay updated with the latest trends, tips, and tutorials in web development.
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
              placeholder="Search articles..."
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

      {/* Blog Posts Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="outline" className="mb-4 w-fit">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  <Button variant="link" className="p-0 h-auto gap-2 group">
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="text-center">
        <motion.div
          className="p-8 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-gray-200/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest articles and updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
            />
            <Button className="gap-2 group">
              Subscribe
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Blog; 