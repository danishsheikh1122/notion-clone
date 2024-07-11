import React from "react";
import { Loader } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const spinnerVariant = cva("text-muted-foregorund animate-spin", {
  variants: {
    size: {
      default: "w-4 h-4",
      sm: "w-2 h-2",
      lg: "w-6 h-6",
      icon: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface spinnerProps extends VariantProps<typeof spinnerVariant> {}

export const Spinner = ({ size }: spinnerProps) => {
  return <Loader className={cn(spinnerVariant({ size }))}></Loader>;
};

export default Spinner;
