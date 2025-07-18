import { Code } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import ProblemsSidebarMenu from "../shared/ProblemsSidebarMenu";
import { useState } from "react";
import ThemeChangeButton from "../shared/ThemeChangeButton";

const InProblemNavbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col ">
      <nav className="w-full px-2 py-1 border-b  flex items-center  justify-between gap-2 border-neutral-700/50 sticky top-0 z-10">
        <div className="flex items-center gap-2 ">
          <Link to={"/"} className="flex items-center gap-2 p-2">
            <Code />
            <span className="font-outfit-regular">
              <span className="text-yellow-600">Coder</span>
              <span>Route</span>
            </span>
          </Link>
          <div className="h-[30px] w-[1px] border border-neutral-500/50"></div>
          <ProblemsSidebarMenu
            isOpen={isSidebarOpen}
            setIsOpen={setSidebarOpen}
          />
        </div>

        <div className="p-2 hidden  md:flex items-center justify-between gap-2 relative ">
          <ThemeChangeButton />{" "}
        </div>
        <div className="flex md:hidden ">//TO DO</div>
      </nav>
      <div className="flex-1 w-full flex flex-col overflow-hidden  ">
        <Outlet />
      </div>
    </div>
  );
};

export default InProblemNavbar;
