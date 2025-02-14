import { create } from "zustand";
import { Project, Task } from "@/types/project";

interface ProjectState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));

interface TasksState {
  tasks: Record<string, Task[]>;
  setTasks: (projectId: string, tasks: Task[]) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: {},
  setTasks: (projectId, tasks) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [projectId]: tasks,
      },
    })),
}));
