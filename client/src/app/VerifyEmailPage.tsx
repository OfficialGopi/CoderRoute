import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./../components/ui/Button";

const VerifyEmailPage = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleVerify = async () => {
    setIsVerifying(true);
    setError("");
    try {
      // TODO: Replace with actual API call
      await new Promise((res) => setTimeout(res, 2000));
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      // TODO: Replace with actual resend logic
      await new Promise((res) => setTimeout(res, 1000));
      alert("Verification token resent to your email.");
      setResendTimer(60);
    } catch (err) {
      setError("Failed to resend token.");
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
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        {
          <>
            <div className="mb-4 text-left">
              <label htmlFor="token" className="block text-sm mb-1">
                Enter Verification Token
              </label>
              <textarea
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                rows={4}
                className="w-full resize-none mt-1 px-4 py-2 bg-[#3a0000] border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-red-100"
              />
            </div>
            <Button
              onClick={handleVerify}
              disabled={isVerifying || !token}
              className="w-full bg-red-700 hover:bg-red-800 mb-3"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
            <div className="text-sm text-red-300 text-center">
              Didn't get the code?
              {resendTimer > 0 ? (
                <span className="ml-1">Resend available in {resendTimer}s</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="ml-1 underline text-red-200 hover:text-red-100"
                >
                  Resend Token
                </button>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </>
        }
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
