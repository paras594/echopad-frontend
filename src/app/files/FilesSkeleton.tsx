"use client";
import FileCardSkeleton from "@/components/file-card/FileCardSkeleton";
import React from "react";

const FilesSkeleton = () => {
  return [9, 6, 5, 4, 3].map((i) => (
    <div key={i} className="my-4" style={{ opacity: i / 10 }}>
      <FileCardSkeleton />
    </div>
  ));
};

export default FilesSkeleton;
