import { motion } from "framer-motion";
import { Notebook, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { testProblems } from "../../../seeds/MockProblems";

const ProblemsLayout = () => {
  const [search, setSearch] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, z: -256 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-start h-[100vh] w-full"
      onMouseDown={(e) => {
        // Prevent onBlur if clicked inside the search area
        if (
          searchWrapperRef.current &&
          searchWrapperRef.current.contains(e.target as Node)
        ) {
          return;
        }
        setFocus(false);
      }}
    >
      <nav className="border-b border-red-600  z-50 sticky top-0 w-full p-4 flex justify-evenly items-center  gap-4 backdrop-blur-[20px] ">
        {search?.length > 0 && focus && (
          <div
            className="z-50 fixed w-full h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)]"
            onClick={() => {
              setFocus(false);
            }}
          ></div>
        )}
        <div
          ref={searchWrapperRef}
          className="flex flex-col justify-between items-center w-[600px] max-w-[600px] text-sm relative z-100"
        >
          <input
            type="text"
            className="border p-2 px-5 rounded-2xl w-full outline-none"
            placeholder="Search Problems"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocus(true)}
          />
          {search?.length > 0 && focus && (
            <div className="absolute top-[110%] rounded-xl left-0 w-full flex text-base gap-2 flex-col items-center  text-red-300 max-h-[250px] overflow-y-scroll bg-red-950 shadow-2xl">
              {testProblems.map((problem) => {
                return (
                  <Link
                    to={`/problems/${problem.id}`}
                    onClick={() => setFocus(false)}
                    className="h-[50px] w-full hover:bg-red-900 transition-colors p-4 flex items-center justify-between gap-2 rounded-xl"
                    onMouseDown={(e) => {
                      // Allow the navigation to complete before blur
                      e.stopPropagation();
                    }}
                  >
                    <span className="">{problem.title}</span>
                    <span
                      className={`font-bold ${problem.difficulty === "EASY" ? "text-green-500" : problem.difficulty === "MEDIUM" ? "text-amber-400" : "text-red-400"}`}
                    >
                      {problem.difficulty}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center gap-4 text-sm">
          <NavLink
            to="/problems/solved"
            className={({ isActive }) =>
              `hover:text-white transition-colors font-montserrat-regular border-red-600 flex items-center justify-center gap-2 hover:border-red-500 border-b p-2 rounded-sm
              ${isActive ? "text-red-100 bg-red-950" : "text-red-300"}`
            }
          >
            <Notebook size={17} />
            <span>Solved Problems</span>
          </NavLink>
          <NavLink
            to="/problems/create-problem"
            className={({ isActive }) =>
              `hover:text-white transition-colors font-montserrat-regular border-red-600 flex items-center justify-center gap-2 hover:border-red-500 border-b p-2 rounded-sm
                ${isActive ? "text-red-100 bg-red-950" : "text-red-300"}`
            }
          >
            <Plus size={17} />
            <span>Create Problem</span>
          </NavLink>
        </div>
      </nav>
      <div className="w-full flex-[1] z-0  overflow-y-hidden">
        <Outlet />
      </div>
    </motion.div>
  );
};

export default ProblemsLayout;
