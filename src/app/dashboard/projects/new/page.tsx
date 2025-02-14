"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@/components/Form/text-field";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/client-actions/projects";
import { useLoadingStore } from "@/stores/loading-store";

const ProjectSchema = Yup.object().shape({
  projectName: Yup.string().required("Required"),
  projectDesc: Yup.string().required("Required"),
});

function NewProjectsPage() {
  const mutation = useMutation({ mutationFn: createProject });
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Create a New Project</CardTitle>
      </CardHeader>
      <Formik
        initialValues={{ projectName: "", projectDesc: "" }}
        validationSchema={ProjectSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          mutation.mutate(values, {
            onSuccess: () => {
              setLoading(false);
              toast.success("Project created successfully");
              setSubmitting(false);
              router.replace("/dashboard/projects");
            },
            onError: (error) => {
              setLoading(false);
              toast.error(error.message);
              setSubmitting(false);
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CardContent>
              <TextField
                label="Project Name"
                name="projectName"
                type="text"
                placeholder="Project Name"
              />
              <TextField
                label="Project Description"
                name="projectDesc"
                type="text"
                placeholder="Project Description"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                Create Project
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default NewProjectsPage;