/** @format */
"use client";

import useFormStore from "@/store/form";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { FormEvent } from "react";
import { getSong } from "@/services/songs";
import { Song } from "@/types";
import { InputSong } from "./vinyl";
import Link from "next/link";

interface InputProps {
  name: string;
}

export const TitleInput = ({ name }: InputProps) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <input
      type="text"
      name={name}
      placeholder="paste track ID here"
      onChange={(e) => {
        clearTimeout(timeoutId);
        let id = setTimeout(() => {
          startTransition(() => {
            let searchParams = e.target.value && `?search=${e.target.value}`;
            if (searchParams) {
              router.push(`${pathname}${searchParams}`);
            }
          });
        }, 500);
        setTimeoutId(id);
      }}
      className="border rounded-full py-2 px-4 bg-white text-black w-4/5"
    />
  );
};

export const TextInput = () => {
  const { inputText, setInputText } = useFormStore();

  return (
    <textarea
      placeholder={inputText}
      onChange={(e) => {
        setInputText(e.target.value);
      }}
      className="border h-3/4 overflow-scroll resize-none w-full bg-white text-black py-2 px-4 text-xs rounded-lg"
    />
  );
};

export const SearchInputDisplay = () => {
  const [song, setSong] = useState<Song | undefined>(undefined);
  const [error, setError] = useState(false);

  async function searchSong(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const trackId = formData.get("song") as string;
    const response = await getSong({ trackId, setError });
    setSong(response);
    setError(false);
  }

  return (
    <>
      <form
        onSubmit={searchSong}
        name="song"
        className="flex justify-between gap-2"
      >
        <TitleInput name="song" />
        <button className="w-1/5 border rounded-full hover:bg-black">
          submit
        </button>
      </form>
      <div className="py-2">
        {error && (
          <span className="px-12 opacity-75 text-xl">
            no song with this track ID is found (⋟﹏⋞) ...
          </span>
        )}
        {song ? (
          <InputSong song={song} />
        ) : (
          <div className="flex justify-end text-xs opacity-50">
            can't find the song you are looking for?&nbsp;
            <Link
              className="rounded-full border hover:bg-black px-2"
              href="/send/step-one/alt"
            >
              add it manually
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
