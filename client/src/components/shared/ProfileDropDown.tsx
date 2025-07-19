import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import Modal from "../ui/modal";

const ProfileDropDown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        fromPosition="center"
        title="Logout"
        isOpen={isLogoutModalOpen}
        className=""
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <h3>Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="flex items-center justify-center gap-2">
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 font-medium transition-all duration-150 ease-in-out"
            onClick={() => {
              setIsLogoutModalOpen(false);
              setOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 font-medium transition-all duration-150 ease-in-out"
            onClick={() => {
              setIsLogoutModalOpen(false);
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      </Modal>
      <DropdownMenu
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <DropdownMenuTrigger>
          <button className="rounded-[100%] p-1 border w-[40px] h-[40px]  hover:cursor-pointer transition-transform duration-300 hover:scale-95 active:scale-90">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Jf7L1uLyKL81OhzN2fk-x0OSKXABNLEZYg&s"
              alt="logo"
              className="rounded-[100%]  "
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="font-montserrat-regular p-2"
          align="center"
          sideOffset={5}
        >
          <DropdownMenuLabel>
            <span className="px-4 py-1 font-outfit-regular ">My Profile</span>
          </DropdownMenuLabel>
          <DropdownMenuItem className="hover:cursor-pointer">
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => {
              setIsLogoutModalOpen(true);
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropDown;
