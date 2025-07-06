import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./../components/ui/Button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Github, Mail } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    // TODO: handle login logic
    console.log(formData);
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: implement social login logic
    console.log(`Logging in with ${provider}`);
  };
  return (
    <div className="min-h-screen flex items-center justify-center  text-red-100">
      <motion.div
        initial={{ opacity: 0, y: 20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "100%" }}
        transition={{ duration: 1 }}
        className="w-full max-w-md bg-[#2a0000] p-8 rounded-xl shadow-lg drop-shadow-2xl h-[374px]  border border-red-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              name="user-email"
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              name="user-password"
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100"
            />
          </div>

          <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
            Log In
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-red-300">
          or continue with
        </div>

        <div className="mt-4 flex flex-col space-y-3">
          <Button
            onClick={() => handleSocialLogin("google")}
            className="w-full  bg-red-900 hover:bg-red-950 shadow-inner shadow-rose-100 flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" /> Continue with Google
          </Button>
          <Button
            onClick={() => handleSocialLogin("github")}
            className="w-full bg-red-900 shadow-inner shadow-rose-100 hover:bg-red-950 flex items-center justify-center"
          >
            <Github className="w-4 h-4 mr-2" /> Continue with GitHub
          </Button>
        </div>
        <div className="mt-6 flex justify-between text-sm text-red-300">
          <Link to="/forgot-password" className="hover:text-red-100">
            Forgot Password?
          </Link>
          <Link to="/signup" className="hover:text-red-100">
            Don’t have an account? Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
