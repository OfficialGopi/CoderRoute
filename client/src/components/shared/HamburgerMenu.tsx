import { cn } from "@/libs/utils";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FilePlus2,
  LogOut,
  MessageSquare,
  PlaySquare,
  Trophy,
  X,
} from "lucide-react";

const HamburgerMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      <div
        className={cn(
          "fixed z-50",
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
            className="fixed z-50 top-0 left-0 w-3/4 h-screen bg-neutral-950 dark:bg-neutral-800 p-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-full flex items-center justify-end">
                <button
                  className=" text-white hover:text-neutral-300 hover:scale-90 transition-[color,transform] mb-4"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="" />
                </button>
              </div>

              {topNavItems.map((item) => (
                <Link
                  to={item.to}
                  className="flex items-center gap-2 p-2 text-sm font-outfit-regular hover:font-bold transition-colors text-neutral-300 hover:text-neutral-400  group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <Link
                to={`/profile/asdasd`}
                className="transition-colors text-neutral-300 hover:text-neutral-400 group flex items-center hover:cursor-pointer gap-2"
              >
                <img
                  src="https://www.shutterstock.com/image-vector/user-circle-isolated-icon-round-260nw-2459622791.jpg"
                  className="rounded-full w-[40px] h-[40px] object-cover group-hover:scale-90 transition-transform"
                />
                <span className="group-hover:translate-x-1 transition-transform text-sm">
                  Gopikanta Mondal
                </span>
              </Link>
              <div className="transition-colors text-neutral-300 hover:text-neutral-400 group flex items-center hover:cursor-pointer gap-2">
                <LogOut />
                <span className="group-hover:translate-x-1 transition-transform text-sm">
                  Logout
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className=" flex w-[36px] h-[36px] flex-col items-end  justify-evenly p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
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
      </button>
    </>
  );
};

export default HamburgerMenu;
