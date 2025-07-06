import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  showClose?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  showClose = true,
}: ModalProps) => {
  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-250 flex items-center justify-center bg-[rgba(0,0,0,0)] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // click outside to close
        >
          <motion.div
            className="bg-red-950 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative border border-red-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-2 right-3 text-red-300 hover:text-white text-lg"
              >
                &times;
              </button>
            )}

            {title && (
              <h2 className="text-xl font-semibold mb-2 text-red-100">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm mb-4 text-red-300">{description}</p>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
