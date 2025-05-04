import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, ArrowRight, Rocket } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">CodePathway</span>
          </Link>

          <Badge className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary">
            <Rocket className="w-4 h-4 mr-2" />
            Start Your Journey
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
            Create your account
          </h1>
          <p className="text-xl text-muted-foreground">
            Join thousands of developers learning to code
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RegisterForm />
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
