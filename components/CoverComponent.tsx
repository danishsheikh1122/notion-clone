import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface Props {
  url?: string;
  preview?: boolean;
}
const CoverComponent = ({ url, preview }: Props) => {
  const params = useParams();
  const CoverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.id as Id<"document">,
    });
  };
  const { edgestore } = useEdgeStore();
  return (
    <div
      className={cn(
        "w-full relative h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} fill alt="cover" className="object-cover"></Image>
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => CoverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 2-4 mr-2"></ImageIcon>
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 2-4   mr-2"></X>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoverComponent;


CoverComponent.Skeleton = function CoverComponentSkeleton() {
    return( 
        <Skeleton className="w-full h-[12vh]"></Skeleton>
    )

}