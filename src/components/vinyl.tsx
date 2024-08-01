/** @format */

import Image from "next/image";
import { DisplaySong, Song } from "@/types";

const SongVinyl = ({
  title,
  displayCover,
}: {
  title: string;
  displayCover: string | null;
}) => {
  return (
    <div className="flex items-center justify-center border border-gray-200/50 rounded-full w-[250px] h-[250px] bg-black">
      <div className="w-[100px] h-[100px] border border-gray-200/50 drop-shadow-vinyl rounded-full overflow-hidden">
        {displayCover && (
          <Image
            src={displayCover}
            width={100}
            height={100}
            alt={`cover art for ${title}`}
          />
        )}
      </div>
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
      <div className="flex flex-col font-mono justify-between text-end border-b pb-4">
        <div className="text-2xl max-w-100 truncate text-green-50">{title}</div>
        <div className="text-sm opacity-75 after:italic">{artist}</div>
      </div>
      {story && (
        <div className="border h-full rounded-lg py-2 px-4 text-xs mt-8 overflow-y-scroll bg-white bg-opacity-20 max-w-[300px]">
          {story}
        </div>
      )}
    </div>
  );
};

export const SongDisplay = ({ song }: { song: DisplaySong }) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <SongVinyl title={song.title} displayCover={song.displayCover} />
      <SongDescriptionCard
        title={song.title}
        artist={song.artist}
        story={song.story}
      />
    </div>
  );
};

export const InputSong = ({ song }: { song: Song }) => {
  return (
    <div className="flex justify-between">
      <div className="rounded-full border bg-black bg-opacity-50 flex p-2 mx-2 justify-between w-fit gap-20">
        {song.cover && (
          <div className="rounded-full min-w-[80px] border drop-shadow-vinyl overflow-hidden">
            <Image
              src={song.cover}
              width={80}
              height={80}
              alt={`cover art for ${song.title}`}
            />
          </div>
        )}
        <div className="mr-6 max-w-[22vw]">
          <SongDescriptionCard title={song.title} artist={song.artist} />
        </div>
      </div>
    </div>
  );
};
