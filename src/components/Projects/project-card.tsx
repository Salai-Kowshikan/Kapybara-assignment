import { Project } from "@/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/lib/client-actions/projects";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    mutation.mutate(project.projectId);
  };

  const handleViewTasks = () => {
    router.push(`/dashboard/projects/${project.projectId}`);
  };

  return (
    <Card key={project.projectId}>
      <CardHeader>
        <CardTitle>{project.projectName}</CardTitle>
        <CardDescription>{project.projectDesc}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-end gap-8">
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2Icon />
        </Button>
        <Button onClick={handleViewTasks}>View Tasks</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
