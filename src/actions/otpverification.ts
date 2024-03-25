"use server";

import { getVerificationTokenByToken } from "@/data/verification";
import { db } from "@/lib/db";

const otpverification = async (input: Number,token:any) => {
  const existingToken=await getVerificationTokenByToken(token);
  if(!existingToken){
    return {error:"Token does not exist"}
}
const hasExpired=new Date(existingToken.expires) < new Date();
if(hasExpired){
    return {error:"Token has expired"}
}
if(input!==existingToken.OTP){
  return {error:"wrong OTP"}
}
const existingUser=await db.user.findFirst({
  where:{
      email:existingToken.email
  }
})
await db.user.update({
  where:{
      id:existingUser?.id
  }
  ,data:{
      emailVerified:new Date(),
      email:existingToken.email
  }
})
await db.verificationToken.delete({
  where:{
      id:existingToken.id
  }
})
  return { success: "Account verified Login Now" };
};
export default otpverification;
