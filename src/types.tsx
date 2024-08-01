/** @format */

import { ReactNode } from "react";

export type ComponentPropsType = {
  className?: string;
  children: ReactNode;
};

export type SearchParamsType = {
  [key: string]: string | string[] | undefined;
};

export interface Song {
  id: string;
  title: string;
  artist: string;
  playURL?: string;
  cover: string | null;
}

export interface DisplaySong extends Song {
  displayCover: string | null;
  story: string;
}
