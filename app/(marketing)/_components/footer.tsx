import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";

const footer = () => {
  return (
    <div className="w-full z-10 px-6 py-1 flex items-center bg-background justify-between">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2">
        <Button variant="ghost">Privacy Policy</Button>
        <Button variant="ghost">Terms&Conditions</Button>
      </div>
    </div>
  );
};

export default footer;
