"use client";
import { ImageDropDown } from "@/components/single-image-drop-down";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import CoverComponent from "../CoverComponent";
export const CoverImageModel = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const converImage = useCoverImage();
  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    converImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      const res = await edgestore.publicFiles.upload({
        file,
        options: { replaceTargetUrl: converImage.url },
      });
      await update({ id: params.id as Id<"document">, coverImage: res.url });
      onClose();
    }
  };

  return (
    <Dialog open={converImage.isOpen} onOpenChange={converImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <ImageDropDown
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
