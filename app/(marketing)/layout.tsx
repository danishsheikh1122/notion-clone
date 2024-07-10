import React from "react";
import NavBar from "./_components/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <NavBar></NavBar>
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default layout;
