/** @format */

import { Song } from "@/types";
import { create } from "zustand";

type songStoreType = {
  song: Song | undefined;
  story: string;
  chooseSong: (song: Song) => void;
  writeStory: (storyVal: string) => void;
  resetSong: () => void;
  resetStory: () => void;
};

const useSongStore = create<songStoreType>((set) => ({
  song: undefined,
  story: "",
  chooseSong: (songVal) => set({ song: songVal }),
  writeStory: (storyVal) => set({ story: storyVal }),
  resetSong: () => set({ song: undefined }),
  resetStory: () => set({ story: "" }),
}));

export default useSongStore;
