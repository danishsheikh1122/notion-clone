"use client";
import CoverComponent from "@/components/CoverComponent";
import ToolBar from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";

interface DocumentIdPage {
  params: {
    id: Id<"document">;
  };
}
const documentIdPage = ({ params: { id } }: DocumentIdPage) => {
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const document = useQuery(api.documents.getById, { id: id });

  if (document === undefined)
    return (
      <div>
        <CoverComponent.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]"></Skeleton>
            <Skeleton className="h-4 w-[80%]"></Skeleton>
            <Skeleton className="h- 4 w-[40%]"></Skeleton>
            <Skeleton className="h-4 w-[60% ]"></Skeleton>
          </div>
        </div>
      </div>
    );
  if (document === null) return <div> not found</div>;
  return (
    <div className="pb-40">
      <CoverComponent url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <ToolBar initialData={document}></ToolBar>
        <Editor 
        onChange={()={}}
        initialValue={document.content}/>
      </div>
    </div>
  );
};

export default documentIdPage;
