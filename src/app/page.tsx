/** @format */

import Card from "@/components/card";
import { TapeLink, TapeReels } from "@/components/cassette";
import Spark from "@/components/spark";

export default function Home() {
  return (
    <main>
      <div>
        <div className="py-4 px-2 md:border rounded-xl bg-white bg-opacity-0 md:bg-opacity-5 transition duration-300">
          <Card className="bg-opacity-5">
            <div className="flex flex-col gap-8 justify-between">
              <h1 className="font-mono text-4xl text-center md:text-start md:text-2xl italic flex justify-center opacity-75">
                songs / stories / strangers
              </h1>
              <TapeReels />
              <div className="flex flex-col md:flex-row mx-auto w-4/5 h-10 md:w-5/6 gap-2 md:justify-between">
                <TapeLink
                  className="justify-center md:justify-end rounded-full md:rounded-r-none drop-shadow-tape-reel"
                  href="/send/step-one"
                  text="send"
                />
                <TapeLink
                  className="justify-center md:justify-start rounded-full md:rounded-l-none drop-shadow-tape-reel"
                  href="/receive"
                  text="receive"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/about" state="start" />
      </div>
    </main>
  );
}
