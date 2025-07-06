import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const SuspenseLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0000] text-red-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <Loader2 className="animate-spin h-10 w-10 text-red-500 mb-4" />
        <p className="text-red-300">Loading...</p>
      </motion.div>
    </div>
  );
};

export default SuspenseLoader;
