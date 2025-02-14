"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateTask } from "@/lib/client-actions/tasks";
import TextField from "@/components/Form/text-field";
import SelectField from "@/components/Form/select-field";

const TaskSchema = Yup.object().shape({
  taskName: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required"),
  priority: Yup.number().required("Required"),
  taskDesc: Yup.string().required("Required"),
});

interface EditTaskDialogProps {
  task: {
    taskId: string;
    taskName: string;
    dueDate: string;
    priority: number;
    taskDesc: string;
    projectId: string;
  };
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ task }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", task.projectId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Task</Button>
      </DialogTrigger>
      <Formik
        initialValues={{
          taskName: task.taskName,
          dueDate: task.dueDate,
          priority: task.priority,
          taskDesc: task.taskDesc,
        }}
        validationSchema={TaskSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate({
            ...values,
            taskId: task.taskId,
            projectId: task.projectId,
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit task</DialogTitle>
              <DialogDescription>
                Fill in the details to edit the task.
              </DialogDescription>
            </DialogHeader>
            <Form>
              <TextField
                label="Task Name"
                placeholder="Task name"
                name="taskName"
                type="text"
              />
              <TextField
                label="Due Date"
                placeholder="Due date"
                name="dueDate"
                type="date"
              />
              <SelectField
                label="Priority"
                name="priority"
                placeholder="Select priority"
                list={[
                  {
                    value: "0",
                    label: "Low",
                  },
                  {
                    value: "1",
                    label: "Medium",
                  },
                  {
                    value: "2",
                    label: "High",
                  },
                ]}
              />
              <TextField
                label="Task Description"
                placeholder="Task description"
                name="taskDesc"
                type="text"
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" disabled={isSubmitting}>
                    Update Task
                  </Button>
                </DialogClose>
              </DialogFooter>
            </Form>
          </DialogContent>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditTaskDialog;
