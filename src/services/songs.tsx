/** @format */

import { Song } from "@/types";
import { getAuth } from "./auth";

interface getSongProps {
  trackId: string;
  setError: any;
}

export const getSong = async ({ trackId, setError }: getSongProps) => {
  const authToken = await getAuth();

  console.log("authToken", authToken);

  if (authToken) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Failed to fetch song");
        setError(true);
        return undefined;
      }

      const songResponse = await response.json();
      console.log(songResponse);
      const song: Song = {
        title: songResponse.name,
        artist: songResponse.artists[0].name,
        playURL: songResponse.external_urls.spotify,
        id: songResponse.id,
      };

      return song;
    } catch (e) {
      console.log("Error fetching song:", e);
      return undefined;
    }
  }
};
