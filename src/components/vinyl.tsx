/** @format */

import Image from "next/image";
import { DisplaySong, Song } from "@/types";
import { InputLabel } from "./input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const SongVinyl = ({ title }: { title: string }) => {
  return (
    <div className="flex mx-auto items-center justify-center border border-gray-200/50 rounded-full w-[175px] h-[175px] md:w-[250px] md:h-[250px] bg-black hover:vinyl-spin">
      <div className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] border border-gray-200/50 drop-shadow-vinyl rounded-full overflow-hidden">
        <Image
          src="/vinyl.png"
          width={100}
          height={100}
          alt={`cover art for ${title}`}
        />
      </div>
    </div>
  );
};

export const StoryCard = ({
  story,
  className = "",
}: {
  story: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "border h-full rounded-lg py-2 px-4 text-xs mt-2 md:mt-8 overflow-y-scroll bg-white bg-opacity-20",
        className
      )}
    >
      {story}
    </div>
  );
};

export const SongPreviewCard = ({
  title,
  artist,
  story,
}: {
  title: string;
  artist: string;
  story?: string;
}) => {
  return (
    <div className="flex flex-col border rounded-lg bg-white bg-opacity-20">
      <div className="flex flex-col font-mono text-end">
        <div className="text-2xl max-w-100 truncate text-green-50">{title}</div>
        <div className="text-sm opacity-75 after:italic">{artist}</div>
      </div>
      {story && <StoryCard story={story} className="max-w-[300px]" />}
    </div>
  );
};

export const SongDescriptionCard = ({
  title,
  artist,
  story,
}: {
  title: string;
  artist: string;
  story?: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col font-mono justify-between text-center md:text-end md:border-b pb-2 md:pb-4">
        <div className="text-2xl max-w-50 md:max-w-[300px] truncate">
          {title}
        </div>

        <div className="text-sm opacity-75 after:italic">{artist}</div>
      </div>
      {story && (
        <StoryCard story={story} className="max-w-[300px] max-h-[175px]" />
      )}
    </div>
  );
};

export const SongDisplay = ({ song }: { song: DisplaySong }) => {
  const { title, artist, story, playURL } = song;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = ({ playURL }: { playURL: string }) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playURL);
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      console.error("WAAHHH", error);
    });
  };

  const stopPlayingSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col gap-2 md:gap-0 md:flex-row w-full justify-between">
      {song.playURL ? (
        <div
          onMouseEnter={() => playURL && playSong({ playURL })}
          onMouseLeave={() => stopPlayingSong()}
          className="group"
        >
          <SongVinyl title={title} />
          <div className="hidden group-hover:flex mt-2 w-fit mx-auto text-end transition-all bg-black opacity-20 rounded-full text-xs px-2 py-1">
            {title}
          </div>
        </div>
      ) : (
        <div>
          <SongVinyl title={title} />
          <div className="hidden group-hover:flex mt-2 w-fit mx-auto text-end transition-all bg-black opacity-20 rounded-full text-xs px-2 py-1">
            {title}
          </div>
        </div>
      )}

      <SongDescriptionCard title={title} artist={artist} story={story} />
    </div>
  );
};

export const InputSongBase = ({
  song,
  imageNode,
  className = "",
}: {
  song: Song;
  imageNode: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-full border bg-black bg-opacity-50 flex flex-col md:flex-row p-1 md:p-2 md:mx-2 md:justify-between w-full md:w-fit mx-auto md:gap-20",
        className
      )}
    >
      {imageNode}
      <div className="md:mr-8 mt-2 w-full md:w-[400px]">
        <SongDescriptionCard title={song.title} artist={song.artist} />
      </div>
    </div>
  );
};

export const InputSong = ({
  song,
  className = "",
}: {
  song: Song;
  className?: string;
}) => {
  const imageNode = (
    <div className="rounded-full hidden md:block min-w-[80px] border drop-shadow-vinyl overflow-hidden">
      <Image
        src="/vinyl.png"
        width={80}
        height={80}
        alt={`cover art for ${song.title}`}
      />
    </div>
  );

  return (
    <InputSongBase song={song} imageNode={imageNode} className={className} />
  );
};

export const InputSongSend = ({
  song,
  className = "",
  onClick,
}: {
  song: Song;
  className?: string;
  onClick: any;
}) => {
  const imageNode = (
    <div
      className="ml-4 h-fit hidden md:block hover:scale-110 hover:drop-shadow-letter transition-all"
      onClick={onClick}
    >
      <Image
        src="/letter.png"
        width={150}
        height={75}
        alt={`cover art for ${song.title}`}
      />
    </div>
  );
  return (
    <InputSongBase song={song} imageNode={imageNode} className={className} />
  );
};

export const InputSongDisplay = ({
  song,
  href,
  chooseSong,
}: {
  song: Song;
  href: string;
  chooseSong: any;
}) => {
  return (
    <div className="flex flex-col gap-10 md:gap-2">
      <InputSong song={song} />
      <Link
        className="flex justify-center md:justify-end md:mr-2"
        href={href}
        onClick={() => chooseSong(song)}
      >
        <InputLabel
          name="→"
          className="text-2xl bg-opacity-0 hover:bg-opacity-50 hover:drop-shadow-vinyl py-1"
        />
      </Link>
    </div>
  );
};
