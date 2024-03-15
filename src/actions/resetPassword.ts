"use server"
import * as z from "zod"
import { ResetSchema } from "../../schema"
import { db } from "@/lib/db";
import { generatePasswordToken } from "@/lib/tokens";
import { sendResetPasswordMail } from "@/lib/mail";
const resetPassword=async(values:z.infer<typeof ResetSchema>)=>{
   const validateFields=ResetSchema.safeParse(values);
   if (!validateFields.success) {
    return { error: "Invalid Credentials" };
  }
//   checking for the user in user database
  const exists = await db.user.findUnique({
    where: {
      email: validateFields.data.email,
    },
  });
  if (!exists) {
    return { error: "user not exists" };
  }
 const existingAccount=await generatePasswordToken(validateFields.data.email)
  await sendResetPasswordMail(validateFields.data.email,existingAccount?.token)
    return {success:"Verification email sent!"}
}
export default resetPassword;