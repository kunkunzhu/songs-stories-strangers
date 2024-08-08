/** @format */

import { ReactNode } from "react";

export type ComponentPropsType = {
  className?: string;
  children: ReactNode;
};

export interface ModalPropsType extends ComponentPropsType {
  onClose: any;
  title: string;
}

export type SearchParamsType = {
  [key: string]: string | string[] | undefined;
};

export interface Song {
  songId: string;
  title: string;
  artist: string;
  playURL?: string;
}

export interface DisplaySong extends Song {
  story: string;
}
