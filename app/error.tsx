"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const error = () => {
  return (
    <div className="h-[100vh]  flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height={300}
        width={300}
        alt="error"
        className="dark:hidden"
      ></Image>
      <Image
        src="/error.png"
        height={300}
        width={300}
        alt="error"
        className="hidden dark:block"
      ></Image>
      <Button asChild>
        <Link href={"/documents"}> Go Back</Link>
      </Button>
    </div>
  );
};

export default error;
