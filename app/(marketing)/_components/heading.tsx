"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const heading = () => {
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h2 className="text-base sm:text-xl md:text-2xl font-medium ">
        Jotion is the connected workspace where <br /> better, faster work
        happens.
      </h2>

      {!isAuthenticated && isLoading && (
        <div className="w-full flex justify-center items-center">
          <Spinner></Spinner>
        </div>
      )}

      {!isAuthenticated && !isLoading && (
        <Button className="capitalize" asChild>
          <SignInButton mode="modal">
            get jotion free
            {/* <ArrowRight className="h-4 w-4 ml-2"></ArrowRight> */}
          </SignInButton>
        </Button>
      )}

      {isAuthenticated && !isLoading && (
        <Button className="capitalize" asChild>
          <Link href="/documents">
            enter jotion
            <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default heading;
