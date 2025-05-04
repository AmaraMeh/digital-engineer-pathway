import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Target, Award, Heart, Rocket, Star } from "lucide-react";

const teamMembers = [
  {
    name: "Amara Mehdi",
    role: "Founder & Lead Developer",
    description: "Passionate about education and technology, leading the vision of CodePathway.",
    icon: Rocket
  },
  {
    name: "Development Team",
    role: "Core Contributors",
    description: "Dedicated team of developers and educators working to create the best learning experience.",
    icon: Users
  },
  {
    name: "Community",
    role: "Active Members",
    description: "Thousands of learners and contributors who make CodePathway what it is today.",
    icon: Heart
  }
];

const values = [
  {
    title: "Quality Education",
    description: "We believe in providing high-quality, practical learning experiences that prepare you for real-world challenges.",
    icon: Award
  },
  {
    title: "Community Focus",
    description: "Building a supportive community where learners can grow together and help each other succeed.",
    icon: Users
  },
  {
    title: "Innovation",
    description: "Constantly evolving our platform with the latest technologies and teaching methodologies.",
    icon: Rocket
  },
  {
    title: "Accessibility",
    description: "Making quality education accessible to everyone, regardless of their background or location.",
    icon: Target
  }
];

const AboutUs = () => {
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
            Our Story
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Transforming Education Through Technology
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          CodePathway was founded with a simple mission: to make quality education accessible to everyone. 
          We believe in the power of technology to transform lives and create opportunities.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              To democratize education by providing high-quality, interactive learning experiences that empower individuals to achieve their full potential.
            </p>
            <Button className="gap-2 group">
              Join Our Mission
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {values.map((value, idx) => (
              <Card key={value.title} className="bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate individuals behind CodePathway who are dedicated to transforming education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <member.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
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
          <h2 className="text-3xl font-bold mb-4">Join Us in Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a learner, educator, or developer, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 group">
              Start Learning
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs; 