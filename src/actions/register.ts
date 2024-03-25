"use server"

import * as  z  from "zod"
import {  RegisterSchema } from "../../schema"
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationMail } from "@/lib/mail";
export async function Register(values:z.infer<typeof RegisterSchema>){
    const validateFields=RegisterSchema.safeParse(values);
    if(!validateFields.success){
        return {error:"Invalid Credentials"}
    }
    const existinguser=await db.user.findUnique({
        where:{
            email:validateFields.data.email
        }
    })
    if(existinguser){
        return {error:"Account already Created"}
    }
    const hashedPassword=await bcrypt.hash(validateFields.data.password,10);
    await db.user.create({
        data:{
            email:validateFields.data.email,
            name:validateFields.data.name,
            password:hashedPassword
        }
    })
    const verificationToken=await generateVerificationToken(validateFields.data.email)
    await sendVerificationMail(verificationToken.email,verificationToken.token,verificationToken.OTP)
    return {success:"OTP Sent",token:verificationToken.token}
}