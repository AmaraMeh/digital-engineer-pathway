
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, BookOpen, Award, Check, ExternalLink, BookMarked, Layers, Laptop, BookOpen as BookIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  // Testimonials data
  const testimonials = [{
    content: "CodePathway helped me transition from a complete beginner to landing my first developer job in just 8 months.",
    author: "Sarah J.",
    title: "Frontend Developer"
  }, {
    content: "The roadmaps are incredibly detailed and well structured. I finally understand what I need to learn and in what order.",
    author: "Michael T.",
    title: "Computer Science Student"
  }, {
    content: "I've tried many platforms, but the interactive pathway approach here has made all the difference in my learning experience.",
    author: "Alex K.",
    title: "Self-taught Developer"
  }];

  // Features data
  const features = [{
    icon: Layers,
    title: "Interactive Roadmaps",
    description: "Follow clear, structured learning paths based on industry standards and best practices."
  }, {
    icon: BookIcon,
    title: "Comprehensive Courses",
    description: "Learn everything from programming fundamentals to advanced topics with hands-on exercises."
  }, {
    icon: Award,
    title: "Skill Certification",
    description: "Earn certificates and badges as you progress through your learning journey."
  }];

  // Learning paths
  const learningPaths = [{
    title: "Frontend Development",
    description: "Learn HTML, CSS, JavaScript, and modern frontend frameworks",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    link: "/roadmaps/frontend"
  }, {
    title: "Backend Development",
    description: "Master server-side programming, databases, and APIs",
    technologies: ["Node.js", "Databases", "API Design", "Security"],
    link: "/roadmaps/backend"
  }, {
    title: "Cybersecurity",
    description: "Understand security principles and protect digital systems",
    technologies: ["Network Security", "Cryptography", "Ethical Hacking", "Risk Assessment"],
    link: "/roadmaps/cybersecurity"
  }];
  
  // Animation effect for counting numbers
  const [count, setCount] = useState({ students: 0, courses: 0, certificates: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsObserved = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsObserved.current) {
        statsObserved.current = true;
        
        const finalValues = {
          students: 10000,
          courses: 120,
          certificates: 5000
        };
        
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        
        let frame = 0;
        const counter = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          
          setCount({
            students: Math.floor(progress * finalValues.students),
            courses: Math.floor(progress * finalValues.courses),
            certificates: Math.floor(progress * finalValues.certificates)
          });
          
          if (frame === totalFrames) {
            clearInterval(counter);
          }
        }, frameDuration);
      }
    }, { threshold: 0.25 });
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Fade in animations for sections
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        }
      });
    }, { threshold: 0.15 });
    
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => sectionObserver.observe(section));
    
    return () => sectionObserver.disconnect();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className={`pt-32 pb-20 ${visibleSections.has("hero") ? "animate-fade-in" : "opacity-0"}`}>
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <span className="animate-pulse mr-1">•</span> Interactive Learning Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 md:leading-tight">
            Build Your Path to Engineering&nbsp;Excellence
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Interactive roadmaps and structured learning paths for aspiring computer scientists, 
            programmers, and cybersecurity professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group" asChild>
              <Link to="/roadmaps">
                Explore Roadmaps
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5" asChild>
              <Link to="/signup">Sign Up for Free</Link>
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-0">
              {learningPaths.map((path, index) => (
                <Card key={index} className={`overflow-hidden border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all hover:-translate-y-1 bg-card`}
                     style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-6">
                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      {index === 0 ? <Laptop className="h-6 w-6" /> : 
                       index === 1 ? <Code className="h-6 w-6" /> : 
                       <BookMarked className="h-6 w-6" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                    <p className="text-muted-foreground mb-4">{path.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {path.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="bg-background">{tech}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full group" asChild>
                      <Link to={path.link}>
                        View Roadmap
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section id="stats" ref={statsRef} className={`py-20 bg-muted/30 ${visibleSections.has("stats") ? "animate-fade-in" : "opacity-0"}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2">{count.students.toLocaleString()}+</span>
              <span className="text-lg text-muted-foreground">Active Students</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2">{count.courses}+</span>
              <span className="text-lg text-muted-foreground">Interactive Courses</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2">{count.certificates.toLocaleString()}+</span>
              <span className="text-lg text-muted-foreground">Certificates Issued</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className={`py-20 bg-background ${visibleSections.has("features") ? "animate-fade-in" : "opacity-0"}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose CodePathway?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our approach to teaching computer science and programming focuses on clarity, 
              structure, and practical application.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                   style={{ animationDelay: `${index * 150}ms` }}>
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
      
      {/* How It Works */}
      <section id="how-it-works" className={`py-20 bg-muted/30 ${visibleSections.has("how-it-works") ? "animate-fade-in" : "opacity-0"}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to start learning effectively with CodePathway.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-1/2 left-[calc(33%-1rem)] right-[calc(33%-1rem)] h-0.5 bg-primary/30 -translate-y-1/2"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Path</h3>
              <p className="text-muted-foreground">
                Select a learning roadmap that matches your career goals and interests.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Follow The Roadmap</h3>
              <p className="text-muted-foreground">
                Progress through structured content, completing lessons and exercises at your own pace.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold">
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
      <section id="testimonials" className={`py-20 bg-background ${visibleSections.has("testimonials") ? "animate-fade-in" : "opacity-0"}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with CodePathway.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                   style={{ animationDelay: `${index * 150}ms` }}>
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
      <section id="cta" className={`py-20 bg-primary text-primary-foreground ${visibleSections.has("cta") ? "animate-fade-in" : "opacity-0"}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join CodePathway today and get access to comprehensive roadmaps, interactive courses, and a supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link to="/signup">
                Create Free Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent group" asChild>
              <Link to="/roadmaps">
                Explore Roadmaps
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
