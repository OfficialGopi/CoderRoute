import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Link } from "react-router-dom";

const SearchArea = ({
  isSerchModalOpen,
  setSearchModalOpen,
  searchQuery,
  setSearchQuery,
}: {
  isSerchModalOpen: boolean;
  setSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSearchQuery(e.currentTarget.search.value);
  //   setSearchResults([]);
  // };

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchResults([
        {
          id: 1,
          title: "Problem 1",
          description: "Description of problem 1",
          tags: ["tag1", "tag2"],
          difficulty: "EASY",
        },
        {
          id: 2,
          title: "Problem 2",
          difficulty: "MEDIUM",
          description: "Description of problem 2",
          tags: ["tag1", "tag2"],
        },
        {
          id: 3,
          title: "Problem 3",
          difficulty: "HARD",
          description: "Description of problem 3",
          tags: ["tag1", "tag2"],
        },
      ]);
    }
  }, [searchQuery]);

  return (
    <Modal
      fromPosition="top-right"
      variant="center"
      isOpen={isSerchModalOpen}
      onClose={() => setSearchModalOpen(false)}
      className="bg-white dark:bg-neutral-950 rounded-xl shadow-lg w-full max-w-md  border font-montserrat-regular   z-[1000000]"
      title="Search for a problem"
    >
      <div className="px-4 border-b mt-3">
        <input
          placeholder="Search"
          className="outline-none w-full text-neutral-900 dark:text-neutral-100 bg-transparent pb-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="py-2 w-full text-neutral-400  flex flex-col items-center">
        {searchResults.length === 0 && (
          <span className="text-sm ">No results found</span>
        )}
        {searchResults.map((result) => (
          <Link
            to={`/problems/${result.id}`}
            key={result.id}
            className="flex items-center gap-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors w-full px-2"
            onClick={() => setSearchModalOpen(false)}
          >
            <div className="flex-1 flex items-center gap-2">
              <span className="text-sm font-bold ">{result.title}</span>
              <div className="flex items-center gap-2 text-sm">
                {result.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`text-sm  font-bold ${result.difficulty === "EASY" ? "text-green-600 dark:text-green-400" : result.difficulty === "MEDIUM" ? "text-yellow-400" : "text-red-400"}`}
            >
              {result.difficulty}
            </div>
            <div className="flex items-center gap-2">
              <span>View</span>
              <span className="text-neutral-500">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </Modal>
  );
};

export default SearchArea;
