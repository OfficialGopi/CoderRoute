import {
  Github,
  Instagram,
  Linkedin,
  LocateIcon,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Links = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/gopikanta-mondal/",
  },
  {
    icon: Github,
    href: "https://github.com/officialgopi/",
  },
  {
    icon: Twitter,
    href: "https://x.com/DevOfficialGopi",
  },
];

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-black ">
      <h1 className="text-5xl font-outfit-regular py-1 text-neutral-300">
        <span className="">Coder</span>
        <span>Route</span>
      </h1>
      <span className="text-neutral-300  ">
        Empowering Coders to Excel, One Challenge at a Time
      </span>

      <div className="flex justify-between items-center gap-5 w-[1024px] font-outfit-regular py-5">
        <div className="flex flex-col w-[320px]">
          <h4 className="text-lg font-semibold">About</h4>

          <p className="text-neutral-400 text-sm">
            CoderRoute is your ultimate platform for coding excellence. Solve
            problems, track progress, and grow your skills with our cutting-edge
            tools and vibrant community.
          </p>
        </div>
        <div className="flex flex-col ">
          <h4 className="text-lg font-semibold ">Quick Links</h4>
          <div className="flex  flex-col gap-3 text-neutral-100">
            <Link
              to="/problems"
              className="text-sm hover:text-neutral-300 transition"
            >
              Problems
            </Link>
            <Link
              to="/contests"
              className="text-sm hover:text-neutral-300 transition"
            >
              Contests
            </Link>
            <Link
              to="/profile"
              className="text-sm hover:text-neutral-300 transition"
            >
              Profile
            </Link>
          </div>
        </div>
        <div className="flex flex-col ">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <div className="flex  flex-col gap-3">
            <div className="flex gap-2  items-center">
              <Mail className="w-5 h-5 text-yellow-500" />
              <a
                href="mailto:official.gopi@outlook.com"
                className="text-neutral-300 hover:text-yellow-200 transition"
              >
                official.gopi@outlook.com
              </a>
            </div>
            <div className="flex gap-2  items-center">
              <Phone className="w-5 h-5 text-yellow-500" />
              <a
                href="tel:+919832968001"
                className="text-neutral-300 hover:text-yellow-200 transition"
              >
                +91 9832968001
              </a>
            </div>
            <div className="flex gap-2  items-center">
              <div>
                <LocateIcon className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-neutral-300 hover:text-yellow-200 transition">
                Near Chingrighata,. Kolkata, West Bengal, India
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2  p-[0.15px] bg-neutral-700/50 w-[1024px]"></div>
      <div className="flex justify-between items-center w-[1024px] ">
        <div className="flex items-center justify-center gap-2 py-2">
          {Links.map((link, index) => (
            <Link to={link.href} target="_blank" key={index}>
              <link.icon className="w-5 h-5 hover:curson-pointer hover:scale-95 transition-[color_transform] duration-300 ease-in-out  hover:rotate-x-[15deg] hover:rotate-y-[15deg] hover:rotate-[15deg] hover:text-sky-600" />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 text-neutral-300 py-2 text-sm ">
          <span>
            © {new Date().getFullYear()} CoderRoute. All rights reserved.
          </span>
          <Link
            to="/privacy-policy"
            className="hover:text-yellow-200 text-neutral-400 transition duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:text-yellow-200 text-neutral-400 transition duration-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="w-[1024px] flex items-center bg-clip-text justify-center backdrop-blur-sm pt-2 text-[9.5rem] font-outfit-regular mask-[linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]">
        <span className="text-yellow-600">CODER</span>
        <span className="">ROUTE</span>
      </div>
    </div>
  );
};

export default Footer;
