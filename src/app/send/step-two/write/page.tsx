/** @format */
"use client";

import { TapeLabel } from "@/components/cassette";
import { InputLabel, TextInput } from "@/components/input";
import { cn } from "@/lib/utils";
import useSongStore from "@/store/song";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SendViewStepTwoWrite() {
  const router = useRouter();

  const { song, writeStory } = useSongStore();
  const [tempStory, writeTempStory] = useState<string>("");
  const [error, setError] = useState(false);

  return (
    <>
      <TextInput
        error={error}
        placeholder="write about why this song is meaningful to you. (25 - 125 words)"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setError(false);
          writeTempStory(e.currentTarget.value);
        }}
      />
      <div
        className="flex justify-end"
        onClick={() => {
          if (!error) {
            const wordCount = tempStory ? tempStory.split(" ").length : 0;
            console.log("words count: ", wordCount);
            if (wordCount < 25 || wordCount > 125) {
              setError(true);
            } else {
              console.log(song);
              console.log(tempStory);
              router.push("/send/step-two/send");
              writeStory(tempStory);
            }
          }
        }}
      >
        <InputLabel
          name={
            error
              ? "please keep your story within word count (25 - 125 words) (ง •̀_•́)ง"
              : "→"
          }
          className={cn(
            "text-2xl h-[40px] bg-opacity-0",
            error && "text-xs",
            error && "w-full",
            error && "text-red-400",
            error && "border-red-400",
            !error && "hover:bg-opacity-50 hover:drop-shadow-vinyl"
          )}
        />
      </div>
    </>
  );
}
