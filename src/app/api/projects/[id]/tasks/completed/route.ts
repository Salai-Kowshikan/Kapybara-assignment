import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { tasks } from "@/db/schema/users";

export async function PUT(request: NextRequest) {
  try {
    const { taskId } = await request.json();

    if (!taskId) {
      return NextResponse.json(
        { success: false, message: "Task ID is required" },
        { status: 400 }
      );
    }

    await db.update(tasks)
      .set({ status: 1 })
      .where(eq(tasks.taskId, taskId));

    return NextResponse.json({ success: true, message: "Task marked as completed" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task status:", error);
    return NextResponse.json({ success: false, message: "Failed to update task status" }, { status: 500 });
  }
}