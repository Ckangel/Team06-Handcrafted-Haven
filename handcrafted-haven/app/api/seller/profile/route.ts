import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/seller/profile - Get seller profile
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const profile = await sql`
      SELECT 
        s.id,
        s.name,
        s.bio,
        s.profile_image as "profileImage",
        s.created_at as "createdAt",
        u.email
      FROM sellers s
      JOIN users u ON s.user_id = u.id
      WHERE s.user_id = ${userId}
    `;

    if (profile.length === 0) {
      // Return user info without seller profile (needs to create one)
      const user = await sql`
        SELECT id, name, email FROM users WHERE id = ${userId}
      `;
      return NextResponse.json({ 
        profile: null, 
        user: user[0],
        needsSetup: true 
      });
    }

    return NextResponse.json({ profile: profile[0], needsSetup: false });
  } catch (error) {
    console.error("Error fetching seller profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// POST /api/seller/profile - Create seller profile
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "seller") {
      return NextResponse.json({ error: "Not registered as a seller" }, { status: 403 });
    }

    const userId = (session.user as any).id;
    const { name, bio, profileImage } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Shop name is required" }, { status: 400 });
    }

    // Check if already exists
    const existing = await sql`
      SELECT id FROM sellers WHERE user_id = ${userId}
    `;

    if (existing.length > 0) {
      return NextResponse.json({ error: "Profile already exists" }, { status: 409 });
    }

    // Create seller profile
    const result = await sql`
      INSERT INTO sellers (user_id, name, bio, profile_image)
      VALUES (${userId}, ${name}, ${bio || null}, ${profileImage || null})
      RETURNING id, name, bio, profile_image as "profileImage", created_at as "createdAt"
    `;

    return NextResponse.json({ profile: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating seller profile:", error);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}

// PUT /api/seller/profile - Update seller profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { name, bio, profileImage } = await request.json();

    const result = await sql`
      UPDATE sellers SET
        name = COALESCE(${name}, name),
        bio = ${bio},
        profile_image = ${profileImage}
      WHERE user_id = ${userId}
      RETURNING id, name, bio, profile_image as "profileImage"
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: result[0] });
  } catch (error) {
    console.error("Error updating seller profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
