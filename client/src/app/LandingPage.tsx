import { Button } from "./../components/ui/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Triangle } from "lucide-react";
import { useState } from "react";
import CurvySvg from "../assets/svgs/CurvyBGSvg";

const LandingPage = () => {
  const [isUser, setIsUser] = useState<boolean>(true);
  return (
    <div className="min-h-screen  text-red-100 font-sans">
      {/* Top Navbar */}
      <div className="w-full lg:w-[1024px] mx-auto">
        <nav className="flex items-center justify-between px-8 py-4 border-b  border-[rgba(151,0,0,0.5)] ">
          <Link to={"/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold">
              C
            </div>
            <span className="text-lg font-semibold">CodeCrack</span>
          </Link>
          <div className="flex items-center space-x-6 font-outfit-regular">
            {!isUser ? (
              <Link
                to="/signup"
                className="hover:text-red-300 transition-colors "
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/problems"
                className="hover:text-red-300 transition-colors "
              >
                Explore
              </Link>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-10 justify-between px-8 py-20  max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6  text-red-100 font-montserrat-regular ">
              <span className="text-red-300  text-3xl lg:text-4xl">
                Ace Your
              </span>
              <br /> <span>Coding Interviews</span>
            </h1>
            <p className="text-red-300 mb-6">
              Practice with the best coding problems to prepare
              <br /> for your next interview.
            </p>
            <Link to={isUser ? "/signup" : "/login"}>
              <Button className=" text-white px-6 py-3 hover:cursor-pointer flex items-center hover:underline underline-offset-4 *:outline-none *:border-0 ">
                <span className="font-outfit-regular  text-lg  text-red-100">
                  Get Started
                </span>
                <motion.span
                  animate={{
                    opacity: 1,
                    x: [0, 5, 0],
                  }}
                  transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
                >
                  <ArrowRight className="inline-block w-4 h-4 ml-2 text-red-100 " />
                </motion.span>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#2b0000] rounded-xl p-6 w-full md:w-[400px] shadow-lg border border-red-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-red-200">
                Coding Challenge
              </h2>
              <CheckCircle className="text-green-400" size={20} />
            </div>
            <div className="bg-[#3a0000] p-4 rounded-md text-sm text-red-300 space-y-2">
              <p>Write a function that returns the sum of two numbers.</p>
              <div className="p-2 rounded-sm">
                <pre className="text-sm text-red-100 font-montserrat-regular">
                  <code>
                    function sum(a, b){"{"}
                    <br />
                    {"   "}return a + b;
                    <br />
                    {"}"}
                  </code>
                </pre>
              </div>
              <div className="flex justify-end">
                <Button className="mt-4 bg-red-600 hover:bg-red-700 flex items-center gap-2 px-4 py-1 text-sm font-semibold hover:cursor-pointer">
                  <span>
                    <Triangle className="rotate-[-30deg] translate-y-[-2px] origin-center text-sm" />
                  </span>
                  <span>Run</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
