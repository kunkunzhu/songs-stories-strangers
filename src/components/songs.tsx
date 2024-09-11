/** @format */

import { searchSongs } from "@/services/songs";

export const SongSearchResultDisplay = async ({ query }: { query: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const songs = await searchSongs({ query });
  console.log(songs);
  return <div>table</div>;
};
