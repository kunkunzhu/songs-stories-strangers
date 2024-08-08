/** @format */

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const maxIndexResult = await sql`SELECT MAX(index) FROM songs;`;
    const maxIndex = maxIndexResult.rows[0].max;

    if (maxIndex === null) {
      return NextResponse.json(
        { error: "No songs in the database." },
        { status: 404 }
      );
    }

    const randomIndex = Math.floor(Math.random() * maxIndex) + 1;
    const result =
      await sql`SELECT * FROM songs WHERE songIndex = ${randomIndex};`;

    return NextResponse.json({ song: result.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
