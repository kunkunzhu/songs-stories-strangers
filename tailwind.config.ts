/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      display: ["group-hover"],
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 90deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--body-font)"],
        mono: ["var(--display-font)"],
      },
      dropShadow: {
        card: "0 0 150px rgba(255, 255, 255, 0.5)",
        letter: "0 0 10px rgba(255, 255, 255, 0.4)",
        vinyl: "0 0 50px rgba(255, 255, 255, 0.4)",
        "tape-reel": "0 0 20px rgba(8, 1, 33, 0.7)",
        spark: "0 0 20px rgba(255, 255, 255, 0.6)",
        "spark-hover": "0 0 20px rgba(255, 255, 255, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
