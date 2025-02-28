import { Project } from "@/types/project";

export async function createProject(values: { projectName: string; projectDesc: string }) {
  const response = await fetch("/api/projects/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create project");
  }

  return response.json();
}

export async function deleteProject(projectId: string) {
  const response = await fetch("/api/projects", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete project");
  }

  return response.json();
}

export async function fetchProjects(): Promise<{ projects: Project[] }> {
  const response = await fetch("/api/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch projects");
  }

  return response.json();
}

export async function updateProject({
  projectId,
  title,
  description,
}: {
  projectId: string;
  title: string;
  description: string;
}) {
  const response = await fetch("/api/projects", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId, title, description }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update project");
  }

  return response.json();
}