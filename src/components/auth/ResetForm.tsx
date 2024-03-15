"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {  ResetSchema } from "../../../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import resetPassword from "@/actions/resetPassword";


const ResetForm = () => {
  const [success, SetSuccess] = useState<string | undefined>();
  const [error, SetError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    SetError("");
    SetSuccess("");
    startTransition(() => {
        resetPassword(values).then((data) => {
        if (data?.error) {
          SetError(data?.error);
        }
        if (data?.success) {
          SetSuccess(data?.success);
        }
      });
    });
  };
  return (
    <div>
      <CardWrapper
        title="Reset Password"
        label="dont forgot password your password again"
        backbtnlabel="Go back to Login"
        backbtnhref="/auth/login"
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
                    <Input placeholder="Enter Your email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           

            <Button
              className="w-full mt-4 pl-0 ml-0"
              type="submit"
              disabled={isPending}
            >
              Send Verification Link
            </Button>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default ResetForm;
