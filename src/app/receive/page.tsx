/** @format */

import Card from "@/components/card";
import Spark from "@/components/spark";
import { SongDisplay } from "@/components/vinyl";

const sampleSong = {
  title: "vampires",
  artist: "tommy lefroy",
  story:
    "if i could send a song back in time as a message to my younger self, i think this might be it. “i just want for you to love your life. i just want for you to not think twice - when somebody asks if you've been doing alright.” back then i worried so endlessly and felt everything so intensely. when i looked into the future sometimes it felt like i was staring into a blackhole. but still, everything eventually turns out alright.",
  coverURL: "/vampire.jpeg",
};

export default function Home() {
  return (
    <main>
      <div>
        <Card>
          <div className="flex h-full w-full">
            <SongDisplay song={sampleSong} />
          </div>
        </Card>
        <div className="flex justify-center items-center -mb-20 mt-20">
          <Spark href="/" />
        </div>
      </div>
    </main>
  );
}
