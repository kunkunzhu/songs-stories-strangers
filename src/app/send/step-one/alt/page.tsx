/** @format */
"use client";

import { SongForm } from "@/components/form";
import { useState } from "react";
import { Song } from "@/types";
import { InputSongDisplay } from "@/components/vinyl";
import useSongStore from "@/store/song";

export default function SendViewAltStepOne() {
  const [tempSong, setTempSong] = useState<Song | undefined>(undefined);
  const { chooseSong } = useSongStore();

  return (
    <>
      {tempSong ? (
        <InputSongDisplay
          song={tempSong}
          href="/send/step-two"
          chooseSong={chooseSong}
        />
      ) : (
        <SongForm setSong={setTempSong} />
      )}
    </>
  );
}
