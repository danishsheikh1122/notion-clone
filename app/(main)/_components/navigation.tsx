"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Rewind } from "lucide-react";
import { calculateOverrideValues } from "next/dist/server/font-utils";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [sidebarWidth, setSidebarWidth] = useState(isMobile ? 0 : 240);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) {
      collapse( );
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      setSidebarWidth(newWidth);
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-40px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar flex flex-col relative z-[99999] overflow-y-auto bg-secondary h-full w-[240px]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile ? "w-0" : `w-[${sidebarWidth}px]`
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100 opacity-0 absolute right-2 top-3 rounded-md ",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>Action items</div>
        <div className="mt-4 bg-">documents</div>
        <div
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999]",
          isResetting && "translate-all ease-in-out duration-300",
          isMobile
            ? "left-0 w-full"
            : `left-[${sidebarWidth}px] w-[calc(100% - ${sidebarWidth}px)]`
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              role="button"
              className="h-6 w-6 text-muted-foreground"
              onClick={resetWidth}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
