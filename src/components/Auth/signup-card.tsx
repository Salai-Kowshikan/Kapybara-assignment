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
import { registerUser } from "@/lib/client-actions/users";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/router";

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

function SignUpCard() {
  const mutation = useMutation({ mutationFn: registerUser });
  const router = useRouter();

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Register for a Kapybara account</CardTitle>
        <CardDescription>
          Already registered? &nbsp;
          <Link href="/login" replace scroll={false}>
            Click here to login
          </Link>
        </CardDescription>
      </CardHeader>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              toast.success("User registered successfully");
              setSubmitting(false);
              router.replace("/login");
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
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
              />
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
                Register
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default SignUpCard;
