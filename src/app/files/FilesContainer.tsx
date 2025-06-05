"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import FilesList from "./FilesList";
import Wrapper from "./Wrapper";
import { getIdToken } from "firebase/auth";
import FilesSkeleton from "./FilesSkeleton";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import useStore from "@/lib/useStore";

export async function fetchData(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-files`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return data;
}

const FilesContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user, loading: loadingUser } = useAuth();
  const uploadingFiles = useStore((state) => state.uploadingFiles);
  const {
    data,
    isFetching,
    isRefetching,
    isLoading: loadingFiles,
  } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const token = await getIdToken(user!);
      const data = await fetchData(token);

      return data.userFiles;
    },
    enabled: !!user,
  });

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
    data !== null &&
    data.length === 0 &&
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
      <FilesList files={data || []} isLoading={loadingFiles || loadingUser} />
    </Wrapper>
  );
};

export default FilesContainer;
