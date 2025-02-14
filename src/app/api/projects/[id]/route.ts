import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { tasks } from "@/db/schema/users";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;

    if (!projectId) {
      return NextResponse.json(
        { success: false, message: "Project ID is missing" },
        { status: 400 }
      );
    }

    const projectTasks = await db.select().from(tasks).where(eq(tasks.projectId, projectId));

    return NextResponse.json({ success: true, tasks: projectTasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;
    const { taskName, userId, dueDate, priority, status, taskDesc } = await request.json();

    if (!taskName || !userId || !dueDate || !priority || !status || !taskDesc) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const taskId = uuidv4();

    await db.insert(tasks).values({
      taskId,
      taskName,
      projectId,
      userId,
      dueDate,
      priority,
      status,
      taskDesc,
    });

    return NextResponse.json({ success: true, message: "Task added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ success: false, message: "Failed to add task" }, { status: 500 });
  }
}