"use client";
import React, { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const filesListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    filesListRef.current && autoAnimate(filesListRef.current);
  }, [filesListRef]);

  return (
    <div className="mt-6 flex flex-col gap-4" ref={filesListRef}>
      {children}
    </div>
  );
};

export default Wrapper;
