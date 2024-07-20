import { Doc } from "@/convex/_generated/dataModel";
import React, { useState } from "react";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { mutation } from "@/convex/_generated/server";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Check, Copy, Divide, Ghost, Globe, Goal } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  initialData: Doc<"document">;
}
const publish = ({ initialData }: Props) => {
  // Publish logic goes here
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const origin = useOrigin();
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const update = useMutation(api.documents.update);

  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const [copied, setCopied] = useState(false);
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;
  /* trunk-ignore(eslint) */

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublisher: true,
    }).finally(() => setIsSubmitting(false));
    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published!",
      error: "Failed to publish",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublisher: false,
    }).finally(() => setIsSubmitting(false));
    toast.promise(promise, {
      loading: "UnPublishing...",
      success: "Note Published!",
      error: "Failed to unpublish note",
    });
  };
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          Publish
          {initialData.isPublisher && (
            <Globe className="h-4 w-4 ml-2 text-sky-500"></Globe>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" forceMount align="end" alignOffset={8}>
        {initialData.isPublisher ? (
          <div className="space-y-4 ">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4"></Globe>
              <p className="text-xs font-medium text-sky-500">
                This note is live in web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none  "
              >
                {copied ? (
                  <Check className="h-4 w-4"></Check>
                ) : (
                  <Copy className="h-4 w-4"></Copy>
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >Unpublish</Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2 "></Globe>
            <p className="text-sm font-medium mb-2"></p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              className="w-full text-xs"
              onClick={onPublish}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default publish;
