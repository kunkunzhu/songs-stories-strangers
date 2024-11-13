/** @format */
"use client";

import {
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
  resetSong,
  setQuery,
}: {
  name: string;
  placeholder: string;
  startTransition: TransitionStartFunction;
  resetSong: any;
  setQuery: any;
}) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    resetSong();

    let id = setTimeout(() => {
      startTransition(() => {
        setQuery(e.target.value);
      });
    }, 500);

    setTimeoutId(id);
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
  song,
  curSong,
  setSong,
}: {
  song: Song;
  curSong: Song | undefined;
  setSong: any;
}) => {
  return (
    <div
      onClick={() => setSong(song)}
      className={cn(
        "flex flex-col md:flex-row justify-between w-full px-4 py-2 font-mono bg-black bg-opacity-40 border-b",
        curSong == song && "border-2 rounded-lg bg-opacity-75"
      )}
    >
      <div className="max-w-25 truncate text-xs md:text-md">{song.title}</div>
      <div className="opacity-75 text-xs md:text-md italic">{song.artist}</div>
    </div>
  );
};

export const SearchInputDisplay = () => {
  const router = useRouter();

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
        resetSong={() => setTempSong(undefined)}
        setQuery={setQuery}
      />
      <div className="py-2 flex flex-col gap-5">
        <LoadingBar isPending={isPending} />
        {searchRes && (
          <SongsSearchResultDisplay
            songs={searchRes}
            curSong={tempSong}
            setSong={setTempSong}
          />
        )}
        {tempSong ? (
          <div className="flex justify-between">
            <div className="flex my-auto font-mono rounded-full border text-sm md:text-md px-4 py-2 max-w-25 bg-black bg-opacity-40 truncate">
              {tempSong.title}
            </div>
            <div
              onClick={() => {
                chooseSong(tempSong);
                router.push("/send/step-two/write");
              }}
            >
              <InputLabel
                name="→"
                className="text-2xl h-[40px] bg-opacity-0 min-w-fit hover:bg-opacity-50"
              />
            </div>
          </div>
        ) : (
          <div className="flex rl md:flex-row justify-end text-xs opacity-50">
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
        )}
      </div>
    </>
  );
};

export const SongsSearchResultDisplay = ({
  songs,
  curSong,
  setSong,
}: {
  songs: Song[];
  curSong: Song | undefined;
  setSong: any;
}) => {
  return (
    <div className="flex flex-col border rounded-lg overflow-y-scroll -mt-10 max-h-[50px] md:max-h-[125px]">
      {songs.map((song, index) => (
        <div key={index}>
          <SongSearchResult song={song} curSong={curSong} setSong={setSong} />
        </div>
      ))}
    </div>
  );
};
