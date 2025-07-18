import { useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X } from "lucide-react";

type ModalVariant = "center" | "top" | "right" | "fullscreen";

type FromPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: ModalVariant;
  fromPosition?: FromPosition;
  className?: string; // Custom styles (bg, text color, padding etc.)
  title?: string;
}

const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Helper to calculate initial position
import type { TargetAndTransition } from "framer-motion";
const getInitialTransform = (from: FromPosition): TargetAndTransition => {
  switch (from) {
    case "top-left":
      return { x: "-100%", y: "-100%", opacity: 0 };
    case "top-right":
      return { x: "100%", y: "-100%", opacity: 0 };
    case "bottom-left":
      return { x: "-100%", y: "100%", opacity: 0 };
    case "bottom-right":
      return { x: "100%", y: "100%", opacity: 0 };
    case "top":
      return { y: "-100%", opacity: 0 };
    case "bottom":
      return { y: "100%", opacity: 0 };
    case "left":
      return { x: "-100%", opacity: 0 };
    case "right":
      return { x: "100%", opacity: 0 };
    case "center":
    default:
      return { scale: 0.95, opacity: 0 };
  }
};

const Modal = ({
  isOpen,
  onClose,
  children,
  variant = "center",
  fromPosition = "center",
  className = "",
  title,
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const modalSize =
    variant === "fullscreen" ? "w-full h-full rounded-none" : "w-full max-w-md";

  const modalAlignment =
    variant === "top"
      ? "items-start mt-12"
      : variant === "right"
        ? "items-stretch justify-end"
        : "items-center justify-center";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={`fixed inset-0 z-[1000] w-full h-screen flex ${modalAlignment} backdrop-blur-sm`}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            <motion.div
              className={`relative z-10 shadow-xl overflow-auto ${modalSize} rounded-2xl ${className} pb-4`}
              initial={getInitialTransform(fromPosition)}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 50 },
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full items-center justify-between flex-row-reverse px-3 pt-3">
                <button
                  className="  text-neutral-500 hover:text-neutral-700 transition-colors"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </button>
                {title && (
                  <div className="">
                    <h1 className="text-sm font-outfit-regular text-neutral-500">
                      {title}{" "}
                    </h1>
                  </div>
                )}
              </div>
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
