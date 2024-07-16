"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
  CheckIcon,
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  id?: Id<"document">;
  documnetIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icons: LucideIcon;
}

const Item = ({
  label,
  onClick,
  icons: Icon,
  id,
  documnetIcon,
  active,
  onExpand,
  expanded,
  level = 0,
  isSearch,
}: Props) => {
  const handelExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };
  const { user } = useUser();

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id });
    toast.promise(promise, {
      loading: "Moving to trash",
      success: "Note moved to trash",
      error: "Failed to archive note.",
    });
  };
  const router = useRouter();
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`documents/${documentId}`)
      }
    );
    toast.promise(promise, {
      loading: "creaitng a new note...",
      success: "new note created!",
      error: "failed to create a new note",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }} //this will push all the icons left and left if it is nested
      className={cn(
        "group flex capitalize text-muted-foreground items-center gap-x-2 text-sm pr-3 py-1 w-full hover:bg-primary/5",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handelExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documnetIcon ? (
        <div className=" shrink-0 text-[18px] mr-2 text-muted-foreground">
          {documnetIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-1 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="dark:bg-neutral-600 text-xs pointer-events-none ml-auto select-none items-center  inline-flex h-5 gap-1 rounded bg-white px-1.5 font-mono text-[10px] opacity-100 font-medium text-foreground ">
          <span>⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 ">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 "
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="p-2 text-muted-foreground text-xs  ">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className=" opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 "
            role="button"
            onClick={onCreate}
          >
            <Plus className="h-4 w-4 text-muted-foreground dark:hover:bg-neutral-600 rounded-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;

Item.skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px] "
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
