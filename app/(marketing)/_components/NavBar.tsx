"use client";
import useScrollHook from "@/hooks/use-scroll-hook";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
const NavBar = () => {
  const isScrolled = useScrollHook();

  return (
    <div
      className={cn(
        "p-6 z-10 bg-background fixed top-0 flex items-center w-full",
        isScrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex w-full md:justify-end justify-start ">
        {/* <Button variant='ghost' >
          LogIn
        </Button> */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
