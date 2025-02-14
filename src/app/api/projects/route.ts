import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema/users";

export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies;
    const userId = cookies.get('user-id')?.value;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is missing" },
        { status: 400 }
      );
    }

    const userProjects = await db.select().from(projects).where(eq(projects.userId, userId));

    return NextResponse.json({ success: true, projects: userProjects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { success: false, message: "Project ID is missing" },
        { status: 400 }
      );
    }

    await db.delete(projects).where(eq(projects.projectId, projectId));

    return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ success: false, message: "Failed to delete project" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { projectId, title, description } = await request.json();

    if (!projectId || !title || !description) {
      return NextResponse.json(
        { success: false, message: "Project ID, title, and description are required" },
        { status: 400 }
      );
    }

    await db.update(projects)
      .set({ projectName: title, projectDesc: description })
      .where(eq(projects.projectId, projectId));

    return NextResponse.json({ success: true, message: "Project updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ success: false, message: "Failed to update project" }, { status: 500 });
  }
}