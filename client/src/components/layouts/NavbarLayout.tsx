import { Link, Outlet } from "react-router-dom";
import { Input } from "../ui/input";
import { useState } from "react";
import SearchArea from "../shared/SearchArea";
import {
  Code,
  FilePlus2,
  MessageSquare,
  PlaySquare,
  Trophy,
} from "lucide-react";
import HamburgerMenu from "../shared/HamburgerMenu";
import ThemeChangeButton from "../shared/ThemeChangeButton";

const NavbarLayout = () => {
  const [isSerchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isHamburgerOpen, setHamburgerOpenn] = useState<boolean>(false);
  const topNavItems = [
    {
      to: "/problems",
      label: "Problems",
      icon: <FilePlus2 />,
    },
    { to: "/contests", label: "Contests", icon: <Trophy /> },
    { to: "/discussions", label: "Discussions", icon: <MessageSquare /> },
    { to: "/playlists", label: "Playlists", icon: <PlaySquare /> },
  ];

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex flex-col  ">
        <nav className="w-full px-2 border-b  flex items-center  justify-between gap-2 border-neutral-700/50 sticky top-0 z-[100] backdrop-blur-sm ">
          <div className="flex items-center gap-2">
            <Link to={"/"} className="flex items-center gap-2 p-2">
              <Code />
              <span className="font-outfit-regular">
                <span className="text-yellow-600">Coder</span>
                <span>Route</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-2 justify-between ">
            {topNavItems.map((item) => (
              <Link
                to={item.to}
                className="flex items-center gap-2  text-sm font-outfit-regular hover:font-bold transition-colors hover:text-neutral-700 dark:hover:text-neutral-100"
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="p-2 hidden  md:flex items-center justify-between gap-2 relative">
            <Input
              placeholder="Search for problems"
              className="border border-black/30"
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchModalOpen(true)}
              value={searchQuery}
              type="text"
            />
            <div>
              <ThemeChangeButton />
            </div>
          </div>
          <div className="flex md:hidden p-2 ">
            <HamburgerMenu
              isOpen={isHamburgerOpen}
              setIsOpen={setHamburgerOpenn}
            />
          </div>
        </nav>
        <SearchArea
          isSerchModalOpen={isSerchModalOpen}
          setSearchModalOpen={setSearchModalOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex-1 w-full flex flex-col overflow-hidden ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NavbarLayout;
