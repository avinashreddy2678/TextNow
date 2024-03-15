"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import Social from "./social";
import { Button } from "../ui/button";

interface CardProps {
  children: React.ReactNode;
  title: string;
  label: string;
  backbtnlabel: string;
  backbtnhref: string;
  social?: boolean;
}
const CardWrapper = ({
  children,
  title,
  label,
  backbtnhref,
  backbtnlabel,
  social,
}: CardProps) => {
  return (
    <Card className="min-w-[400px]">
      <CardHeader className="text-center">
        <h1 className="text-3xl  font-semibold drop-shadow-md">{title}</h1>
        <div className="text-center text-gray-500">{label}</div>
      </CardHeader>

      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col">
        <div className="w-full">{social && <Social />}</div>
        <Button variant={"link"}>
          <Link href={backbtnhref} className="btn btn-primary">
            {backbtnlabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default CardWrapper;
