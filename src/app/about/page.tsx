/** @format */

import Card from "@/components/card";
import Spark from "@/components/spark";

export default function About() {
  return (
    <div>
      <Card>
        <h1 className="uppercase text-2xl font-mono pb-4">
          🎧 ABOUT THIS PROJECT:
        </h1>
        <div className="opacity-75 flex flex-col text-xs font-mono gap-4 pb-6">
          <span>
            What song instantly takes you back to your childhood? What song
            reminds you of your best friend? What song did you have on-repeat
            the last time you fell in love?
          </span>
          <span>
            I have vivid memories and emotions attached to certain songs. And my
            hunch is that you might, as well. Here, you could send out a song
            that hold meaning to you and, in return, receive a song that holds
            meaning for a complete stranger.{" "}
          </span>
          <span>
            I created this app because in an age where the music discovery
            experience is largely dominated by algorithmic recommendations, it
            feels serendipitous to discover new music through learning about the
            songs that hold significance for someone else. And that, at the end
            of the day, we are all connected by stories. I cherish the moments
            when we recognize pieces of ourselves in someone else’s story, even
            that of a complete stranger, and realize how we are all more
            connected than we think.
          </span>
        </div>
        <div className="flex w-full opacity-25">
          <span className="text-[0.6rem] text-end">
            © Built by{" "}
            <a
              href="https://kunzhu.vercel.app/"
              target="_blank"
              className="underline"
            >
              Kun
            </a>
            , as a way of amplifying the serendipitous moments of connection
            across this vast expanse of internet 💌
          </span>
        </div>
      </Card>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/" state="finish" />
      </div>
    </div>
  );
}
