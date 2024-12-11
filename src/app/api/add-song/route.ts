/** @format */

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { songId, title, artist, playURL, story } = await request.json();

    if (!songId || !title || !artist || !story) {
      return NextResponse.json(
        { error: "Required fields are missing!" },
        { status: 400 }
      );
    }

    await sql`INSERT INTO songs (songId, title, artist, playURL, story) VALUES (${songId}, ${title}, ${artist}, ${playURL}, ${story});`;

    return NextResponse.json(
      { message: "Song added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
