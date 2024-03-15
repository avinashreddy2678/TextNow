"use client";
import * as z from "zod";
import checkPasswordToken from "@/actions/checkPasswordandToken";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "../../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const ResetPasswordPage = () => {
  const [success, SetSuccess] = useState<string | undefined>();
  const [error, SetError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const searchparams=useSearchParams();
  const token=searchparams.get('token');

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    SetError("");
    SetSuccess("");
    startTransition(() => {
      checkPasswordToken(values,token).then((data) => {
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
        title="Change Password"
        label="add a new password"
        backbtnlabel="Go back to Login"
        backbtnhref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              disabled={isPending}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a new Password here" {...field} />
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
              Update Password
            </Button>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
export default ResetPasswordPage;
