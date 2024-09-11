/** @format */

import { Song } from "@/types";
import { getAuth } from "./auth";

interface getSongProps {
  trackId: string;
  setError: any;
}

interface sendSongProps {
  song: Song;
  story: string;
}

interface searchSongProps {
  query: string;
  // setSong: any,
  // setLoading: any
}

export const searchSongs = async ({
  query,
}: // setSong,
// setLoading,
searchSongProps) => {
  const authToken = await getAuth();
  if (authToken) {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/search/?" +
          new URLSearchParams({
            q: query,
            type: "track",
          }),
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Failed to search song");
        return undefined;
      }

      const songsResponse = await response.json();
      console.log(songsResponse);
    } catch (e) {
      console.log("Error searching song:", e);
      return undefined;
    }
  }
};

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
        songId: songResponse.id,
      };

      return song;
    } catch (e) {
      console.log("Error fetching song:", e);
      return undefined;
    }
  }
};

export const sendSong = async ({ song, story }: sendSongProps) => {
  fetch("/api/add-song", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      songId: song.songId,
      title: song.title,
      artist: song.artist,
      playURL: song.playURL,
      story: story,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const receiveSong = async () => {
  try {
    const response = await fetch("/api/receive-song");
    const data = await response.json();
    if (response.ok) {
      return data.song;
    } else {
      console.error(data.error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching random song:", error);
    return null;
  }
};
