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

export async function POST(request: NextRequest) {
  try {
    const cookies = request.cookies;
    const userId = cookies.get('user-id')?.value;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is missing" },
        { status: 400 }
      );
    }

    const { taskName, projectId, dueDate, priority, taskDesc } = await request.json();

    if (!taskName || !projectId || !dueDate || !priority || !taskDesc) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const taskId = uuidv4();
    const status = 0;

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

export async function PUT(request: NextRequest) {
  try {
    const { taskId, taskName, dueDate, priority, taskDesc } = await request.json();

    if (!taskId || !taskName || !dueDate || !priority || !taskDesc) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await db.update(tasks)
      .set({
        taskName,
        dueDate,
        priority,
        taskDesc,
      })
      .where(eq(tasks.taskId, taskId));

    return NextResponse.json({ success: true, message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ success: false, message: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { taskId } = await request.json();

    if (!taskId) {
      return NextResponse.json(
        { success: false, message: "Task ID is required" },
        { status: 400 }
      );
    }

    await db.delete(tasks).where(eq(tasks.taskId, taskId));

    return NextResponse.json({ success: true, message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ success: false, message: "Failed to delete task" }, { status: 500 });
  }
}