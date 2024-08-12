/** @format */

import Image from "next/image";
import { DisplaySong, Song } from "@/types";
import { InputLabel } from "./input";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SongVinyl = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center border border-gray-200/50 rounded-full w-[250px] h-[250px] bg-black">
      <div className="w-[100px] h-[100px] border border-gray-200/50 drop-shadow-vinyl rounded-full overflow-hidden">
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
        "border h-full rounded-lg py-2 px-4 text-xs mt-8 overflow-y-scroll bg-white bg-opacity-20",
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

const SongDescriptionCard = ({
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
        <div className="text-2xl max-w-50 md:max-w-100 truncate text-green-50">
          {title}
        </div>
        <div className="text-sm opacity-75 after:italic">{artist}</div>
      </div>
      {story && <StoryCard story={story} className="max-w-[300px]" />}
    </div>
  );
};

export const SongDisplay = ({ song }: { song: DisplaySong }) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <SongVinyl title={song.title} />
      <SongDescriptionCard
        title={song.title}
        artist={song.artist}
        story={song.story}
      />
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
      <div className="md:mr-8 mt-2 w-full md:w-[22vw]">
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
          className="text-2xl bg-opacity-0 hover:bg-opacity-50 hover:drop-shadow-vinyl"
        />
      </Link>
    </div>
  );
};
