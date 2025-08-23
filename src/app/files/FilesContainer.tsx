"use client";

import Image from "next/image";
import FilesList from "./FilesList";
import Wrapper from "./Wrapper";
import FilesSkeleton from "./FilesSkeleton";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import useStore from "@/lib/useStore";

type Props = {
  loadingFiles: boolean;
  loadingUser: boolean;
  files: any;
  isFetching: boolean;
  isRefetching: boolean;
};

const FilesContainer = ({
  loadingFiles,
  loadingUser,
  files = [],
  isFetching,
  isRefetching,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uploadingFiles = useStore((state) => state.uploadingFiles);

  useEffect(() => {
    containerRef.current && autoAnimate(containerRef.current);
  }, [containerRef]);

  if (loadingFiles || loadingUser)
    return (
      <div ref={containerRef}>
        <FilesSkeleton />
      </div>
    );

  if (
    files !== null &&
    files.length === 0 &&
    !uploadingFiles.uploading &&
    (!isFetching || !isRefetching)
  ) {
    return (
      <Wrapper>
        <div className="relative w-4/5 h-60 md:h-72 mx-auto">
          <Image src="/files-illustration.svg" alt="no files" fill />
        </div>
        <p className="text-center font-semibold text-lg text-gray-400">
          No Files Uploaded
        </p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FilesList files={files} isLoading={loadingFiles || loadingUser} />
    </Wrapper>
  );
};

export default FilesContainer;
