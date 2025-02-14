import { Task } from "@/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditTaskDialog from "./edit-task-dialog";
import CompleteTaskButton from "./complete-task-button";
import DeleteTaskButton from "./delete-task-button";
import { Badge } from "../ui/badge";

interface TaskCardProps {
  task: Task;
  projectId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, projectId }) => {
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 0:
        return "bg-green-500";
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-red-500";
      default:
        return "";
    }
  };

  const getStatusText = (status: number) => {
    return status === 1 ? "Completed" : "Pending";
  };

  return (
    <Card key={task.taskId}>
      <CardHeader>
        <CardTitle>{task.taskName}</CardTitle>
        <CardDescription>
          <div className="flex items-center justify-between">
            Due on {task.dueDate}
            <Badge className="px-2 gap-2">
              <div
                className={`w-2 h-2 rounded-full ${getPriorityColor(
                  task.priority
                )}`}
              />
              <span>{getStatusText(task.status)}</span>
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{task.taskDesc}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <EditTaskDialog task={task} />
        <DeleteTaskButton taskId={task.taskId} projectId={projectId} />
        {task.status === 0 && (
          <CompleteTaskButton taskId={task.taskId} projectId={projectId} />
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
