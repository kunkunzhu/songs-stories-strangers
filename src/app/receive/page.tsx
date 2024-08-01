/** @format */

import Card from "@/components/card";
import Spark from "@/components/spark";
import { SongDisplay } from "@/components/vinyl";
import { sampleDisplaySong } from "@/lib/examples";

export default function ReceiveView() {
  return (
    <main>
      <div>
        <Card>
          <div className="flex h-full w-full">
            <SongDisplay song={sampleDisplaySong} />
          </div>
        </Card>
        <div className="flex justify-center items-center -mb-20 mt-20">
          <Spark href="/" />
        </div>
      </div>
    </main>
  );
}
