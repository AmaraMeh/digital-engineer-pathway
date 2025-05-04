
import { LoginForm } from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">Sign in to continue your learning journey</p>
      </div>
      <LoginForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to CodePathway?{" "}
        <Link to="/signup" className="text-primary font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
