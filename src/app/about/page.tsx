/** @format */

import Card from "@/components/card";
import Spark from "@/components/spark";

export default function About() {
  return (
    <div>
      <Card>
        <h1 className="uppercase text-2xl font-mono pb-6">
          🎧 ABOUT THIS PROJECT:
        </h1>
        <div className="opacity-75 flex flex-col text-sm font-mono gap-4 pb-12">
          <span>
            I have vivid memories and emotions attached to certain songs. And
            you might, as well. This is a little web app where you can share a
            story about a song that is meaningful to you and, in return, read
            about a song that holds significance for a complete stranger.{" "}
          </span>
          <span>
            At the end of the day, we are connected by stories. I cherish the
            moments when we recognize pieces of ourselves in someone else’s
            story, even that of a complete stranger, and realize how we are all
            more connected than we think.
          </span>
        </div>
        <div className="flex w-full justify-en opacity-50">
          <span className="text-xs text-end">
            © Built by{" "}
            <a
              href="https://kunzhu.vercel.app/"
              target="_blank"
              className="underline"
            >
              Kun
            </a>
            , with the intention to amplify small moments of connection across
            the vast expanse of the internet 💌
          </span>
        </div>
      </Card>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/" state="finish" />
      </div>
    </div>
  );
}
