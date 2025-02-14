"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/Projects/project-card";
import { useProjectStore } from "@/stores/projects-store";
import { fetchProjects } from "@/lib/client-actions/projects";

function ProjectsPage() {
  const { data, error, isLoading } = useQuery<{ projects: Project[] }>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const setProjects = useProjectStore((state) => state.setProjects);
  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    if (data) {
      console.log("Projects:", data.projects);
      setProjects(data.projects);
    }
  }, [data, setProjects]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
