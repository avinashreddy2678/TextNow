import * as z from "zod";

export const LoginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"Password required for login"
    })
})

export const ResetSchema=z.object({
    email:z.string().email(),
})

export const RegisterSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"Password required for login"
    }),
    name:z.string().min(1,{message:"Name required "}),
})
export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
  });