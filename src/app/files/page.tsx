"use client";

import Container from "@/components/Container";
import PageTitle from "./PageTitle";
import FileUpload from "./FileUpload";
import FilesContainer from "./FilesContainer";
import RefetchFilesBtn from "./RefetchFilesBtn";
import UploadingFiles from "./UploadingFiles";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { getIdToken } from "firebase/auth";

async function fetchData(token: string) {
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

const Files = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user, loading: loadingUser } = useAuth();
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

  const handleDownloadAllFiles = async () => {
    for (let i = 0; i < data.length; i++) {
      const { fileUrl, fileName } = data[i];

      // Wait a bit between downloads to avoid browser blocking
      await new Promise((resolve) => setTimeout(resolve, 500));

      const blob = await fetch(fileUrl).then((res) => res.blob());
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      a.click();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    }
  };

  return (
    <div className="mt-4 overflow-y-auto scrollable-content h-[80vh] md:h-screen">
      <Container>
        <div className="flex justify-between items-center">
          <PageTitle />
          <div className="flex items-center gap-2 md:gap-4">
            <RefetchFilesBtn />
            <button
              className="btn btn-outline btn-sm md:btn-md"
              onClick={handleDownloadAllFiles}
            >
              <span className="text-xl hidden md:block">
                <PiDownloadSimpleBold />
              </span>
              <span>Download All</span>
            </button>

            <div className="hidden md:block">
              <FileUpload />
            </div>
          </div>
        </div>

        <div className="h-6" />
        <div ref={containerRef}>
          <UploadingFiles />
        </div>
        <FilesContainer
          loadingFiles={loadingFiles}
          loadingUser={loadingUser}
          files={data}
          isFetching={isFetching}
          isRefetching={isRefetching}
        />
      </Container>
      <div className="h-40 w-full" />
      <div className="bg-white border-t-0 fixed bottom-0 left-0 right-0 py-4 md:hidden">
        <Container>
          <FileUpload btnClasses="btn-block" />
        </Container>
      </div>
    </div>
  );
};

export default Files;
