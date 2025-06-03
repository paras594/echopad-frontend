"use client";

import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getIdToken } from "firebase/auth";
import { useAuth } from "@/contexts/auth-context";
import useStore from "@/lib/useStore";

const FileUpload = ({ btnClasses = "" }: { btnClasses?: string }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const setUploadingFiles = useStore((state) => state.setUploadingFiles);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadNewFileClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFilesSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!user) return;

    const files = Array.prototype.slice.call(event.target.files);

    if (!files || files.length === 0) return;

    const data = new FormData();

    files.forEach((file) => {
      data.append("files", file);
    });

    setUploadingFiles({
      uploading: true,
      fileName: files.map((file) => file.name).join(", "),
      progress: 0,
      filesCount: files.length,
    });

    const idToken = await getIdToken(user);
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      console.log(`The transfer is completed: ${xhr.status} ${xhr.response}`);
      setUploadingFiles({
        uploading: false,
        progress: 0,
        fileName: "",
        filesCount: files.length,
      });

      queryClient.invalidateQueries({ queryKey: ["files"] });
    };

    xhr.onerror = () => {
      console.error("Download failed.");
      setUploadingFiles({
        uploading: false,
        progress: 0,
        fileName: "",
        filesCount: 0,
      });
    };

    // listen for `abort` event
    xhr.onabort = () => {
      console.error("Download cancelled.");
    };

    xhr.upload.addEventListener("progress", (event) => {
      console.log(`Uploaded  ${event.loaded} of ${event.total} bytes`);
      const progress = Math.round((event.loaded / event.total) * 100);

      setUploadingFiles({
        fileName: files.map((file) => file.name).join(", "),
        uploading: true,
        progress,
        filesCount: files.length,
      });
    });

    xhr.open(
      "POST",
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-files/upload`,
    );

    xhr.setRequestHeader("authorization", `Bearer ${idToken}`);

    xhr.send(data);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        defaultValue=""
        key={Date.now()}
        onChange={handleFilesSubmit}
        className="hidden"
        multiple
      />
      <button
        onClick={handleUploadNewFileClick}
        className={`btn btn-primary ${btnClasses}`}
      >
        Upload Files
      </button>
    </>
  );
};

export default FileUpload;
