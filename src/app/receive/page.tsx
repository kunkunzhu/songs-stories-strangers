/** @format */

import Card from "@/components/card";
import { InputLabel } from "@/components/input";
import Spark from "@/components/spark";
import { SongDisplay } from "@/components/vinyl";
import { sampleDisplaySong } from "@/lib/examples";
import Link from "next/link";

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
          className="uppercase text-xl w-fit px-6 py-2 hover:drop-shadow-spark"
        />
      </Link>
    </div>
  );
};

export default function ReceiveView() {
  return (
    <main>
      <div>
        <Card>
          <div className="flex h-full w-full">
            {/* <SongDisplay song={sampleDisplaySong} /> */}
            {ReceiveViewTemp()}
          </div>
        </Card>
        <div className="flex justify-center items-center -mb-20 mt-20">
          <Spark href="/" />
        </div>
      </div>
    </main>
  );
}
