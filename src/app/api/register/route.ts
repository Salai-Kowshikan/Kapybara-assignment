import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await db.$count(users, eq(users.email, email));
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await db.insert(users).values({
      userId,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create user" },
      { status: 500 }
    );
  }
}