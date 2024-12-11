/** @format */

import { useState } from "react";
import { v4 } from "uuid";
import { Song } from "@/types";
import { ButtonLabel, InputLabel, TitleInput } from "./input";

export const SongForm = ({ setSong }: { setSong: any }) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [link, setLink] = useState<string | undefined>(undefined);
  const [artistDisplay, toggleArtistDisplay] = useState<boolean>(false);
  const [linkDisplay, toggleLinkDisplay] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const submitSong = () => {
    // form submission not working ?! (workaround solution)

    setError(false);
    const randomId = v4();

    if (!title || !artist || !link) {
      setError(true);
    } else {
      const song: Song = {
        songId: randomId,
        title: title,
        artist: artist,
        playURL: link,
      };
      console.log(song);
      setSong(song);
    }
  };

  return (
    <form name="song" className="flex flex-col gap-4" onSubmit={submitSong}>
      <div className="flex justify-between gap-4">
        <InputLabel name="title" className="hidden md:block" />
        <TitleInput
          name="title"
          placeholder="what is the song called?"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
        />
      </div>
      {title && artistDisplay ? (
        <div className="flex justify-between gap-4">
          <InputLabel name="artist" className="hidden md:block" />
          <TitleInput
            name="artist"
            placeholder="who created this song?"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setArtist(e.currentTarget.value)
            }
          />
        </div>
      ) : (
        <>
          {title && (
            <div onClick={() => toggleArtistDisplay(true)}>
              <InputLabel
                name="→"
                className="bg-opacity-0 text-xl hover:bg-opacity-50"
              />
            </div>
          )}
        </>
      )}
      {title && artist && artistDisplay && (
        <>
          {linkDisplay ? (
            <div className="flex justify-between gap-4">
              <InputLabel name="sample" className="hidden md:block" />
              <TitleInput
                name="sample"
                placeholder="(please make sure it's a URL to a valid MP3 file)"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLink(e.currentTarget.value)
                }
              />
            </div>
          ) : (
            <>
              {artist && (
                <div onClick={() => toggleLinkDisplay(true)}>
                  <InputLabel name="→" className="text-xl bg-opacity-0" />
                </div>
              )}
            </>
          )}
        </>
      )}
      {link && (
        <div className="flex justify-end">
          {error && (
            <div className="text-red-300 m-auto">
              please make sure no field is empty before submitting (｡•́︿•̀｡)
            </div>
          )}
          <ButtonLabel
            name="submit"
            className="bg-opacity-25 font-mono md:text-xs p-2 bg-black"
          />
        </div>
      )}
    </form>
  );
};
