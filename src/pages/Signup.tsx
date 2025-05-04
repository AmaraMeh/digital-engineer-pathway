
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Join CodePathway</h1>
        <p className="text-muted-foreground mt-2">Start your programming journey today</p>
      </div>
      <RegisterForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
