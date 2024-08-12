/** @format */

import Card from "@/components/card";
import Spark from "@/components/spark";

export default function SendViewCompleteView() {
  return (
    <>
      <Card className="flex flex-col justify-between">
        <div className="flex flex-col justify-center text-center mx-auto gap-20 h-full">
          <div className="text-2xl font-mono">
            Thank you for sending in your story!
          </div>
          <div className="flex justify-center">
            <Spark href="/" />
          </div>
        </div>
      </Card>
      <div className="flex justify-center -mb-20 mt-20"></div>
    </>
  );
}
