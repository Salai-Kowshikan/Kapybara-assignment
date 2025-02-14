import { Task } from "@/types/project";

export async function addTask(values: {
  taskName: string;
  projectId: string;
  dueDate: string;
  priority: number;
  taskDesc: string;
}) {
  const response = await fetch(`/api/projects/${values.projectId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add task");
  }

  return response.json();
}

export async function fetchTasks(projectId: string): Promise<{ tasks: Task[] }> {
  const response = await fetch(`/api/projects/${projectId}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch tasks");
  }

  return response.json();
}

export async function updateTask(values: {
  taskId: string;
  taskName: string;
  dueDate: string;
  priority: number;
  taskDesc: string;
  projectId: string;
}) {
  const response = await fetch(`/api/projects/${values.projectId}/tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update task");
  }

  return response.json();
}

export async function completeTask(taskId: string) {
  const response = await fetch(`/api/projects/${taskId}/tasks/completed`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to complete task");
  }

  return response.json();
}

export async function deleteTask(taskId: string) {
  const response = await fetch(`/api/projects/${taskId}/tasks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete task");
  }

  return response.json();
}