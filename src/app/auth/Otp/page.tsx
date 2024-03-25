"use client";
import otpverification from "@/actions/otpverification";
import CardWrapper from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { startTransition, useEffect, useRef, useState } from "react";

const OtpPage = () => {
  const [success, SetSuccess] = useState<string | undefined>();
  const [error, SetError] = useState<string | undefined>();
  // console.log(success,error)
  const router = useRouter();

  // getting token from params
  const searchparams = useSearchParams();
  const token = searchparams.get("token");
  useEffect(() => {
    if (!token) {
      SetError("No token provided");
      return;
    }
  }, [token]);

  const [Otpinput, setInput] = useState<number[]>(Array(4).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const onSubmit = (CombinedOtp: Number) => {
    startTransition(() => {
      otpverification(CombinedOtp, token).then((data: any) => {
        if (data?.error) {
          SetError(data?.error);
          SetSuccess("");
        }
        if (data?.success) {
          SetSuccess(data?.success);
          SetError(""),
            setTimeout(() => {
              router.push("/auth/login");
            }, 2000);
        }
      });
    });
  };

  const [timer, setTimer] = useState(59);
  const handleClick = (index: any) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };
  const handleChange = (e: any, index: any) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...Otpinput];

    newOtp[index] = value.substring(value.length - 1);
    setInput(newOtp);
    const CombinedOtp = newOtp.join("");
    if (CombinedOtp.length === 4) {
      onSubmit(Number(CombinedOtp));
    }
    if (index < 3 && value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e: any, index: any) => {
    if (
      e.key === "Backspace" &&
      !Otpinput[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <CardWrapper
        title="Enter Otp here"
        label="check and enter otp my myan"
        backbtnhref="/auth/Login"
        backbtnlabel="back to login"
      >
        <div className="flex flex-col justify-start">
          <div className="flex justify-center">
            {Otpinput.map((value, index) => (
              <Input
                disabled={timer === 0}
                ref={(input) =>
                  input ? (inputRefs.current[index] = input) : ""
                }
                value={value}
                onClick={() => {
                  handleClick(index);
                }}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, index);
                }}
                key={index}
                className="border-2 w-[50px] mx-1"
              />
            ))}
          </div>
          {(error !== undefined && success?.length !== 0 )? (
            <FormSuccess message={success} />
          ) : (
            ""
          )}

          {(success !== undefined && error?.length!==0) ? <FormError message={error} /> : ""}

          <Button
            disabled={timer === 0}
            variant="link"
            asChild
            className="px-0 font-normal"
          >
            {timer===0 ? (
              <Link href="/auth/login">resend otp?</Link>
            ) : (
              <div className="text-center">
                00:{timer}
              </div>
            
            )}
          </Button>
        </div>
      </CardWrapper>
    </div>
  );
};

export default OtpPage;
