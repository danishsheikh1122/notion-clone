'use client';
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./title";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const NavBar = ({ onResetWidth, isCollapsed }: Props) => {
  const params = useParams();

  // Ensure params.id is defined
  if (!params.id) {
    return <div>Loading...</div>;
  }

  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const document = useQuery(api.documents.getById, {
    id: params.id as Id<"document">,
  });

  if (document === undefined) return <nav className="bg-background px-3 py-3 w-full flex items-center ">

    <Title.Skeleton></Title.Skeleton>
  </nav>;
  if (document === null) return null;

  return (
    <nav className="bg-background px-3 py-3 w-full flex items-center gap-x-4">
      {isCollapsed && (
        <MenuIcon
          role="button"
          onClick={onResetWidth}
          className="h-6 w-6 text-muted-foreground"
        />
      )}
      <div className="flex items-center w-full justify-between">
        <Title initialData={document}></Title>
      </div>
    </nav>
  );
};

export default NavBar;
