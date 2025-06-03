"use client";

import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getIdToken } from "firebase/auth";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiDownloadSimple, PiTrashSimple } from "react-icons/pi";
import { useAuth } from "@/contexts/auth-context";
import { fileTypeIcons } from "@/utils/file-type-icons";

async function deleteFile({
  fileId,
  token,
}: {
  fileId: string;
  token: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-files/${fileId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete user file");
    }
  } catch (error) {
    console.log({ error });
  }
}

const FileCard = ({
  id,
  uploading,
  progress,
  fileName,
  filesCount,
  createdAt,
  fileUrl,
  format,
}: any) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
  const fileCardDropdownRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        fileCardDropdownRef.current &&
        !fileCardDropdownRef.current.contains(event.target)
      ) {
        fileCardDropdownRef.current.open = false;
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleDeleteClick = async () => {
    fileCardDropdownRef.current.open = false;
    if (!user) return;
    const token = await getIdToken(user);
    mutation.mutate({
      fileId: id,
      token,
    });
  };

  const handleFileDownload = async () => {
    const blob = await fetch(fileUrl).then((res) => res.blob());
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = fileName;
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    });
  };

  const formattedDate = new Date(createdAt).toLocaleString();

  const FileIcon = fileTypeIcons[format] || fileTypeIcons.default;

  const deleting = mutation.isPending;
  return (
    <div
      className={`flex items-center gap-4 shadow border-t border-gray-100 rounded-lg py-3 px-3 ${
        deleting && "animate-pulse"
      }`}
    >
      <div className="text-2xl text-primary">
        <FileIcon />
      </div>
      <div className="flex-1 grid">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap mb-1">
          {fileName}
        </p>

        {uploading ? (
          <div className="flex items-center gap-2">
            <p className="text-xs whitespace-nowrap">
              {filesCount} file{filesCount > 1 && "s"}
            </p>
            <progress
              className="progress w-full md:max-w-xs h-1 progress-info"
              value={progress || 0}
              max="100"
            ></progress>
          </div>
        ) : deleting ? (
          <p className="text-red-500 text-xs">Deleting</p>
        ) : (
          <p className="text-xs text-gray-400">{formattedDate}</p>
        )}
      </div>
      <div>
        <div className="md:flex gap-2 hidden">
          <button
            onClick={handleFileDownload}
            className="text-black no-underline btn btn-ghost"
          >
            <span className="text-xl">
              <PiDownloadSimple />
            </span>
            <p className="text-black font-semibold">Download</p>
          </button>
          <div onClick={handleDeleteClick} className="btn btn-ghost">
            <span className="text-xl text-red-500">
              <PiTrashSimple />
            </span>
            <p className="text-red-500 font-semibold">Delete</p>
          </div>
        </div>
        <details
          ref={fileCardDropdownRef}
          id="file-card-dropdown"
          className={`dropdown dropdown-end md:hidden`}
        >
          <summary className="m-1 btn btn-sm btn-square btn-ghost text-xl">
            <HiOutlineDotsVertical />
          </summary>
          <ul className="p-2 border-t mt-2 border-gray-100 shadow menu gap-2 dropdown-content z-[1] bg-base-100 rounded-lg w-52">
            <li onClick={() => (fileCardDropdownRef.current.open = false)}>
              <button
                onClick={handleFileDownload}
                className="text-black no-underline"
              >
                <div className="flex flex-row items-center gap-4">
                  <span className="text-xl">
                    <PiDownloadSimple />
                  </span>
                  <p className="text-black font-semibold">Download</p>
                </div>
              </button>
            </li>
            <li onClick={handleDeleteClick}>
              <div className="flex flex-row items-center gap-4">
                <span className="text-xl text-red-500">
                  <PiTrashSimple />
                </span>
                <p className="text-red-500 font-semibold">Delete</p>
              </div>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default FileCard;
