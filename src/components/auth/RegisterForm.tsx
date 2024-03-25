"use client";
import * as z from "zod";

import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { RegisterSchema } from "../../../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Register } from "@/actions/register";
import { useRouter } from "next/navigation";

const RegitserForm = () => {
  const router = useRouter();

  const [success, SetSuccess] = useState<string | undefined>();
  const [error, SetError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    SetError("");
    SetSuccess("");
    startTransition(() => {
      Register(values).then((data) => {
        if (data.success) {
          SetSuccess(data.success);
          setTimeout(() => {
            router.push(`/auth/Otp?token=${data.token}`);
          }, 2000);
        } else {
          if (data?.error === "Account already Created") {
            setTimeout(() => {
              router.push("/auth/login");
            }, 1000);
          }
          SetError(data?.error);
        }
      });
    });
  };

  return (
    <div>
      <CardWrapper
        title="Register"
        label="Create a New Account"
        backbtnlabel="Already have an Account ?"
        backbtnhref="/auth/login"
        social
      >
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="George " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="malar@malar.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}

            <Button type="submit" className=" w-full mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default RegitserForm;
