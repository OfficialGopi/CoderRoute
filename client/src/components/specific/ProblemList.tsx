import { Bookmark, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip } from "../ui/Tooltip";

type Problem = {
  id: string;
  title: string;
  companies: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  isDemo?: boolean;
};

type Props = {
  problems: Problem[];
};

export default function ProblemList({ problems }: Props) {
  const getDifficultyStyle = (level: string) => {
    if (level.toLocaleLowerCase() === "easy".toLocaleLowerCase())
      return "text-green-600 dark:text-green-400 ";
    if (level.toLocaleLowerCase() === "Medium".toLocaleLowerCase())
      return "text-yellow-600 dark:text-yellow-400 ";
    return "text-red-600 dark:text-red-400 ";
  };

  return (
    <div className="w-full space-y-2 ">
      {problems.map((problem) => {
        const companiesToShow = problem.companies.slice(0, 2);
        const extraCount = problem.companies.length - companiesToShow.length;

        return (
          <div
            key={problem.id}
            className="flex justify-between items-center  p-4 rounded-lg border border-neutral-500/50 transition-colors  hover:bg-neutral-300 dark:hover:bg-neutral-900   font-outfit-regular"
          >
            {/* Left: Title & Tags */}
            <Link
              to={`/problems/${problem.id}`}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 font-medium">
                <span>{problem.title}</span>
                {problem.isDemo && (
                  <span className="text-xs px-2 py-0.5 rounded font-semibold border border-gray-400/20   dark:text-yellow-400 text-red-900">
                    Demo
                  </span>
                )}
              </div>

              <div className="flex gap-2 text-sm text-neutral-800 dark:text-gray-400 flex-wrap ">
                {companiesToShow.map((company, idx) => (
                  <span key={idx}>{company}</span>
                ))}
                {extraCount > 0 && (
                  <span className=" border border-gray-400/20  text-xs px-2 py-0.5 rounded dark:text-yellow-400 text-red-900">
                    +{extraCount} more
                  </span>
                )}
              </div>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2  rounded-sm transition-colors hover:cursor-pointer text-lg  ">
                <span
                  className={`text-base px-2 py-0.5  rounded font-medium ${getDifficultyStyle(
                    problem.difficulty,
                  )}`}
                >
                  {problem.difficulty}
                </span>
              </button>
              <Tooltip label="Add to List" position="bottom">
                <button className="p-2 border border-neutral-400 dark:border-neutral-800 rounded-sm transition-colors hover:cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-800 ">
                  <Plus className="w-4 h-4 text-black dark:text-white" />
                </button>
              </Tooltip>
              <button className="p-2 border border-neutral-400 dark:border-neutral-800 rounded-sm transition-colors hover:cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-800 ">
                <Bookmark className="w-4 h-4 text-black dark:text-white" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
