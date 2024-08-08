/** @format */

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`CREATE TABLE IF NOT EXISTS songs (
        index SERIAL PRIMARY KEY,
        songId VARCHAR(50),
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        playURL VARCHAR(255),
        story TEXT
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
