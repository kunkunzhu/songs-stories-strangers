/** @format */
"use client";

import Card from "@/components/card";
import { InputLabel } from "@/components/input";
import { SongDisplay } from "@/components/vinyl";
import { sampleDisplaySong } from "@/lib/examples";
import { receiveSong } from "@/services/songs";
import { DisplaySong } from "@/types";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { TapeLink } from "@/components/cassette";

const ReceiveViewTemp = () => {
  return (
    <div className="flex flex-col gap-4 text-xl mx-auto my-auto align-middle text-left">
      <div>
        u are here early ... <br />
        pls go send a song instead to help populate the database ദ്ദി ( ᵔ ᗜ ᵔ )
      </div>
      <Link href="/send/step-one">
        <InputLabel
          name="send a song"
          className="uppercase text-xl min-w-fit px-6 py-2 hover:drop-shadow-spark"
        />
      </Link>
    </div>
  );
};

export default function ReceiveView() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [song, setSong] = useState<DisplaySong>(sampleDisplaySong);

  useEffect(() => {
    const receiveSongFromDatabase = async () => {
      setLoading(true);
      try {
        const song: DisplaySong = await receiveSong();
        setLoading(false);
        setSong(song);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      } finally {
        setError(false);
        setLoading(false);
      }
    };
    receiveSongFromDatabase();
  }, []);

  return (
    <main>
      <div>
        <Card>
          <div className="flex h-full w-full">
            <div className="my-auto flex mx-auto">
              <BarLoader width={400} height={2} loading={loading} />
            </div>
            {!error && !loading && <SongDisplay song={song} />}
          </div>
        </Card>
        <div className="flex justify-center items-center -mb-20 mt-20">
          <TapeLink
            href="/send/step-one"
            text="send a song"
            className="rounded-full justify-center font-mono"
          />
        </div>
      </div>
    </main>
  );
}
