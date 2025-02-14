"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProjectStore } from "@/stores/projects-store";
import { fetchProjects } from "@/lib/client-actions/projects";
import { Project } from "@/types/project";

function ProjectPage() {
  const { id } = useParams() as { id: string };
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    projects.find((project) => project.projectId === id)
  );

  const { data: projectData, error: projectError, isLoading: projectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: !currentProject,
  });

  useEffect(() => {
    if (projectData) {
      setProjects(projectData.projects);
    }
  }, [projectData, setProjects]);

  if (!currentProject && projectLoading) {
    return <div>Loading project...</div>;
  }

  if (projectError) {
    return <div>Error: {projectError.message}</div>;
  }

  return (
    <div>
      <h1>Project: {currentProject?.projectName}</h1>
      <p>Description: {currentProject?.projectDesc}</p>
      <h2>Tasks</h2>
    </div>
  );
}

export default ProjectPage;