"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@/components/Form/text-field";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser } from "@/lib/client-actions/users";
import { useRouter } from "next/router";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

function LoginCard() {
  const mutation = useMutation({ mutationFn: loginUser });
  const router = useRouter();

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Log into your Kapybara account</CardTitle>
        <CardDescription>
          Don't have an account yet? &nbsp;
          <Link href="/sign-up" replace scroll={false}>
            Sign up here
          </Link>
        </CardDescription>
      </CardHeader>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              toast.success("Logged in successfully");
              setSubmitting(false);
              router.replace("/dashboard")
            },
            onError: (error) => {
              toast.error(error.message);
              setSubmitting(false);
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CardContent>
              <TextField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                Log in
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default LoginCard;
