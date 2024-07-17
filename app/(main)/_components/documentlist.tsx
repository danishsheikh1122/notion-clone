"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Item from "./item";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FileIcon } from "lucide-react";
import { Electrolize } from "next/font/google";

interface Props {
  parentDocumentId?: Id<"document"> | undefined;
  level?: number;
  data?: Doc<"document">;
}

const DocumentList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((expanded) => ({
      ...expanded,
      [documentId]: !expanded[documentId],
    }));
  };
  const doc = useQuery(api.documents.getSideBar, {
    parentDocument: parentDocumentId,
  });
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  if (document === undefined) {
    return (
      <>
        <Item.skeleton level={level} />
        {level === 0 && <Item.skeleton level={level} />}
      </>
    );
  }
  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {doc?.map((elem) => (
        <div key={elem._id}>
          <Item
            id={elem._id}
            onClick={() => onRedirect(elem._id)}
            label={elem.title}
            icons={FileIcon}
            documnetIcon={elem.icon}
            active={params.documentId === elem._id}
            level={level}
            onExpand={() => onExpand(elem._id)}
            expanded={expanded[elem._id]}
          />
          {expanded[elem._id] && (
            <DocumentList
              parentDocumentId={elem._id}
              level={level + 1}
            ></DocumentList>
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
