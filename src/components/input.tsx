/** @format */
"use client";

import {
  Suspense,
  TransitionStartFunction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Song } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useSongStore from "@/store/song";
import Modal from "./modal";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { searchSongs } from "@/services/songs";

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
        "border rounded-full py-1 md:py-2 px-4 bg-white text-sm md:text-base w-full text-black",
        className
      )}
    />
  );
};

export const SearchTitleInput = ({
  name,
  placeholder,
  startTransition,
  setQuery,
}: {
  name: string;
  placeholder: string;
  startTransition: TransitionStartFunction;
  setQuery: any;
}) => {
  const router = useRouter();
  const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
    startTransition(() => {
      setQuery(e.currentTarget.value);
    });
  };
  return (
    <>
      <TitleInput name={name} placeholder={placeholder} onChange={onSearch} />
    </>
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
        "flex flex-col w-1/2 md:w-1/5 bg-black font-mono text-sm bg-opacity-50 border justify-center items-center text-center my-auto p-4 rounded-full",
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

export const LoadingBar = ({ isPending = false }: { isPending?: boolean }) => {
  return (
    <div className="flex justify-end">
      <BarLoader width={300} loading={isPending} />
    </div>
  );
};

const SongSearchResult = ({
  title,
  artist,
  key,
}: {
  title: string;
  artist: string;
  key: number;
}) => {
  return (
    <div
      key={key}
      className="flex justify-between w-full px-4 py-2 font-mono bg-black bg-opacity-25 border-b"
    >
      <div className="max-w-25 truncate">{title}</div>
      <div className="opacity-75">{artist}</div>
    </div>
  );
};

export const SearchInputDisplay = () => {
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState<string>("");
  const [searchRes, setSearchRes] = useState<Song[] | undefined>(undefined);
  const [tempSong, setTempSong] = useState<Song | undefined>(undefined);
  const [tutorial, showTutorial] = useState<boolean>(false);
  const { chooseSong } = useSongStore();

  const fetchSongs = useCallback(async (query: string) => {
    const songs = await searchSongs({ query });
    setSearchRes(songs);
  }, []);

  useEffect(() => {
    fetchSongs(query).catch(console.error);
  }, [query, fetchSongs]);

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
      <SearchTitleInput
        name="song"
        placeholder="Search by track title..."
        startTransition={startTransition}
        setQuery={setQuery}
      />
      <div className="py-2 flex flex-col gap-5">
        <LoadingBar isPending={isPending} />
        {searchRes && <SongsSearchResultDisplay songs={searchRes} />}
        <div className="flex md:flex-row justify-end text-xs opacity-50">
          <div>
            can&apos;t find the song you are looking for?&nbsp;
            <Link
              className="rounded-full border hover:bg-black px-2"
              href="/send/step-one/alt-manual"
            >
              add it manually
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const SongsSearchResultDisplay = ({ songs }: { songs: Song[] }) => {
  return (
    <div className="flex flex-col border rounded-lg overflow-y-scroll -mt-10 max-h-[16vh]">
      {songs.map((song, index) => (
        <SongSearchResult title={song.title} artist={song.artist} key={index} />
      ))}
    </div>
  );
};
