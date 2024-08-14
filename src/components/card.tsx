/** @format */

"use client";

import { ComponentPropsType } from "@/types";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, children }: ComponentPropsType) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <>
      <div
        className="group relative p-4 border rounded-xl bg-white bg-opacity-5 drop-shadow-card"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
        radial-gradient(
          450px circle at ${mouseX}px ${mouseY}px,
          rgba(8, 1, 33, 0.3),
          transparent 50%
        )
      `,
          }}
        />
        <div
          className={cn(
            "w-[60vw] md:w-[40vw] bg-white bg-opacity-5 h-[50vh] md:h-[40vh] border rounded-xl p-6 md:p-12",
            className
          )}
        >
          {children}
        </div>
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
        radial-gradient(
          15px circle at ${mouseX}px ${mouseY}px,
          rgba(255, 255, 255, 0.2),
          transparent 80%
        )
      `,
          }}
        />
      </div>
    </>
  );
};

export default Card;
