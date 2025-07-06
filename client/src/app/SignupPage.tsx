import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./../components/ui/Button";
import { motion } from "framer-motion";
import { Eye, EyeClosed, Github, Mail } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle signup logic
    console.log(formData);
  };

  const handleSocialSignup = (provider: string) => {
    // TODO: implement social signup logic
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0000] text-red-100">
      <motion.div
        initial={{ opacity: 0, y: 20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "100%" }}
        transition={{ duration: 1 }}
        className="w-full max-w-md bg-[#2a0000] p-8 rounded-xl shadow-lg border border-red-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <div className=" flex items-center justify-between w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="outline-none flex-[1]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs cursor-pointer text-red-300 hover:text-red-100"
              >
                {!showPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm mb-1">
              Confirm Password
            </label>
            <div className=" flex items-center justify-between w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="outline-none flex-[1]"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-xs cursor-pointer text-red-300 hover:text-red-100"
              >
                {!showConfirmPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
            Sign Up
          </Button>

          <div className=" text-center text-sm text-red-300">
            or signup with
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              type="button"
              onClick={() => handleSocialSignup("google")}
              className="flex items-center gap-2 shadow-inner shadow-rose-100 border-red-900 border text-red-100 hover:bg-red-800"
            >
              <Mail className="w-4 h-4" /> Google
            </Button>
            <Button
              type="button"
              onClick={() => handleSocialSignup("github")}
              className="flex items-center gap-2 shadow-inner shadow-rose-100 border-red-900 border text-red-100 hover:bg-red-800"
            >
              <Github className="w-4 h-4" /> GitHub
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-red-300">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-red-100">
            Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
