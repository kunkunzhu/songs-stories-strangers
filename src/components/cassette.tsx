/** @format */
import { cn } from "@/lib/utils";
import Link from "next/link";

type TapeLinkPropsType = {
  href: string;
  text: string;
  className: string;
};

const TapeReelCircles = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-black border bg-black bg-opacity-10 ",
        className
      )}
    >
      {text}
    </div>
  );
};

export const TapeReels = () => {
  return (
    <div className="border rounded-full bg-black bg-opacity-50 mx-auto h-fit w-2/3 flex flex-col justify-center p-5">
      <div className="flex flex-row justify-between">
        <TapeReelCircles className="size-20" />
        <TapeReelCircles className="size-20" />
      </div>
    </div>
  );
};

export const TapeLink = ({ href, text, className }: TapeLinkPropsType) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex border w-1/2 h-fit px-5 py-4 font-mono tracking-wider bg-black bg-opacity-20 text-lg hover:bg-opacity-50",
        className
      )}
    >
      {text}
    </Link>
  );
};

export const TapeLabel = ({ index, text }: { index: number; text: string }) => {
  return (
    <div className="border rounded-full items-center flex justify-between p-2 pr-8 bg-black bg-opacity-20 ">
      <TapeReelCircles text={index.toString()} className="size-10" />
      <div className="font-mono">{text}</div>
    </div>
  );
};
