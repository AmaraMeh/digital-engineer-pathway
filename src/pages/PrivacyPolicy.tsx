import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Star, ArrowRight } from "lucide-react";

const privacySections = [
  {
    title: "Information We Collect",
    description: "We collect information that you provide directly to us, including your name, email address, and learning preferences.",
    icon: FileText
  },
  {
    title: "How We Use Your Data",
    description: "We use your information to provide and improve our services, personalize your learning experience, and communicate with you.",
    icon: Eye
  },
  {
    title: "Data Security",
    description: "We implement industry-standard security measures to protect your personal information from unauthorized access.",
    icon: Lock
  },
  {
    title: "Your Rights",
    description: "You have the right to access, correct, or delete your personal information at any time.",
    icon: Shield
  }
];

const PrivacyPolicy = () => {
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
            Privacy & Security
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your Privacy Matters
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We are committed to protecting your privacy and ensuring the security of your personal information.
        </motion.p>
      </section>

      {/* Privacy Overview Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Privacy Commitment</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At CodePathway, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                • We never sell your personal information to third parties
              </p>
              <p className="text-muted-foreground">
                • We use industry-standard security measures to protect your data
              </p>
              <p className="text-muted-foreground">
                • You have control over your personal information
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
            {privacySections.map((section, idx) => (
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

      {/* Detailed Policy Section */}
      <section className="mb-20">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Detailed Privacy Policy</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Information Collection</h3>
              <p className="text-muted-foreground">
                We collect information that you provide when you create an account, enroll in courses, or interact with our platform. This includes:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Personal information (name, email, etc.)</li>
                <li>Learning progress and preferences</li>
                <li>Payment information (processed securely)</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">2. Data Usage</h3>
              <p className="text-muted-foreground">
                We use your information to:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Provide and improve our services</li>
                <li>Personalize your learning experience</li>
                <li>Process payments and maintain your account</li>
                <li>Send important updates and notifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">3. Data Protection</h3>
              <p className="text-muted-foreground">
                We implement various security measures to protect your information:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Secure data storage</li>
                <li>Access controls and authentication</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">4. Your Rights</h3>
              <p className="text-muted-foreground">
                You have the right to:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
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
          <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you have any questions about our privacy policy or how we handle your data, please don't hesitate to contact us.
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

export default PrivacyPolicy; 