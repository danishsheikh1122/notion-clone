"use client";
import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import NavBar from "../(marketing)/_components/NavBar";
import Navigation from "./_components/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size="lg"></Spinner>
      </div>
    );
  if (!isAuthenticated) return redirect("/");
  return (
    <div className="h-full flex">
      <Navigation></Navigation>
      <main className="flex-1 overflow-y-auto h-full">
        {children}</main>
    </div>
  );
};

export default layout;
