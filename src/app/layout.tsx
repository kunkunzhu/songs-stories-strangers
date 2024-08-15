/** @format */

import type { Metadata } from "next";
import { Yantramanav, Xanh_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const bodyFont = Yantramanav({
  subsets: ["latin"],
  variable: "--body-font",
  weight: "300",
});

const displayFont = Xanh_Mono({
  subsets: ["latin"],
  variable: "--display-font",
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "songs / stories / strangers",
  description:
    "send a song that is meaningful to you and receive a song from a stranger in return.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans flex w-screen h-screen flex-col justify-center items-center",
          bodyFont.variable,
          displayFont.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
