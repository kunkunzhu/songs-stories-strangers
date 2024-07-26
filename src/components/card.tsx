/** @format */

import { ComponentPropsType } from "@/types";
import { cn } from "@/lib/utils";

const Card = ({ className, children }: ComponentPropsType) => {
  return (
    <div className="p-4 border rounded-xl bg-white bg-opacity-5">
      <div
        className={cn(
          "w-[40vw] bg-white bg-opacity-5 h-[40vh] border rounded-xl p-12",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
