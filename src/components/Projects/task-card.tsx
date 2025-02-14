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
        <CardDescription>{task.dueDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{task.taskDesc}</p>
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full ${getPriorityColor(task.priority)}`}
          />
          <span>{getStatusText(task.status)}</span>
        </div>
      </CardContent>
      <CardFooter>
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