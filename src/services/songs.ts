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
}

export const searchSongs = async ({
  query,
}: searchSongProps): Promise<Song[] | undefined> => {
  const authToken = await getAuth();

  if (authToken) {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/search/?" +
          new URLSearchParams({
            q: query,
            type: "track",
            limit: "10",
          }),
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to search song");
        return undefined;
      }

      const songsResponse = await response.json();

      let songs: Song[] = [];
      songsResponse.tracks.items.map((item: any) => {
        const song: Song = {
          songId: item.id,
          title: item.name,
          artist: item.artists[0].name,
          playURL: item.preview_url,
        };

        songs.push(song);
      });

      return songs;
    } catch (e) {
      console.error("Error searching song:", e);
      return undefined;
    }
  } else {
    console.error(
      "API authentication session expired. Please refresh the app."
    );
    return undefined;
  }
};

export const getSong = async ({ trackId, setError }: getSongProps) => {
  const authToken = await getAuth();

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
        console.error("Failed to fetch song");
        setError(true);
        return undefined;
      }

      const songResponse = await response.json();

      const song: Song = {
        title: songResponse.name,
        artist: songResponse.artists[0].name,
        playURL: songResponse.external_urls.spotify,
        songId: songResponse.id,
      };

      return song;
    } catch (e) {
      console.error("Error fetching song:", e);
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
    const seed = Math.random();

    const response = await fetch(`/api/receive-song?seed=${seed}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.song;
  } catch (error) {
    console.error("Error fetching random song:", error);
    return null;
  }
};
