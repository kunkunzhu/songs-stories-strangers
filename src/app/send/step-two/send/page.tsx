/** @format */

"use client";

import { InputLabel } from "@/components/input";
import Modal from "@/components/modal";
import { InputSongSend } from "@/components/vinyl";
import { useRouter } from "next/navigation";
import useSongStore from "@/store/song";
import Link from "next/link";
import { useState } from "react";
import { sendSong } from "@/services/songs";

export default function SendViewStepTwoSend() {
  const router = useRouter();

  const { song, story } = useSongStore();
  const [storyModal, showStoryModal] = useState<boolean>(false);

  if (!song || !story) {
    // error-handling
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

      <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between">
        <Link href="/send/step-two/write" className="h-full flex w-full">
          <InputLabel
            name="← edit"
            className="text-xl py-1 pr-10 uppercase w-full md:w-1/2 md:justify-end bg-opacity-20 hover:bg-opacity-50 hover:drop-shadow-letter"
          />
        </Link>
        <div
          onClick={() => sendSongToDatabase()}
          className="h-full flex w-full"
        >
          <InputLabel
            name="send →"
            className="text-xl py-1 pr-10 uppercase w-full justify-end bg-opacity-20 hover:bg-opacity-50 hover:drop-shadow-letter"
          />
        </div>
      </div>
    </div>
  );
}
