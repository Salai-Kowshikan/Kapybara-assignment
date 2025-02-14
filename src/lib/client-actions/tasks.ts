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
