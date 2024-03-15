"use client";
import { newVerification } from "@/actions/new-verification";
import CardWrapper from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {  useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
const VerificationPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchparams=useSearchParams();
  const token=searchparams.get('token');
  useEffect(()=>{
    if(!token){
        setError("No token provided")
        return;
      }
       newVerification(token).then((data)=>{
        setSuccess(data.success),
        setError(data.error)
       }).catch(()=>setError("something went wrong"))
  },[token])
 

  return (
    <div>
      <CardWrapper
        title="Verification"
        label="oh! hi bro write somthign somewhere"
        backbtnhref="/auth/login"
        backbtnlabel="go back"
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && <BeatLoader />}
          {!error && <FormSuccess message={success} />}

          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>
    </div>
  );
};

export default VerificationPage;
