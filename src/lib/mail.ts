import {Resend} from "resend"
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async(email:string,token:string,Otp:number)=>{
    // const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from:"onboardingg@resend.dev",
        to:email,
        subject: "Confirm your email",
        html:`<p>Otp for ${Otp}here </a> to confirm your email </p>`, 
    })
}
export const sendResetPasswordMail=async(email:string,token:string)=>{
    const confirmLink = `http://localhost:3000/auth/reset-password?token=${token}`;
    await resend.emails.send({
        from:"onboardingg@resend.dev",
        to:email,
        subject: "Reset your password",
        html:`<p>click <a href="${confirmLink}"> here </a> to reset your password </p>`, 
    })
}