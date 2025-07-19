import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import ProfileDropDown from "@/components/shared/ProfileDropDown";
import FeatureComponent from "@/components/specific/FeatureComponent";
import Footer from "@/components/specific/Footer";
import MarqueeComponent from "@/components/specific/MarqueeComponent";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card } from "@/components/ui/card";
import { Compare } from "@/components/ui/compare";
import { cn } from "@/libs/utils";
import { ArrowRight, Code } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "min-h-screen w-full",
        "flex flex-col items-center gap-2 relative",
      )}
    >
      <BackgroundBeams className="z-[-1] absolute w-full h-full" />

      <nav
        className={cn(
          "w-full ",
          "px-10 py-2",
          "sticky top-0 z-0",
          "flex  items-center justify-between gap-2",
          "bg-gradient-to-b from-neutral-950/70 from-70% to-100% to-neutral-950/10  backdrop-blur-sm relative z-10 mask-[linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]",
        )}
      >
        <Link to={"/"} className="flex items-center gap-1 p-2">
          <Code />
          <div className="flex  items-center font-montserrat-regular text-neutral-300">
            <span className="text-yellow-600">Coder</span>
            <span>Route</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <ShinyButton
                className="font-outfit-regular"
                onClick={() => navigate("/login")}
              >
                Login
              </ShinyButton>
              <ShinyButton
                className="font-outfit-regular"
                onClick={() => navigate("/signup")}
              >
                Signup
              </ShinyButton>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>
      </nav>
      <div className="w-[1024px] h-[90vh] flex flex-col items-center justify-center">
        <div className="mx-auto flex items-center justify-center gap-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-6xl flex flex-col gap-2 text-outfit-regular">
              <span className="text-5xl text-neutral-300 font-montserrat-regular">
                Ace Your
              </span>
              <div>
                <span className="text-yellow-700">Coding</span>
                Journey
              </div>
            </h1>
            <h3 className="w-[300px] font-outfit-regular text-neutral-300">
              Enhance your coding skills with our comprehensive curriculum
            </h3>

            <ShimmerButton
              className="mt-5 flex items-center gap-2 group z-0"
              onClick={() => navigate("/problems")}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started
              </span>
              <span className="text-white group-hover:translate-x-2 transition">
                <ArrowRight />
              </span>
            </ShimmerButton>
          </div>

          <div className="relative ">
            <Compare
              autoplay={true}
              slideMode="hover"
              autoplayDuration={2000}
              className="rotate-z-30 rotate-x-[40deg] rotate-y-[-30deg] shadow-2xl shadow-neutral-800 rounded-[22px] md:rounded-lg"
              firstImage="https://media.istockphoto.com/id/537331500/photo/programming-code-abstract-technology-background-of-software-deve.jpg?s=612x612&w=0&k=20&c=jlYes8ZfnCmD0lLn-vKvzQoKXrWaEcVypHnB5MuO-g8="
              secondImage="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
              firstImageClassName="w-full h-full"
              secondImageClassname="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col    bg-neutral-200 mt-[100px] p-5">
        <div className="mx-auto flex flex-col items-center">
          <h1 className=" text-2xl font-bold  font-outfit-regular text-neutral-900">
            Where Our Learners Work
          </h1>
          <span className="text-neutral-600 font-montserrat-regular">
            From startups to Fortune 500s, our alumni are building the future
          </span>
        </div>
        <MarqueeComponent />
      </div>

      <div className="text-center mb-16 opacity-100  w-[1024px]">
        <div className="flex items-center justify-center mb-6 mt-3">
          <div className="relative w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-[#f5ac01]/30 to-[#f5ac01]">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#f5ac01] rotate-45 rounded-sm"></div>
          </div>
          <div className="inline-flex items-center px-2 py-1 mx-2 rounded-full bg-[#f5b210]/10 text-[#f5ac01] text-sm font-bold satoshi">
            Features
          </div>
          <div className="relative w-full max-w-[200px] h-px bg-gradient-to-l from-transparent via-[#f5ac01]/30 to-[#f5ac01]">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#f5ac01] rotate-45 rounded-sm"></div>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-200 satoshi tracking-tight">
          Engineered for Excellence
        </h2>
        <FeatureComponent />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
