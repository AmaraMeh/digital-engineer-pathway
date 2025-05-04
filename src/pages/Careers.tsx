import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, Users, Heart, Star, Rocket, Code, BookOpen } from "lucide-react";

const jobOpenings = [
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Join our team to build beautiful and interactive learning experiences.",
    icon: Code
  },
  {
    title: "Content Developer",
    department: "Education",
    location: "Remote",
    type: "Full-time",
    description: "Create engaging and effective learning materials for our platform.",
    icon: BookOpen
  },
  {
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    description: "Build and nurture our growing community of learners.",
    icon: Users
  }
];

const benefits = [
  {
    title: "Remote Work",
    description: "Work from anywhere in the world with our fully remote setup.",
    icon: Briefcase
  },
  {
    title: "Learning Budget",
    description: "Annual budget for professional development and learning resources.",
    icon: BookOpen
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health coverage and wellness programs.",
    icon: Heart
  },
  {
    title: "Flexible Hours",
    description: "Work on your own schedule with flexible working hours.",
    icon: Rocket
  }
];

const Careers = () => {
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
            Join Our Team
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Build the Future of Education
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Join our mission to make quality education accessible to everyone. We're looking for passionate individuals who want to make a difference.
        </motion.p>
      </section>

      {/* Job Openings Section */}
      <section className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our current job opportunities and find your perfect role.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobOpenings.map((job, idx) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <job.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{job.department}</Badge>
                    <Badge variant="outline">{job.location}</Badge>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <Button className="w-full gap-2 group">
                    Apply Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Join Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a range of benefits to support your growth and well-being.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
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
          <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button size="lg" className="gap-2 group">
            Submit Resume
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Careers; 