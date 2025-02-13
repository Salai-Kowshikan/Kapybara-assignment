import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET  || "";

if(JWT_SECRET == "") {
    throw new Error("JWT_SECRET is not defined");
 }


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ email: user[0].email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { success: false, message: "Failed to log in" },
      { status: 500 }
    );
  }
}