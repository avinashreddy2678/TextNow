"use server";

import * as z from "zod";
import { LoginSchema } from "../../schema";

import { db } from "@/lib/db";
import { signIn } from "../auth";
import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/Allroutes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
// import { sendVerificationMail } from "@/lib/mail";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Credentials" };
  }
  const exists = await db.user.findUnique({
    where: {
      email: validateFields.data.email,
    },
  });
  if (!exists) {
    return { error: "user not exists" };
  }
  if(!exists.password){
    return { error: "this account is already in use" };
  }
  const validPassword = await bcrypt.compare(
    validateFields.data.password,
    exists.password!
  );
  if (!validPassword) {
    return { error: "password not valid" };
  }
  if (!exists.emailVerified) {
    const verficationToken = await generateVerificationToken(
      validateFields.data.email
    );
    // await sendVerificationMail(validateFields.data.email,verficationToken.token)
    return { success: "verification email sent",token:verficationToken };
  }
  try {
    await signIn("credentials", {
      email: validateFields.data.email,
      password: validateFields.data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
    }
    throw error;
  }
}
