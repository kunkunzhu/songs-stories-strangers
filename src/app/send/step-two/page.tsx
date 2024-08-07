/** @format */
"use client";

import Card from "@/components/card";
import { TapeLabel } from "@/components/cassette";
import { InputLabel, TextInput } from "@/components/input";
import Spark from "@/components/spark";
import { cn } from "@/lib/utils";
import useSongStore from "@/store/song";
import { useState } from "react";

export default function SendViewStepTwo() {
  const { song, story, writeStory } = useSongStore();
  const [error, setError] = useState(false);

  return (
    <>
      <Card className="flex flex-col gap-4">
        <TapeLabel index={2} text="what is the story behind it?" />
        <TextInput
          error={error}
          placeholder="write about why this song is meaningful to you. (25 words min)"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setError(false);
            writeStory(e.currentTarget.value);
          }}
        />
        <div
          className="flex justify-end"
          onClick={() => {
            if (!error) {
              const wordCount = story.split(" ").length;
              console.log("words count: ", wordCount);
              if (wordCount <= 25) {
                setError(true);
              } else {
                // submit (taken to receive step ?!)
                console.log(song);
                console.log(story);
              }
            }
          }}
        >
          <InputLabel
            name={
              error
                ? "please write at least 25 words for your story (ง •̀_•́)ง"
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
      </Card>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/receive" />
      </div>
    </>
  );
}
