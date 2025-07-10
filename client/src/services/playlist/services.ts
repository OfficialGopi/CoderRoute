import { fetchApi } from "../../utils/FetchApi";

class PlaylistServices {
  private playlistFetch;

  constructor() {
    this.playlistFetch = fetchApi.init("/playlist");
  }

  // ✅ Create a new playlist
  public async createPlaylist({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) {
    return await this.playlistFetch("/create-playlist", "POST", {
      name,
      description,
    });
  }

  // ✅ Get all playlist details for the logged-in user
  public async getAllPlaylistDetails() {
    return await this.playlistFetch("/get-all-playlist-details", "POST");
  }

  // ✅ Get a single playlist's details by ID
  public async getPlaylistDetailsById(playlistId: string) {
    return await this.playlistFetch(
      `/get-playlist-details/${playlistId}`,
      "GET",
    );
  }

  // ✅ Add problems to a playlist
  public async addProblemsToPlaylist({
    playlistId,
    problemIds,
  }: {
    playlistId: string;
    problemIds: string[];
  }) {
    return await this.playlistFetch(
      `/add-problem-to-playlist/${playlistId}`,
      "POST",
      {
        problemIds,
      },
    );
  }

  // ✅ Delete a playlist
  public async deletePlaylist(playlistId: string) {
    return await this.playlistFetch(`/delete-playlist/${playlistId}`, "DELETE");
  }

  // ✅ Remove problems from a playlist
  public async removeProblemsFromPlaylist({
    playlistId,
    problemIds,
  }: {
    playlistId: string;
    problemIds: string[];
  }) {
    return await this.playlistFetch(
      `/remove-problem-from-playlist/${playlistId}`,
      "DELETE",
      {
        problemIds,
      },
    );
  }
}

const playlistServices = new PlaylistServices();
export { playlistServices };
