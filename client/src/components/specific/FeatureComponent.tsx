import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Code } from "lucide-react";

const FeatureComponent = () => {
  return (
    <div className="w-full grid p-2 gap-2 grid-cols-4 mt-3">
      <CardComponent className="col-span-2 row-span-2 ">
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-neutral-300 p-3">
            <Code className="text-yellow-600" />
            <span>Ultimate Coding Workspace</span>
          </div>
          <p className="text-neutral-400 text-sm text-start p-2">
            We offer a rich workspace for solving coding problems with a wide
            range of tools and features to enhance your coding experience.
            Whether you’re a beginner or a seasoned pro, our workspace equips
            you with everything you need to code smarter, faster, and better!
          </p>
          <img
            src="/assets/code_workspace.png"
            className="border shadow p-2 rounded-md"
            alt="code workspace"
          />
        </div>
      </CardComponent>

      <CardComponent className="row-span-1 col-span-2">
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-neutral-300 p-3">
            <Code className="text-yellow-600" />
            <span>Public Sheet Library</span>
          </div>
          <p className="text-neutral-400 text-sm text-start p-2">
            Access a vast, community-driven library of coding Sheets and
            challenges designed to sharpen your skills and prepare you for
            real-world problem-solving..
          </p>
          <img
            src="/assets/advanced_problem_solving.png"
            className="border shadow p-2 rounded-md"
            alt="advanced problem solving"
          />
        </div>
      </CardComponent>

      <CardComponent className="row-span-1 col-span-1 text-sm">
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <h3 className="text-5xl font-bold font-montserrat-regular">200+</h3>
          <span className="text-neutral-400">
            Successfully Implemented Coding Problems
          </span>
        </div>
      </CardComponent>
      <CardComponent className="row-span-1 col-span-1 text-sm">
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <h3 className="text-5xl font-bold font-montserrat-regular">+15%</h3>
          <span className="text-neutral-400">
            Increase in Performance and Problem-Solving Success Rate
          </span>
        </div>
      </CardComponent>
    </div>
  );
};

export default FeatureComponent;

const CardComponent = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Card
      className={cn(
        "w-full h-full hover:scale-[0.98] hover:cursor-pointer transition-transform duration-300 ease-in-out p-2 rounded-md",
        "bg-gradient-to-r from-neutral-950/70 from-70% to-100% to-neutral-950/10 backdrop-blur-sm relative z-10 mask-[linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]",
        className,
      )}
    >
      {children}
    </Card>
  );
};
