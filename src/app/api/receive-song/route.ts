/** @format */

import { DisplaySong } from "@/types";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const seed = request.nextUrl.searchParams.get("seed");
    const random = seed ? parseFloat(seed) : Math.random();

    const maxIndexResult = await sql`SELECT MAX(index) FROM songs;`;
    const maxIndex = maxIndexResult.rows[0].max;

    if (maxIndex === null) {
      return NextResponse.json(
        { error: "No songs in the database." },
        { status: 404 }
      );
    }

    const randomIndex = Math.floor(random * maxIndex) + 1;
    console.log("index:", randomIndex);

    const result = await sql`SELECT * FROM songs WHERE index = ${randomIndex};`;

    const songRes = result.rows[0];
    const song: DisplaySong = {
      songId: songRes.songId,
      title: songRes.title,
      artist: songRes.artist,
      playURL: songRes.playurl,
      story: songRes.story,
    };

    const response = NextResponse.json({ song: song }, { status: 200 });
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
