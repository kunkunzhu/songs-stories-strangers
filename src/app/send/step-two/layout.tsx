/** @format */

import Card from "@/components/card";
import { TapeLabel } from "@/components/cassette";
import Spark from "@/components/spark";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Card className="flex flex-col justify-between">
        <div className="flex flex-col gap-4 h-full">
          <TapeLabel index={2} text="what is the story behind it?" />
          {children}
        </div>
      </Card>
      <div className="flex justify-center -mb-20 mt-20">
        <Spark href="/receive" />
      </div>
    </>
  );
}
