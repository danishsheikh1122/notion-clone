"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const main = () => {
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const { user } = useUser();
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" }); //for every new file or folder
    toast.promise(promise,{
      loading:'creaitng a new note...',
      success:"new note created!",
      error:"failed to create a new note",
    })
  };

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
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="empty image"
        className="dark:block hidden"
      ></Image>

      <h2 className="capitalize text-lg font-medium ">
        welcome to {user?.firstName}&apos;s jotion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-5 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default main;
