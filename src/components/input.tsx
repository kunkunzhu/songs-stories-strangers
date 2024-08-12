/** @format */
"use client";

import { useState } from "react";
import { FormEvent } from "react";
import { getSong } from "@/services/songs";
import { Song } from "@/types";
import { InputSongDisplay } from "./vinyl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useSongStore from "@/store/song";
import Modal from "./modal";
import Image from "next/image";

interface InputProps {
  name: string;
  placeholder: string;
  onChange: any;
  className?: string;
}

export const TitleInput = ({
  name,
  placeholder,
  onChange,
  className,
}: InputProps) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={cn(
        "border rounded-full py-1 md:py-2 px-4 bg-white text-sm md:text-base w-full text-black md:w-4/5",
        className
      )}
    />
  );
};

export const SearchTitleInput = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  // const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  // const pathname = usePathname();
  // const router = useRouter();

  const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
    // clearTimeout(timeoutId);
    // let id = setTimeout(() => {
    //   startTransition(() => {
    //     let searchParams =
    //       e.currentTarget.value && `?search=${e.currentTarget.value}`;
    //     if (searchParams) {
    //       router.push(`${pathname}${searchParams}`);
    //     }
    //   });
    // }, 500);
    // setTimeoutId(id);
  };

  return (
    <TitleInput name={name} placeholder={placeholder} onChange={onSearch} />
  );
};

export const InputLabel = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-1/2 md:w-1/5 flex bg-black font-mono text-xs bg-opacity-50 border justify-center items-center rounded-full",
        className
      )}
    >
      {name}
    </div>
  );
};

export const ButtonLabel = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <button
      type="submit"
      className={cn(
        "w-1/2 md:w-1/5 border mx-auto md:mx-0 text-xl md:text-base rounded-full hover:bg-black",
        className
      )}
    >
      {name}
    </button>
  );
};

export const TextInput = ({
  onChange,
  placeholder,
  className = "",
  error = false,
}: {
  onChange: any;
  placeholder: string;
  className?: string;
  error?: boolean;
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={cn(
        "border h-full overflow-scroll resize-none w-full bg-white text-black py-2 px-4 text-sm rounded-lg",
        error && "placeholder-red-500",
        error && "border-red-500",
        className
      )}
      onChange={onChange}
    />
  );
};

export const SearchInputDisplay = () => {
  // TO DO: get song search functionality working

  const [tempSong, setTempSong] = useState<Song | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [tutorial, showTutorial] = useState<boolean>(false);
  const { chooseSong } = useSongStore();

  async function searchSong(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(false);
    const formData = new FormData(event.currentTarget);
    const trackId = formData.get("song") as string;
    if (!trackId) {
      setError(true);
    } else {
      const response = await getSong({ trackId, setError });
      setTempSong(response);
    }
  }

  return (
    <>
      {tutorial && (
        <Modal onClose={() => showTutorial(false)} title="track ID tutorial">
          <Link href="https://bit.ly/4djAOy3" target="_blank">
            <Image
              src="/trackID_tut.png"
              width={300}
              height={400}
              alt="tutorial"
            />
          </Link>
        </Modal>
      )}
      <form
        onSubmit={searchSong}
        name="song"
        className="flex flex-col md:flex-row justify-between gap-2"
      >
        <SearchTitleInput name="song" placeholder="paste track ID here" />
        <ButtonLabel name="submit" className="bg-white bg-opacity-10" />
      </form>
      <div className="py-2">
        {error && (
          <span className="px-12 opacity-75 md:text-xl">
            no song with this track ID is found (⋟﹏⋞) ...
          </span>
        )}
        {tempSong && !error ? (
          <InputSongDisplay
            song={tempSong}
            href="/send/step-two/write"
            chooseSong={() => chooseSong(tempSong)}
          />
        ) : (
          <div className="flex gap-4 flex-col md:flex-row justify-between text-xs opacity-50">
            <div>
              don&apos;t know how to find the track ID?{" "}
              <span
                className="rounded-full border hover:bg-black px-2"
                onClick={() => showTutorial(true)}
              >
                read tutorial
              </span>
            </div>

            <div>
              can&apos;t find the song you are looking for?&nbsp;
              <Link
                className="rounded-full border hover:bg-black px-2"
                href="/send/step-one/alt"
              >
                add it manually
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
