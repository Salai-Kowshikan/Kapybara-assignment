"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProjectStore } from "@/stores/projects-store";
import { fetchProjects } from "@/lib/client-actions/projects";
import { fetchTasks } from "@/lib/client-actions/tasks";
import { Project, Task } from "@/types/project";
import ProjectEditDialog from "@/components/Projects/edit-project-dialog";
import AddTaskDialog from "@/components/Projects/add-task-dialog";
import TaskCard from "@/components/Projects/task-card";
import { Separator } from "@/components/ui/separator";
import { useLoadingStore } from "@/stores/loading-store";

function ProjectPage() {
  const { id } = useParams() as { id: string };
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    projects.find((project) => project.projectId === id)
  );

  const {
    data: projectData,
    error: projectError,
    isLoading: projectLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: !currentProject,
  });

  useEffect(() => {
    setLoading(projectLoading || !currentProject);
  }, [projectLoading, currentProject, setLoading]);

  const { data: taskData, error: taskError } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTasks(id),
    enabled: !!currentProject,
  });

  useEffect(() => {
    if (projectData) {
      setProjects(projectData.projects);
      setCurrentProject(
        projectData.projects.find((project) => project.projectId === id)
      );
    }
  }, [projectData, setProjects, id]);

  useEffect(() => {
    setLoading(taskData === undefined && !!currentProject);
  }, [taskData, currentProject, setLoading]);

  if (!currentProject && projectLoading) {
    return (
      <div className="h-screen flex flex-col gap-4 px-8">
        Loading project...
      </div>
    );
  }

  if (projectError) {
    return (
      <div className="h-screen flex flex-col gap-4 px-8">
        Error: {projectError.message}
      </div>
    );
  }

  if (taskError) {
    return (
      <div className="h-screen flex flex-col gap-4 px-8">
        Error: {taskError.message}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col gap-4 px-8">
      <div className="flex items-center gap-2 ">
        <div className="flex-1">
          <h1 className="font-bold text-2xl">{currentProject?.projectName}</h1>
          <p className="text-xl">{currentProject?.projectDesc}</p>
        </div>

        <AddTaskDialog projectId={id} />
        {currentProject && (
          <ProjectEditDialog
            project={currentProject}
            projectId={id}
            setCurrentProject={setCurrentProject}
          />
        )}
      </div>
      <Separator />
      <h1 className="font-bold text-2xl">Tasks</h1>
      {taskData?.tasks.length ? (
        <div className="flex flex-col gap-4">
          {taskData.tasks.map((task: Task) => (
            <TaskCard
              projectId={currentProject?.projectId || ""}
              key={task.taskId}
              task={task}
            />
          ))}
        </div>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
}

export default ProjectPage;
