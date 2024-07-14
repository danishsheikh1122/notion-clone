"use client";
import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_components/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading)
    return (
      <div className="absolute left-[50%] top-[50%]">
        <Spinner size="lg"></Spinner>
      </div>
    );
  if (!isAuthenticated) return redirect("/");
  return (
    <div className="h-screen flex">
      {/* instead of h-full we used h-screen */}
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default layout;
