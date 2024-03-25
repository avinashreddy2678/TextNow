import { getVerificationByEmail } from "@/data/verification";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordTokenbyemail } from "@/data/PasswordToken";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const Otp = Math.floor(1000 + Math.random() * 9000);


  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires,
      email,
      OTP:Otp
    },
  });
  return verificationToken;
};
export const generatePasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordTokenbyemail(email);
  if (existingToken) {
    await db.resetPasswordsVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await db.resetPasswordsVerificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });
  return verificationToken;
};
