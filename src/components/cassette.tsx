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

export const TapeReels = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn(
        "border rounded-full bg-black bg-opacity-50 mx-auto h-fit w-full drop-shadow-tape-reel md:w-2/3 flex flex-col justify-center p-2 md:p-5",
        className
      )}
    >
      <div className="flex flex-row justify-between">
        <TapeReelCircles className="size-8 md:size-20" />
        <TapeReelCircles className="size-8 md:size-20" />
      </div>
    </div>
  );
};

export const TapeLink = ({ href, text, className }: TapeLinkPropsType) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex border w-full md:w-1/2 h-fit px-5 py-2 md:py-4 font-mono tracking-wider bg-black bg-opacity-20 text-2xl md:text-lg hover:bg-opacity-50",
        className
      )}
    >
      {text}
    </Link>
  );
};

export const TapeLabel = ({ index, text }: { index: number; text: string }) => {
  return (
    <div className="border text-sm md:text-base rounded-lg md:rounded-full items-center flex flex-col md:flex-row justify-between px-4 py-2 md:px-2 md:pr-8 bg-black bg-opacity-20 drop-shadow-tape-reel">
      <TapeReelCircles text={index.toString()} className="size-5 md:size-10" />
      <div className="font-mono">{text}</div>
    </div>
  );
};
