import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sql`DROP TABLE IF EXISTS reviews CASCADE;`;
    await sql`DROP TABLE IF EXISTS products CASCADE;`;
    await sql`DROP TABLE IF EXISTS sellers CASCADE;`;

    return NextResponse.json({ message: "ALL TABLES DROPPED" });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
