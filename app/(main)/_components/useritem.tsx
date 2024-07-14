"use client";
import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="max-w-[150px] flex item-center gap-x-2">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}&apos;s Jotin
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 h-4 w-4 text-muted-foreground"></ChevronsLeftRight>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-zinc-200 rounded-lg"
        align="start"
        alignOffset={11}
        // forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs text-muted-foreground font-medium leading-none">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-xl bg-secondary ">
              <Avatar>
                <AvatarImage
                  src={user?.imageUrl}
                  className="h-8 w-8 rounded-xl"
                ></AvatarImage>
              </Avatar>
            </div>
            <div>{user?.fullName}&apos; Jotion</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
