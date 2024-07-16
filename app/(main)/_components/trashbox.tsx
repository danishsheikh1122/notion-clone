"use client";
import ConfirmDelete from "@/components/modals/confirmmodel";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Dice1, DockIcon, Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { setUncaughtExceptionCaptureCallback } from "process";
import React, { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const param = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restoreTrash);
  const remove = useMutation(api.documents.deletePermanently);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClick = (documentId: string) => {
    // router.push(`/document/${documentId}`);
  };
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"document">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note Restored",
      error: "Failed to restore note",
    });
    // if (param.documentId === documentId) router.push(`/document`);
  };
  const onRemove = (documentId: Id<"document">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleting",
      error: "Failed to delete note",
    });
    if (param.documentId === documentId) router.push(`/document`);
  };

  if (document === undefined)
    <div className="h-full flex items-center justify-center p-4">
      <Spinner size="lg"></Spinner>
    </div>;
  return (
    <div className=" text-sm ">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4"></Search>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        ></Input>
      </div>
      <div className="mt-2 px-1 pb-1"></div>
      <p className="hidden last:block text-xx text-center text-muted-foreground pb-2 ">
        No document inside
      </p>
      {filteredDocuments?.map((doc) => (
        <div
          key={doc._id}
          role="button"
          onClick={() => onClick(doc._id)}
          className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
        >
          <span className="truncate pl-2">{doc.title}</span>
          <div className="flex items-center ">
            <div
              role="button"
              onClick={(e) => onRestore(e, doc._id)}
              className=" rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            >
              <Undo className="h-4 w-4 text-muted-foreground "></Undo>
            </div>
            <ConfirmDelete onConfirm={()=>onRemove(doc._id)}>
              <div
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                role="button"
              >
                <Trash className="h-4 w-4"></Trash>
              </div>
            </ConfirmDelete>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrashBox;
