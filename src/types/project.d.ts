export interface Project {
  projectId: string;
  projectName: string;
  projectDesc: string;
  userId: string;
}

export interface Task {
  taskId: string;
  taskName: string;
  projectId: string;
  userId: string;
  dueDate: string;
  priority: number;
  status: number;
  taskDesc: string;
}
