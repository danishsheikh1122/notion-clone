import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2 ">
      <Image src="/logo.svg" height="40" width="40" alt="logo"/>
      <span className={cn('font-semibold',font.className)}>Jotion</span>
    </div>
  );
};

export default logo;
