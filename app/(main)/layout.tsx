"use client";
import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_components/navigation";
import SearchCmd from "@/components/search-cmd";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
      <SearchCmd></SearchCmd>
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
