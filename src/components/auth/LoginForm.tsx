"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { LoginSchema } from "../../../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router=useRouter()
  const [success, SetSuccess] = useState<string | undefined>();
  const [error, SetError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    SetError("");
    SetSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          SetError(data?.error);
        }
        if (data?.success) {
          setTimeout(() => {
            router.push(`/auth/Otp?token=${data.token}`);
          }, 2000);
          SetSuccess(data?.success);
        }
      });
    });
  };
  return (
    <div>
      <CardWrapper
        title="LogIn"
        label="Welcome back"
        backbtnlabel="Does not have an account "
        backbtnhref="/auth/register"
        social
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              disabled={isPending}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                  <Button variant="link" asChild className="px-0 font-normal">
                    <Link href="/auth/reset">
                      Forgot password ?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            

            <Button
              className="w-full mt-2 pl-0 ml-0"
              type="submit"
              disabled={isPending}
            >
              Submit
            </Button>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;
