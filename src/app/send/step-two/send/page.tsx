/** @format */

"use client";

import Modal from "@/components/modal";
import { InputSongSend } from "@/components/vinyl";
import { useRouter } from "next/navigation";
import useSongStore from "@/store/song";
import Link from "next/link";
import { useState } from "react";
import { sendSong } from "@/services/songs";
import { InputLabel } from "@/components/input";

export default function SendViewStepTwoSend() {
  const router = useRouter();

  const { song, story } = useSongStore();
  const [storyModal, showStoryModal] = useState<boolean>(false);

  if (!song || !story) {
    return <div>NO SONG</div>;
  }

  const sendSongToDatabase = () => {
    const songToSend = {
      song: song,
      story: story,
    };
    sendSong(songToSend);
    router.push("/send/complete");
  };

  return (
    <div className="flex flex-col gap-6">
      {storyModal && (
        <Modal onClose={() => showStoryModal(false)} title="story preview">
          {story}
        </Modal>
      )}

      <InputSongSend
        song={song}
        className="rounded-l-none"
        onClick={() => showStoryModal(!storyModal)}
      />

      <div
        onClick={() => sendSongToDatabase()}
        className="h-full flex justify-end w-full"
      >
        <InputLabel
          name="send →"
          className="text-xl py-1 pr-10 uppercase w-full md:w-1/3 justify-end bg-opacity-20 hover:bg-opacity-50 hover:drop-shadow-letter"
        />
      </div>
    </div>
  );
}
