/** @format */

import { CSSProperties } from "react";

export default function TestView() {
  return (
    <div
      style={
        {
          "--background": "255 255 255 0.3",
          "--highlight": "255 255 255",

          "--bg-color":
            "linear-gradient(rgba(255, 255, 255), rgba(255, 255, 255))",
          "--border-color": `linear-gradient(145deg,
              rgb(var(--highlight)) 0%,
              rgb(var(--highlight) / 0.3) 33.33%,
              rgb(var(--highlight) / 0.14) 66.67%,
              rgb(var(--highlight) / 0.1) 100%)
              `,
        } as CSSProperties
      }
      className="flex aspect-[2/1] w-full max-w-md flex-col items-center justify-center rounded-xl border border-transparent p-8 text-center [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
    >
      HELLO
    </div>
  );
}
