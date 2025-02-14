"use client";

import { useParams } from "next/navigation";
import { useProjectStore } from "@/stores/projects-store";

function ProjectPage() {
  const { id } = useParams();
  const projects = useProjectStore((state) =>
    state.projects)

  const project = projects.find((project) => project.projectId === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>Project: {project.projectName}</h1>
      <p>Description: {project.projectDesc}</p>
    </div>
  );
}

export default ProjectPage;
