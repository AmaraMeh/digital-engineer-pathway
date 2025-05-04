import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, AlertCircle, Star, ArrowRight } from "lucide-react";

const termsSections = [
  {
    title: "Acceptance of Terms",
    description: "By accessing or using CodePathway, you agree to be bound by these Terms of Service.",
    icon: FileText
  },
  {
    title: "User Responsibilities",
    description: "Users are responsible for maintaining the confidentiality of their account and complying with all applicable laws.",
    icon: Shield
  },
  {
    title: "Content Usage",
    description: "All content on CodePathway is protected by intellectual property rights and may not be used without permission.",
    icon: AlertCircle
  },
  {
    title: "Service Modifications",
    description: "We reserve the right to modify or discontinue any aspect of our service at any time.",
    icon: FileText
  }
];

const TermsOfService = () => {
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
            Terms & Conditions
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Terms of Service
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Please read these terms carefully before using our platform. By accessing or using CodePathway, you agree to be bound by these terms.
        </motion.p>
      </section>

      {/* Terms Overview Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Key Terms</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These terms govern your use of CodePathway and outline your rights and responsibilities as a user.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                • You must be at least 13 years old to use our platform
              </p>
              <p className="text-muted-foreground">
                • You are responsible for maintaining the security of your account
              </p>
              <p className="text-muted-foreground">
                • You agree to use our services in compliance with all applicable laws
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {termsSections.map((section, idx) => (
              <Card key={section.title} className="bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Terms Section */}
      <section className="mb-20">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Detailed Terms of Service</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Account Terms</h3>
              <p className="text-muted-foreground">
                When creating an account on CodePathway:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>You must be at least 13 years old to use our services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">2. User Conduct</h3>
              <p className="text-muted-foreground">
                You agree not to:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Interfere with or disrupt our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">3. Intellectual Property</h3>
              <p className="text-muted-foreground">
                All content on CodePathway is protected by intellectual property rights:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>You may not copy, modify, or distribute our content without permission</li>
                <li>You retain ownership of any content you create on our platform</li>
                <li>You grant us a license to use your content to provide our services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">4. Service Modifications</h3>
              <p className="text-muted-foreground">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Modify or discontinue any aspect of our service</li>
                <li>Update these terms at any time</li>
                <li>Terminate accounts that violate our terms</li>
                <li>Refuse service to anyone for any reason</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <motion.div
          className="p-8 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-gray-200/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you have any questions about our Terms of Service, please don't hesitate to contact us.
          </p>
          <Button size="lg" className="gap-2 group">
            Contact Us
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default TermsOfService; 