import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type FilterSection = {
  title: string;
  items: { label: string; count: number }[];
};

const filtersData: FilterSection[] = [
  {
    title: "Companies",
    items: [
      { label: "Google", count: 30 },
      { label: "Amazon", count: 22 },
      { label: "Tcs", count: 10 },
      { label: "Microsoft", count: 8 },
      { label: "Oracle", count: 7 },
      { label: "Atlassian", count: 6 },
      { label: "Uber", count: 5 },
      { label: "Adobe", count: 4 },
    ],
  },
  {
    title: "Topics",
    items: [
      { label: "Array", count: 24 },
      { label: "String", count: 7 },
      { label: "Two Pointers", count: 6 },
      { label: "Dynamic Programming", count: 6 },
      { label: "Math", count: 5 },
      { label: "DFS", count: 5 },
      { label: "Graph", count: 3 },
    ],
  },
  {
    title: "Difficulty",
    items: [
      { label: "Easy", count: 26 },
      { label: "Medium", count: 11 },
      { label: "Hard", count: 5 },
    ],
  },
  {
    title: "Status",
    items: [
      { label: "Solved", count: 0 },
      { label: "Unsolved", count: 42 },
    ],
  },
];

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [visibleCounts, setVisibleCounts] = useState<{ [key: string]: number }>(
    {},
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const toggleShowMore = (title: string, totalItems: number) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [title]: prev[title] === 6 ? totalItems : 6,
    }));
  };

  const clearAll = () => {
    // Reset filter logic
    console.log("Cleared all filters");
  };

  return (
    <motion.aside
      className=" z-0 h-fit w-64 bg-neutral-200 dark:bg-neutral-950 shadow-2xl mt-20 p-6 rounded-xl border border-neutral-700/20  space-y-6 text-montserrat-regular overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center overflow-hidden">
        <h2 className="text-lg font-montserrat-regular flex items-center gap-2">
          <span className="text-neutral-700">⚡</span> Filters
        </h2>
        <button
          onClick={clearAll}
          className="text-red-800 dark:text-red-400 text-sm hover:underline cursor-pointer"
        >
          CLEAR ALL
        </button>
      </div>

      {filtersData.map(({ title, items }) => {
        const isOpen = expandedSections.includes(title);
        const visibleCount = visibleCounts[title] ?? 6;
        const showToggle = items.length > 6;

        return (
          <div key={title} className="border-t border-neutral-700 pt-4 ">
            <div
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={() => toggleSection(title)}
            >
              <h3 className="text-sm font-montserrat-regular">{title}</h3>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="space-y-2 "
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {items.slice(0, visibleCount).map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-400  cursor-pointer text-outfit-regular"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox accent-blue-700"
                      />
                      {item.label}{" "}
                      <span className="text-gray-500">({item.count})</span>
                    </label>
                  ))}

                  {showToggle && (
                    <button
                      onClick={() => toggleShowMore(title, items.length)}
                      className="text-neutral-800 dark:text-neutral-500 text-sm hover:underline cursor-pointer"
                    >
                      {visibleCount === 6 ? "Show more" : "Show less"}
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.aside>
  );
}
