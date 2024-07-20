"use client";
import CoverComponent from "@/components/CoverComponent";
import Editor from "@/components/Editor";
import ToolBar from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React from "react";

interface DocumentIdPage {
  params: {
    id: Id<"document">;
  };
}
const DocumentIdPage = ({ params: { id } }: DocumentIdPage) => {
  const document = useQuery(api.documents.PreviewgetById, { id: id });
  const update = useMutation(api.documents.update);
  const onChange=(content:string)=>{
    update({
      id: id,
      content: content,
    });

  }

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
      <CoverComponent preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <ToolBar preview initialData={document}></ToolBar>
        <Editor editable={false} onChange={onChange} initialValue={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
