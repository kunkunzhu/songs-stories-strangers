/** @format */
"use client";

import Card from "@/components/card";
import { TapeLabel } from "@/components/cassette";
import { InputLabel, TextInput } from "@/components/input";
import Spark from "@/components/spark";
import useSongStore from "@/store/song";

export default function SendViewStepTwo() {
  const { song, story, writeStory } = useSongStore();

  return (
    <>
      <Card className="flex flex-col gap-4">
        <TapeLabel index={2} text="what is the story behind it?" />
        <TextInput
          placeholder="write about why this song is meaningful to you."
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            writeStory(e.currentTarget.value);
          }}
        />
        <div
          className="flex justify-end"
          onClick={() => {
            console.log(song);
            console.log(story);
          }}
        >
          <InputLabel
            name="→"
            className="text-2xl bg-opacity-0 hover:bg-opacity-50 hover:drop-shadow-vinyl"
          />
        </div>
      </Card>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/receive" />
      </div>
    </>
  );
}
