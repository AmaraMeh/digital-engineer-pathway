import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, ArrowRight } from "lucide-react";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is Digital Engineer Pathway?",
    answer: "Digital Engineer Pathway is an online learning platform designed to help you master modern web development skills through interactive courses, tutorials, and roadmaps."
  },
  {
    question: "How do I get started?",
    answer: "You can start by creating an account and exploring our learning paths. Choose a path that aligns with your goals, and begin with the introductory courses."
  },
  {
    question: "Are the courses free?",
    answer: "We offer both free and premium courses. You can start with our free courses to get a feel for the platform, and upgrade to premium for access to all content."
  },
  {
    question: "What technologies do you teach?",
    answer: "We cover a wide range of technologies including HTML, CSS, JavaScript, React, Node.js, Python, and more. Our curriculum is regularly updated to include the latest technologies."
  },
  {
    question: "Do you offer certificates?",
    answer: "Yes, we offer certificates upon completion of our courses. These certificates can be shared on your professional profiles and resumes."
  },
  {
    question: "How can I track my progress?",
    answer: "Your progress is automatically tracked as you complete lessons and courses. You can view your progress in your dashboard and learning paths."
  }
];

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageNavigation />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about our platform and learning experience
        </p>
      </motion.div>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-12"
      >
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Can't find the answer you're looking for? Please chat to our friendly team.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/contact">
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default FAQ;
