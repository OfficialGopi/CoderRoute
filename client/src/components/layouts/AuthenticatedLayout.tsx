import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  User,
  LayoutDashboard,
  FilePlus2,
  MessageSquare,
  PlaySquare,
  Trophy,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const topNavItems = [
  { to: "/profile/:id/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/problems", label: "Problems", icon: FilePlus2 },
  { to: "/contests", label: "Contests", icon: Trophy },
  { to: "/discussions", label: "Discussions", icon: MessageSquare },
  { to: "/playlists", label: "Playlists", icon: PlaySquare },
];

const bottomNavItems = [
  { to: `/profile/:id/settings`, label: "Settings", icon: User },
];

const AuthenticatedLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -256, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-[#2a0000] p-4 border-r border-red-800 shadow-lg flex flex-col justify-between transition-all duration-300 fixed md:relative z-50 h-screen md:h-auto`}
      >
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-4">
            {!collapsed && <h2 className="text-xl font-bold">LeetClone</h2>}
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="text-red-300 hover:text-white"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Top Nav */}
          <nav className="flex flex-col gap-2">
            {topNavItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative group flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-red-800 text-white"
                      : "hover:bg-[#3a0000] text-red-300"
                  }`
                }
              >
                <Icon size={18} />
                {!collapsed && label}
                {collapsed && (
                  <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Nav */}
        <div className="flex flex-col gap-2 items-center">
          {bottomNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative group flex w-full items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-red-800 text-white"
                    : "hover:bg-[#3a0000] text-red-300"
                }`
              }
            >
              <Icon size={18} />
              {!collapsed && label}
              {collapsed && (
                <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              )}
            </NavLink>
          ))}
          <button className="flex items-center gap-2 px-3 py-2 rounded-md w-full hover:bg-[#3a0000] text-red-300">
            <LogOut size={18} /> {!collapsed && "Logout"}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="w-full  overflow-y-auto   transition-all duration-300  h-screen  ">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
