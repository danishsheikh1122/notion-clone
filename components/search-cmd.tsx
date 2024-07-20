"use client";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File, FileIcon, UserSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

const SearchCmd = () => {
  const router = useRouter();
  const { user } = useUser();
  const documents = useQuery(api.documents.getSearch);
  const toggle = useSearch((store) => store.toggel);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    let str = id;
    let charToRemoveFrom = "-";

    // Find the starting index of the character to remove from
    let startIndex = str.indexOf(charToRemoveFrom);

    if (startIndex !== -1) {
      // Extract the part of the string before the character
      let newStr = str.substring(0, startIndex);
      router.push(`/documents/${newStr}`);
      onClose();
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput
          placeholder={`Search ${user?.fullName}'s Jotino...`}
        ></CommandInput>
        <CommandList>
          <CommandGroup heading="Documents">
            {documents?.map((doc) => (
              <CommandItem
                key={doc._id}
                value={`${doc._id}-${doc.title}`}
                title={doc.title}
                onSelect={onSelect}
              >
                {doc.icon ? (
                  <p className="mr-2 text-[18px]">{doc.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4"></File>
                )}
                <span>{doc.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchCmd;
