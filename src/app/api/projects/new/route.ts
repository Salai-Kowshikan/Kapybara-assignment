import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import { projects } from "@/db/schema/users";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const cookies = request.cookies;
    const userId = cookies.get('user-id')?.value;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is missing" },
        { status: 400 }
      );
    }

    const { projectName, projectDesc } = requestBody;
    const projectId = uuidv4();

    await db.insert(projects).values({
      userId,
      projectId,
      projectName,
      projectDesc,
    });

    return NextResponse.json({ success: true, message: "Project created successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, message: "Failed to create project" }, { status: 500 });
  }
}