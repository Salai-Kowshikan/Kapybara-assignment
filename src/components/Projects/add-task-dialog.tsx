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
import { addTask } from "@/lib/client-actions/tasks";
import TextField from "@/components/Form/text-field";
import SelectField from "@/components/Form/select-field";

const TaskSchema = Yup.object().shape({
  taskName: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required"),
  priority: Yup.number().required("Required"),
  taskDesc: Yup.string().required("Required"),
});

interface AddTaskDialogProps {
  projectId: string;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ projectId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      toast.success("Task added successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog>
      <DialogTrigger>Add new task</DialogTrigger>
      <Formik
        initialValues={{
          taskName: "",
          dueDate: "",
          priority: 1,
          taskDesc: "",
        }}
        validationSchema={TaskSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate({ ...values, projectId });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new task</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new task.
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
                placeholder="beep"
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
                    Add Task
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

export default AddTaskDialog;
