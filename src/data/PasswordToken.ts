import { db } from "@/lib/db";

export const getPasswordTokenbyToken = async (token: string) => {
  try {
    const gettoken = await db.resetPasswordsVerificationToken.findUnique({
      where: {
        token,
      },
    });
    return gettoken;
  } catch (error) {
    return null;
  }
};
export const getPasswordTokenbyemail = async (email: string) => {
    try {
      const gettoken = await db.resetPasswordsVerificationToken.findFirst({
        where: {
          email,
        },
      });
      return gettoken;
    } catch (error) {
      return null;
    }
  };
  
