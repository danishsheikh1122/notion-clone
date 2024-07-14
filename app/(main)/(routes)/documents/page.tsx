"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const main = () => {
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const { user } = useUser();
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4 ">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="empty image"
        className="dark:hidden"
      ></Image>
      <Image
        src="/empty-dark`.png"
        height="300"
        width="300"
        alt="empty image"
        className="dark:block hidden"
      ></Image>

      <h2 className="capitalize text-lg font-medium ">
        welcome to {user?.firstName}&apos;s jotion
      </h2>
      <Button>
        <PlusCircle className="w-4 h-5 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default main;
