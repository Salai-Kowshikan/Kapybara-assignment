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

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

function LoginCard() {
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
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
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
