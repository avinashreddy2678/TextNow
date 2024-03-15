"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-semibold text-white drop-shadow-lg">Auth 🔐</h1>
        <p className="text-lg text-white">A Simple Authentication service</p>
        <Button onClick={()=>router.push("/auth/login")} variant={"outline"}>Sign-up</Button>
      </div>
    </main>
  );
}
