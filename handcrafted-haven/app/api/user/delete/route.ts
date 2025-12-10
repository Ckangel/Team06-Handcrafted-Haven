import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

export async function DELETE() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID
    const users = await sql`
      SELECT id FROM users WHERE email = ${session.user.email}
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;

    // Delete user's data (cascade will handle related records if set up)
    // Otherwise delete related records first
    try {
      await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
    } catch (e) {
      // Table might not exist
    }

    try {
      await sql`DELETE FROM wishlist WHERE user_id = ${userId}`;
    } catch (e) {
      // Table might not exist
    }

    try {
      await sql`DELETE FROM reviews WHERE user_id = ${userId}`;
    } catch (e) {
      // Table might not exist
    }

    try {
      await sql`DELETE FROM orders WHERE user_id = ${userId}`;
    } catch (e) {
      // Table might not exist
    }

    // Finally delete the user
    await sql`DELETE FROM users WHERE id = ${userId}`;

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
