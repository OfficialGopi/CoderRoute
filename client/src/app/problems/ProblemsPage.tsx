import FilterSidebar from "@/components/specific/FilterTab";
import { useState } from "react";
import ProblemList from "../../components/specific/ProblemList";

const ProblemsPage = () => {
  const [modalIsOpenForAddingPlaylist, setModalIsOpenForAddingPlaylist] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    null,
  );

  const [problems, setProblems] = useState<any[]>([
    {
      id: "container-with-most-water",
      title: "Container With Most Water",
      companies: ["Google", "Amazon", "TCS", "Microsoft", "Oracle"],
      difficulty: "MEDIUM",
      isDemo: true,
    },
    {
      id: "valid-palindrome",
      title: "Valid Palindrome",
      companies: ["TCS", "Oracle"],
      difficulty: "EASY",
      isDemo: true,
    },
    {
      id: "jump-game",
      title: "Jump Game",
      companies: ["Google", "Amazon", "Meta", "Adobe"],
      difficulty: "HARD",
    },
  ]);

  return (
    <>
      <div className="w-full relative flex justify-center h-full overflow-y-scroll z-0">
        <div className="flex justify-center gap-4  ">
          <div className="z-0">
            <FilterSidebar />
          </div>
          <div className="w-250  h-full px-3 ">
            <h1 className="text-2xl font-bold mt-7 font-outfit-regular text-neutral-900 dark:text-neutral-100  p-2">
              Practice Problems
            </h1>
            <div className="w-full  rounded-2xl bg-neutral-200 dark:bg-neutral-950  p-2 ">
              <ProblemList problems={problems} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemsPage;
