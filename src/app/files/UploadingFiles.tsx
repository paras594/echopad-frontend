"use client";
import FileCard from "@/components/file-card/FileCard";
import useStore from "@/lib/useStore";
import React from "react";

const UploadingFiles = () => {
  const uploadingFiles = useStore((state) => state.uploadingFiles);

  if (!uploadingFiles.uploading) return null;

  return (
    <FileCard
      uploading={uploadingFiles.uploading}
      fileName={uploadingFiles.fileName}
      progress={uploadingFiles.progress}
      filesCount={uploadingFiles.filesCount}
    />
  );
};

export default UploadingFiles;
