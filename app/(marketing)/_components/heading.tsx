import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import React from "react";

const heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h2 className="text-base sm:text-xl md:text-2xl font-medium ">
        Jotion is the connected workspace where <br /> better, faster work happens.
      </h2>

      <Button className="capitalize">
        enter jotion
        <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
      </Button>
    </div>
  );
};

export default heading;
