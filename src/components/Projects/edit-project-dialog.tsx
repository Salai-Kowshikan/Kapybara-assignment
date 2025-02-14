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
import TextField from "@/components/Form/text-field";
import { updateProject } from "@/lib/client-actions/projects";
import { Project } from "@/types/project";

const ProjectSchema = Yup.object().shape({
  projectName: Yup.string().required("Required"),
  projectDesc: Yup.string().required("Required"),
});

interface ProjectEditDialogProps {
  project: Project;
  projectId: string;
  setCurrentProject: (project: Project) => void;
}

const ProjectEditDialog: React.FC<ProjectEditDialogProps> = ({
  project,
  projectId,
  setCurrentProject,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setCurrentProject(data.project);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
      <Formik
        initialValues={{
          projectName: project.projectName || "",
          projectDesc: project.projectDesc || "",
        }}
        validationSchema={ProjectSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate({
            projectId,
            title: values.projectName,
            description: values.projectDesc,
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit project details</DialogTitle>
              <DialogDescription>
                We would like some humour here
              </DialogDescription>
            </DialogHeader>
            <Form>
              <TextField
                label="Title"
                placeholder="Very important project"
                name="projectName"
                type="text"
              />
              <TextField
                label="Description"
                placeholder="Insert long essay about male loneliness epidemic"
                name="projectDesc"
                type="text"
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  Update Project
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        )}
      </Formik>
    </Dialog>
  );
};

export default ProjectEditDialog;
