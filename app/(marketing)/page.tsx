import { Button } from "@/components/ui/button";
import React from "react";
import Heading from "./_components/heading";

const Home = () => {
  return (
    //   <div className="text-red-200 font-medium">
    //     {/* if you want to make a button varient that you want to use repeatedly then create varient and thenn use it   */}
    //     {/* <Button variant='purple'>click me</Button> */}
    //     <Button className="bg-emerald-200">click me</Button>
    //     {/* if you want to pass any other style then use class name */}
    //   </div>

    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-center text-center flex-1 gap-y-8 px-6 pb-10">
        <Heading />
      </div>
    </div>
  );
};

export default Home;
