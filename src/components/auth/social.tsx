"use client"
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/Allroutes";

const Social = () => {
  const onClick=(provider:string)=>{
    signIn(provider,{
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <>
      <div className="w-full gap-2 flex">
        <Button onClick={()=>{onClick('google')}} className="w-full gap-2" variant={"outline"}>
          <FcGoogle />
          Google
        </Button>
        <Button onClick={()=>{onClick('github')}} className="w-full gap-2" variant={"outline"}>
          <FaGithub />
          Githuub
        </Button>
      </div>
    </>
  );
};

export default Social;
