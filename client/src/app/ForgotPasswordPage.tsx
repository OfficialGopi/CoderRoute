import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./../components/ui/Button";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");
    try {
      // TODO: Replace with actual forgot password API call
      await new Promise((res) => setTimeout(res, 1500));
      setMessage("If this email is registered, a reset link has been sent.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0000] text-red-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#2a0000] p-8 rounded-xl shadow-lg border border-red-800 text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="text-sm text-red-300 mb-6">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800"
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        <p className="mt-4 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="underline text-red-200 hover:text-red-100"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
