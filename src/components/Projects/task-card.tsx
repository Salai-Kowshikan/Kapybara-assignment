import { Task } from "@/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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

  return (
    <Card key={task.taskId}>
      <CardHeader>
        <CardTitle>{task.taskName}</CardTitle>
        <CardDescription>{task.dueDate}</CardDescription>
      </CardHeader>
      <CardContent>
        {task.taskDesc}
        <div
          className={`w-4 h-4 rounded-full ${getPriorityColor(task.priority)}`}
        />
      </CardContent>
      <CardFooter>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>

    // <div className="border p-4 rounded-md shadow-md mb-4">
    //   <div className="flex items-center justify-between">
    //     <h3 className="text-lg font-bold">{task.taskName}</h3>
    //     <div className={`w-4 h-4 rounded-full ${getPriorityColor(task.priority)}`} />
    //   </div>
    //   <p className="text-sm text-gray-600">{task.taskDesc}</p>
    //   <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
    // </div>
  );
};

export default TaskCard;
