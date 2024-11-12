/** @format */

import Card from "@/components/card";
import { TapeLink } from "@/components/cassette";

export default function SendViewCompleteView() {
  return (
    <>
      <Card className="flex flex-col justify-between">
        <div className="flex flex-col justify-center text-center mx-auto gap-8 h-full">
          <div className="text-2xl font-mono">
            Thank you for sending in your story!
          </div>
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
      <div className="flex justify-center -mb-20 mt-20"></div>
    </>
  );
}
