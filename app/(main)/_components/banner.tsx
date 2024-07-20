"use client";
import ConfirmDelete from "@/components/modals/confirmmodel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
interface Props {
  doucmentId: Id<"document">;
}
const Banner = ({ doucmentId }: Props) => {
  const router = useRouter();
  const remove = useMutation(api.documents.deletePermanently);
  const restore = useMutation(api.documents.restoreTrash);

  const onRemove = () => {
    const prmouse = remove({ id: doucmentId });
    toast.promise(prmouse, {
      loading: "Deleting note...",
      success: "Note deleted",
      error: "Failed to delete note",
    });
    router.push("/documents");
  };
  const onRestore = () => {
    const prmouse = restore({ id: doucmentId });
    toast.promise(prmouse, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Failed to restore note",
    });
  };

  return (
    <div className="w-full">
    <div className="w-full bg-rose-500 text-center text-sm text-white flex items-center gap-x-2 justify-center p-2">
      <p>This page is in the trash</p>
      <Button
        onClick={onRestore}
        variant={"outline"}
        size={"sm"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmDelete onConfirm={onRemove}>
        <Button
          variant={"outline"}
          size={"sm"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmDelete>
    </div>
  </div>
  
  );
};

export default Banner;
