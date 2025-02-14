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
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/stores/loading-store";
import { useUserStore } from "@/stores/user-store";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

function LoginCard() {
  const mutation = useMutation({ mutationFn: loginUser });
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setUser = useUserStore((state) => state.setUserId);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Log into your Kapybara account</CardTitle>
        <CardDescription>
          Don&apos;t have an account yet? &nbsp;
          <Link href="/sign-up" replace scroll={false}>
            Sign up here
          </Link>
        </CardDescription>
      </CardHeader>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          mutation.mutate(values, {
            onSuccess: (data) => {
              setUser(data.userId);
              toast.success("Logged in successfully");
              setSubmitting(false);
              setLoading(false);
              router.replace("/dashboard");
            },
            onError: (error) => {
              toast.error(error.message);
              setLoading(false);
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
