/** @format */

import Image from "next/image";

interface Song {
  title: string;
  artist: string;
  story: string;
  coverURL: string;
}

const SongVinyl = ({
  title,
  coverURL,
}: {
  title: string;
  coverURL: string;
}) => {
  return (
    <div className="flex items-center justify-center border border-gray-200/50 rounded-full w-[250px] h-[250px] bg-black">
      <div className="w-[100px] h-[100px] border border-gray-200/50 drop-shadow-vinyl rounded-full overflow-hidden">
        <Image
          src={coverURL}
          width={100}
          height={100}
          alt={`cover art for ${title}`}
        />
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
  story: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col font-mono justify-between text-end border-b pb-4">
        <div className="text-3xl">{title}</div>
        <div className="text-sm opacity-75 after:italic">{artist}</div>
      </div>
      <div className="border h-full rounded-lg py-2 px-4 text-xs mt-8 overflow-y-scroll bg-white bg-opacity-20 max-w-[300px]">
        {story}
      </div>
    </div>
  );
};

export const SongDisplay = ({ song }: { song: Song }) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <SongVinyl title={song.title} coverURL={song.coverURL} />
      <SongDescriptionCard
        title={song.title}
        artist={song.artist}
        story={song.story}
      />
    </div>
  );
};
