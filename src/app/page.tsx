/** @format */

import Card from "@/components/card";
import { TapeLink, TapeReels } from "@/components/cassette";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <div className="py-4 px-2 border rounded-xl bg-white bg-opacity-5">
          <Card className="bg-opacity-5">
            <div className="flex flex-col gap-8 justify-between">
              <h1 className="font-mono text-2xl italic flex justify-center opacity-75">
                songs, stories, strangers
              </h1>
              <TapeReels />
              <div className="flex flex-row mx-auto h-10 w-5/6 gap-2 justify-between">
                <TapeLink
                  className="justify-end rounded-l-full"
                  href="/send/step-one"
                  text="send"
                />
                <TapeLink
                  className="justify-start rounded-r-full"
                  href="/receive"
                  text="receive"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
