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

function ProjectPage() {
  const { id } = useParams() as { id: string };
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

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

  if (!currentProject && projectLoading) {
    return <div>Loading project...</div>;
  }

  if (projectError) {
    return <div>Error: {projectError.message}</div>;
  }

  if (taskError) {
    return <div>Error: {taskError.message}</div>;
  }

  return (
    <div>
      <h1>Project: {currentProject?.projectName}</h1>
      <p>Description: {currentProject?.projectDesc}</p>
      {currentProject && (
        <ProjectEditDialog
          project={currentProject}
          projectId={id}
          setCurrentProject={setCurrentProject}
        />
      )}
      <h2>Tasks</h2>
      {taskData?.tasks.length ? (
        <div>
          {taskData.tasks.map((task: Task) => (
            <TaskCard key={task.taskId} task={task} />
          ))}
        </div>
      ) : (
        <p>No tasks found</p>
      )}
      <AddTaskDialog projectId={id} />
    </div>
  );
}

export default ProjectPage;
