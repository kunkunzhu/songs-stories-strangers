/** @format */
import Card from "@/components/card";
import { TapeLabel } from "@/components/cassette";
import { TextInput } from "@/components/input";
import Spark from "@/components/spark";

export default function SendViewStepTwo() {
  return (
    <>
      <Card className="flex flex-col gap-4">
        <TapeLabel index={2} text="what is the story behind it?" />
        <TextInput />
      </Card>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/receive" />
      </div>
    </>
  );
}
