"use client";
import Container from "@/components/Container";
import FileCard from "@/components/FileCard";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiInfo } from "react-icons/pi";
import autoAnimate from "@formkit/auto-animate";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { getIdToken } from "firebase/auth";

const Files = () => {
  const { user, loading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filesListRef = useRef<HTMLDivElement>(null);
  const [uploadingFile, setUploadingFile] = useState({
    uploading: false,
    progress: 0,
    fileName: "",
  });
  const [loadingUserFiles, setLoadingUserFiles] = useState(false);
  const [userFiles, setUserFiles] = useState<any[]>([]);
  const [deletingFile, setDeletingFile] = useState("");

  const fetchUserFiles = useCallback(async () => {
    if (!user) return;
    setLoadingUserFiles(true);

    const idToken = await getIdToken(user);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-files`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${idToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get user files");
    }

    setUserFiles(data.userFiles);
    setLoadingUserFiles(false);
  }, [user]);

  useEffect(() => {
    filesListRef.current && autoAnimate(filesListRef.current);
  }, [filesListRef]);

  useEffect(() => {
    if (!user) return;

    fetchUserFiles();
  }, [user, fetchUserFiles]);

  const handleUploadNewFileClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!user) return;

    const files = event.target.files;

    if (!files || files.length === 0) return;

    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    setUploadingFile({
      uploading: true,
      progress: 0,
      fileName: `Files (${files.length})`,
    });

    const idToken = await getIdToken(user);
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      console.log(`The transfer is completed: ${xhr.status} ${xhr.response}`);
      setUploadingFile({
        uploading: false,
        progress: 0,
        fileName: "",
      });
      fetchUserFiles();
    };

    xhr.onerror = () => {
      console.error("Download failed.");
      setUploadingFile({
        uploading: false,
        progress: 0,
        fileName: "",
      });
    };

    // listen for `abort` event
    xhr.onabort = () => {
      console.error("Download cancelled.");
    };

    xhr.upload.addEventListener("progress", (event) => {
      console.log(`Uploaded  ${event.loaded} of ${event.total} bytes`);
      const progress = Math.round((event.loaded / event.total) * 100);

      setUploadingFile((prevState) => ({
        ...prevState,
        uploading: true,
        progress,
      }));
    });

    xhr.open(
      "POST",
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-files/upload`
    );

    xhr.setRequestHeader("authorization", `Bearer ${idToken}`);

    xhr.send(data);
  };

  const handleDeleteFile = (fileId: string) => async () => {
    if (!user) return;
    try {
      setDeletingFile(fileId);
      const idToken = await getIdToken(user);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-files/${fileId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user file");
      }

      setDeletingFile("");

      fetchUserFiles();
    } catch (error) {
      console.log({ error });
    }
  };

  if (!loading && !user) return redirect("/login");

  return (
    <div className="mt-4 overflow-y-auto scrollable-content h-[80vh] md:h-screen">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Files Manager</h1>
            <details className="dropdown dropdown-start">
              <summary className="btn btn-sm btn-square text-xl btn-ghost text-gray-500">
                <PiInfo />
              </summary>
              <div className="px-4 py-4 mt-1 -translate-x-1/2 md:translate-x-0 shadow dropdown-content z-[1] bg-base-100 rounded-lg w-64 md:w-72">
                <ul className="list-disc pl-4 text-xs md:text-sm">
                  <li className="mb-2">Files will be deleted after 12 hours</li>
                  <li>Max files size is 20MB</li>
                </ul>
              </div>
            </details>
          </div>
          <button
            disabled={!user}
            onClick={handleUploadNewFileClick}
            className="btn btn-primary hidden md:flex"
          >
            Upload File
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4" ref={filesListRef}>
          {!loading &&
            !loadingUserFiles &&
            !userFiles.length &&
            !uploadingFile.uploading && (
              <div>
                <div className="relative w-4/5 h-60 md:h-72 mx-auto">
                  <Image src="/files-illustration.svg" alt="no files" fill />
                </div>
                <p className="text-center font-semibold text-lg text-gray-400">
                  No Files Uploaded
                </p>
              </div>
            )}
          {loadingUserFiles && (
            <div className="flex flex-col justify-center items-center">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          )}
          {uploadingFile.uploading && (
            <FileCard
              uploading={uploadingFile.uploading}
              fileName={uploadingFile.fileName}
              progress={uploadingFile.progress}
            />
          )}
          {userFiles.map((file) => (
            <FileCard
              key={file._id}
              id={file._id}
              progress={100}
              uploading={false}
              deleting={deletingFile === file._id}
              fileName={file.fileName}
              fileUrl={file.fileUrl}
              publicId={file.publicId}
              format={file.format}
              resourceType={file.resourceType}
              createdAt={file.createdAt}
              onDelete={handleDeleteFile(file._id)}
            />
          ))}
        </div>
      </Container>
      <div className="h-40 w-full" />
      <div className="bg-white fixed bottom-0 left-0 right-0 py-4 md:hidden">
        <Container>
          <div className="flex justify-center">
            <input
              ref={fileInputRef}
              type="file"
              defaultValue=""
              key={Date.now()}
              onChange={handleFileInputChange}
              className="hidden"
              multiple
            />
            <button
              disabled={!user}
              onClick={handleUploadNewFileClick}
              className="btn btn-block md:btn-wide btn-primary"
            >
              Upload New File
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Files;
