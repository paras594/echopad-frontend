"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getIdToken } from "firebase/auth";
import { useAuth } from "@/contexts/auth-context";
import useStore from "@/lib/useStore";

const FileUpload = ({ btnClasses = "" }: { btnClasses?: string }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const setUploadingFiles = useStore((state) => state.setUploadingFiles);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clear input value on mount
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  }, [fileInputRef]);

  const handleUploadNewFileClick = () => {
    setTimeout(() => {
      fileInputRef?.current?.click();
    }, 100);
  };

  const handleFilesSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!user) return;

    const fileList = event.target.files;

    console.log("FileList:", fileList);

    if (!fileList || fileList.length === 0) {
      console.log("No files selected");
      return;
    }

    const files = Array.from(fileList);
    if (!files || files.length === 0) return;

    const data = new FormData();

    files.forEach((file) => {
      data.append("files", file);
    });

    // Log FormData contents (for debugging)
    console.log("FormData entries:");
    for (const pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

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
      setUploadingFiles({
        uploading: false,
        progress: 0,
        fileName: "",
        filesCount: 0,
      });
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        defaultValue=""
        onChange={handleFilesSubmit}
        className="hidden"
        multiple
        accept="*/*"
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
