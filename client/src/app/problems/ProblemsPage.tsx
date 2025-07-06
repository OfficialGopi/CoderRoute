import { Star, Plus } from "lucide-react";
import { testProblems } from "../../seeds/ProblemsSeeds";
import { Modal } from "../../components/ui/Modal";
import { useState } from "react";
import { Tooltip } from "../../components/ui/Tooltip";
import { Link } from "react-router-dom";

// Dummy playlists (replace with real data from backend)
const dummyPlaylists = [
  { id: "1", name: "Dynamic Programming", total: 12 },
  { id: "2", name: "Graphs", total: 8 },
  { id: "3", name: "String Manipulation", total: 5 },
];

const ProblemsPage = () => {
  const [modalIsOpenForAddingPlaylist, setModalIsOpenForAddingPlaylist] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    null,
  );

  return (
    <>
      <div className="w-[1024px] pt-6 mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-red-100">Problems</h1>
        <div className="w-full bg-[#2a0000] rounded-3xl p-2">
          {testProblems.map((problem, index) => (
            <Link
              key={problem.id}
              to={`/problems/${problem.id}`}
              className={`w-full h-[50px] text-red-200 hover:text-white hover:cursor-pointer transition-colors p-4 flex items-center justify-between gap-2 rounded-xl ${
                index % 2 === 0 ? "bg-[#3a0000]" : ""
              }`}
            >
              <span>{problem.title}</span>
              <div className="flex gap-2">
                <span
                  className={`font-bold ${
                    problem.difficulty === "EASY"
                      ? "text-green-500"
                      : problem.difficulty === "MEDIUM"
                        ? "text-amber-400"
                        : "text-red-400"
                  }`}
                >
                  {problem.difficulty}
                </span>
                <button
                  onClick={() => {
                    setSelectedProblemId(problem.id);
                    setModalIsOpenForAddingPlaylist(true);
                  }}
                >
                  <Tooltip label="Add to Playlists">
                    <Star className="hover:text-red-50" />
                  </Tooltip>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpenForAddingPlaylist}
        onClose={() => setModalIsOpenForAddingPlaylist(false)}
        showClose={true}
        title="Add to Playlists"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base text-red-300">Your Playlists</h2>
            <Link
              to={"/playlists/create"}
              className="flex items-center gap-1 text-sm text-red-300 hover:text-white px-2 py-1 border border-red-800 rounded-lg"
            >
              <Plus size={16} />
              <span>Create New</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
            {dummyPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                className="flex hover:cursor-pointer justify-between items-center px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 transition-colors text-sm text-red-100 border border-red-800"
                onClick={() => {
                  // handle playlist click
                  console.log("Problem Id:", selectedProblemId);
                  console.log("Playlist clicked:", playlist);
                }}
              >
                <span>{playlist.name}</span>
                <span className="text-xs text-red-400">
                  {playlist.total} problems
                </span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProblemsPage;
