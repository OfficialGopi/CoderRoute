import { cn } from "@/libs/utils";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

const ProblemsSidebarMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const problemsList = [
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
    {
      id: 1,
      title: "Problem 1",
      description: "Description of problem 1",
      tags: ["tag1", "tag2"],
      difficulty: "EASY",
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "MEDIUM",
      description: "Description of problem 2",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "HARD",
      description: "Description of problem 3",
      tags: ["tag1", "tag2"],
    },
  ];
  return (
    <>
      <div
        className={cn(
          "fixed z-[10000]",
          isOpen ? "flex" : "hidden",
          "top-0 left-0 w-full h-screen bg-black/30 p-4",
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -100,
            }}
            transition={{
              duration: 0.5,
            }}
            className="fixed z-[1000000]  top-0 left-0 max-w-[600px] w-[600px] h-screen bg-neutral-900 dark:bg-neutral-800  flex flex-col justify-between  overflow-y-scroll"
          >
            <div className="flex flex-col gap-4 relative bg-inherit ">
              <div className="bg-inherit sticky top-0 px-4 pt-4 pb-1">
                <div className="w-full flex items-center justify-end sticky top-0 bg-inherit">
                  <button
                    className=" text-white hover:text-neutral-300 hover:scale-90 transition-[color,transform] mb-4 "
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="" />
                  </button>
                </div>
                <Input
                  placeholder="Search for problems"
                  className="text-neutral-300 bg-inherit  sticky top-[60px] "
                />
              </div>
              <div className="w-full flex flex-col bg-inherit px-4">
                <div className="w-full p-2 text-neutral-200 ">
                  {problemsList.map((problem, index) => (
                    <Link
                      to={`/problems/${problem.id}`}
                      key={problem.id}
                      className="flex items-center gap-2 p-2 hover:bg-neutral-700 transition-colors w-full px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-sm  ">
                          {index + 1}. {problem.title}
                        </span>
                        <div className="flex items-center gap-2 text-sm">
                          {problem.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`text-sm  font-bold ${problem.difficulty === "EASY" ? "text-green-600 dark:text-green-400" : problem.difficulty === "MEDIUM" ? "text-yellow-400" : "text-red-400"}`}
                      >
                        {problem.difficulty}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>View</span>
                        <span className="text-neutral-500">↗</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="flex items-center gap-2 hover:cursor-pointer p-2    "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>Problems List</div>
        <div className="flex w-[20px] h-[20px] flex-col items-end  justify-evenly">
          <span
            className={cn(
              " py-0.5 bg-neutral-800 rounded-2xl transition-[width]",
              !isOpen ? "w-1/2" : "w-2/3",
            )}
          ></span>
          <span
            className={cn(
              " py-0.5 bg-neutral-800 rounded-2xl transition-[width]",
              !isOpen ? "w-full" : "w-1/2",
            )}
          ></span>
          <span
            className={cn(
              " py-0.5 bg-neutral-800 rounded-2xl transition-[width]",
              !isOpen ? "w-2/3" : "w-full",
            )}
          ></span>
        </div>
      </button>
    </>
  );
};

export default ProblemsSidebarMenu;
