import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artisans = await sql`
      SELECT id, name, bio, profile_image
      FROM sellers
      ORDER BY id ASC;
    `;

    return NextResponse.json(artisans);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
