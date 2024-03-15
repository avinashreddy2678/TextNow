// to get the verfication token from verification table whether the token is thier are not wit only emiail or with the token itself

import { db } from "@/lib/db"

export const  getVerificationByEmail = async(email: string) => {
    try {
        const verification = await db.verificationToken.findFirst({
            where: {
                email: email
            }
            
    })
    return verification;
    } catch (error) {
        return null
    }
  
}
export const getVerificationTokenByToken = async(token: string) => {
    try {
        const verification = await db.verificationToken.findUnique({
            where: {
                token
            }
            
    })
    return verification;
    } catch (error) {
        return null
    }
}