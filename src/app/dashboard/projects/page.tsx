"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/Projects/project-card";
import { useProjectStore } from "@/stores/projects-store";
import { fetchProjects } from "@/lib/client-actions/projects";
import { useLoadingStore } from "@/stores/loading-store";

function ProjectsPage() {
  const { data, error, isLoading } = useQuery<{ projects: Project[] }>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const setLoading = useLoadingStore((state) => state.setLoading);

  const setProjects = useProjectStore((state) => state.setProjects);
  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    if (data) {
      console.log("Projects:", data.projects);
      setProjects(data.projects);
    }
  }, [data, setProjects]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-screen flex flex-col justify-center px-16 gap-4">
      <h1 className="text-2xl font-bold"> Your projects </h1>
      {projects.map((project) => (
        <ProjectCard key={project.projectId} project={project} />
      ))}
      {projects.length === 0 && (
        <div className="text-center">
          You don&apos;t have any projects yet. Start by creating one!
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
