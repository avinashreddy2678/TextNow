"use server";
import * as z from "zod";
import { getPasswordTokenbyToken } from "@/data/PasswordToken";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "../../schema";
import bcrypt from "bcryptjs";

const checkPasswordToken = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Token is missing" };
  }
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Credentials" };
  }
  const password = validateFields.data.password;

  const existingPaswordToken = await getPasswordTokenbyToken(token);
  if (!existingPaswordToken) {
    return { error: "invalid token found" };
  }
  const hasExpired = new Date(existingPaswordToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existinguser = await db.user.findUnique({
    where: {
      email: existingPaswordToken.email,
    },
  });
  if (!existinguser) {
    return { error: "User not found" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existinguser.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  await db.resetPasswordsVerificationToken.delete({
    where: {
      id: existingPaswordToken.id,
    },
  });
  return { success: "password Updated successfully" };
};

export default checkPasswordToken;
