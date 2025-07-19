import { cn } from "@/lib/utils";
import { ClockAlert, Code, FileText } from "lucide-react";
import { NavLink, Outlet, useParams } from "react-router-dom";

const InProblemLinkOptionsLayout = () => {
  const { problemId } = useParams();
  const LinksOptions = [
    {
      to: `/problems/${problemId}`,
      label: "Description",
      icon: Code,
    },
    {
      to: `/problems/${problemId}/editorial`,
      label: "Editorial",
      icon: FileText,
    },
    {
      to: `/problems/${problemId}/submissions`,
      label: "Submissions",
      icon: ClockAlert,
    },
  ];

  return (
    <>
      <nav className="w-full flex sticky top-0 z-10 bg-neutral-950 border-b ">
        {LinksOptions.map((link, index) => (
          <NavLink
            to={link.to}
            key={index}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 p-2 hover:bg-neutral-700 transition-colors duration-300 ease-in-out",
                isActive && "bg-neutral-900",
              )
            }
          >
            <link.icon className="w-5 h-5 text-yellow-600" />
            <span className="text-sm">{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
};

export default InProblemLinkOptionsLayout;
