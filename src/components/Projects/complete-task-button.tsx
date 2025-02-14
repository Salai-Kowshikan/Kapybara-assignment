import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTask } from "@/lib/client-actions/tasks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function CompleteTaskButton({ taskId, projectId }: { taskId: string, projectId: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      toast.success("Task marked as completed");
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button onClick={() => mutation.mutate(taskId)}>
      Mark as Completed
    </Button>
  );
}

export default CompleteTaskButton;