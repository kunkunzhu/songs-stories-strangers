/** @format */

import Card from "@/components/card";
import { TapeLabel } from "@/components/cassette";
import { TitleInput } from "@/components/input";
import Spark from "@/components/spark";

export default function SendViewStepOne() {
  return (
    <>
      <Card className="flex flex-col gap-4">
        <TapeLabel index={1} text="what is a song that is meaningful to you?" />
        <TitleInput />
      </Card>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/send/step-two" />
      </div>
    </>
  );
}
