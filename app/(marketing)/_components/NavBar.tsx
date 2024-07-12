"use client";
import useScrollHook from "@/hooks/use-scroll-hook";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { Span } from "next/dist/trace";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Spinner from "@/components/Spinner";
import Link from "next/link";
const NavBar = () => {
  const isScrolled = useScrollHook();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div
      className={cn(
        "p-6 z-10 bg-background fixed top-0 flex items-center w-full ",
        isScrolled && "border-b shadow-sm dark:border-zinc-600"
      )}
    >
      <Logo />
      <div className="flex w-full md:justify-end justify-between gap-x-3 items-center">
        {/* <Button variant='ghost' >
          LogIn
        </Button> */}

        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign Up
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Get Jotion Free
              </Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost">
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/"></UserButton>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
