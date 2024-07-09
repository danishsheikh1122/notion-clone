import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div className="text-red-200 font-medium">
      {/* if you want to make a button varient that you want to use repeatedly then create varient and thenn use it   */}
      {/* <Button variant='purple'>click me</Button> */}
      <Button className="bg-emerald-200">click me</Button>
      {/* if you want to pass any other style then use class name */}
    </div>
  );
};

export default Home;
