
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, BookOpen, Award, Check, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  // Testimonials data
  const testimonials = [
    {
      content: "CodePathway helped me transition from a complete beginner to landing my first developer job in just 8 months.",
      author: "Sarah J.",
      title: "Frontend Developer"
    },
    {
      content: "The roadmaps are incredibly detailed and well structured. I finally understand what I need to learn and in what order.",
      author: "Michael T.",
      title: "Computer Science Student"
    },
    {
      content: "I've tried many platforms, but the interactive pathway approach here has made all the difference in my learning experience.",
      author: "Alex K.",
      title: "Self-taught Developer"
    }
  ];

  // Features data
  const features = [
    {
      icon: Code,
      title: "Interactive Roadmaps",
      description: "Follow clear, structured learning paths based on industry standards and best practices."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "Learn everything from programming fundamentals to advanced topics with hands-on exercises."
    },
    {
      icon: Award,
      title: "Skill Certification",
      description: "Earn certificates and badges as you progress through your learning journey."
    }
  ];

  // Learning paths
  const learningPaths = [
    {
      title: "Frontend Development",
      description: "Learn HTML, CSS, JavaScript, and modern frontend frameworks",
      image: "/lovable-uploads/a9fe5199-f90e-4683-b8b4-3a01607d5d27.png",
      link: "/roadmaps/frontend"
    },
    {
      title: "Backend Development",
      description: "Master server-side programming, databases, and APIs",
      image: "/lovable-uploads/53e6d39d-7730-43ea-9516-c6fe0062b1cd.png",
      link: "/roadmaps/backend"
    },
    {
      title: "Cybersecurity",
      description: "Understand security principles and protect digital systems",
      image: "/lovable-uploads/2fca33da-52d6-4ac6-92ff-0f6e4fffed07.png",
      link: "/roadmaps/cybersecurity"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Build Your Path to Engineering Excellence
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Interactive roadmaps and structured learning paths for aspiring computer scientists, 
            programmers, and cybersecurity professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/roadmaps">
                Explore Roadmaps
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Sign Up for Free</Link>
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="bg-gradient-to-b from-background/0 via-purple-500/5 to-background/0 absolute inset-0 rounded-xl"></div>
            <img 
              src="/lovable-uploads/4b6cfdc5-bc05-4c0d-b97b-1ef6669b1b6d.png" 
              alt="Frontend Development Roadmap" 
              className="rounded-xl shadow-lg border border-border/50 w-full max-w-4xl mx-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose CodePathway?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our approach to teaching computer science and programming focuses on clarity, 
              structure, and practical application.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Learning Paths */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Popular Learning Paths</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your journey with these comprehensive roadmaps designed for beginners and professionals alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div 
                key={index} 
                className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={path.image} 
                    alt={path.title} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                  <p className="text-muted-foreground mb-4">{path.description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={path.link}>
                      View Roadmap
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to start learning effectively with CodePathway.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Path</h3>
              <p className="text-muted-foreground">
                Select a learning roadmap that matches your career goals and interests.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Follow The Roadmap</h3>
              <p className="text-muted-foreground">
                Progress through structured content, completing lessons and exercises at your own pace.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Monitor your achievements, earn certificates, and build a comprehensive skill profile.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with CodePathway.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="text-lg mb-6">{testimonial.content}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join CodePathway today and get access to comprehensive roadmaps, interactive courses, and a supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">
                Create Free Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
              <Link to="/roadmaps">
                Explore Roadmaps
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
