import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./../components/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0000] text-red-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-red-300 max-w-md mx-auto">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-red-700 hover:bg-red-800">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
