import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/lib/client-actions/tasks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function DeleteTaskButton({ taskId, projectId }: { taskId: string, projectId: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button onClick={() => mutation.mutate(taskId)}>
      Delete
    </Button>
  );
}

export default DeleteTaskButton;