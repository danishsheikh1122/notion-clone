import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-pink-50 h-full">{children}</div>;
};

export default RootLayout;
