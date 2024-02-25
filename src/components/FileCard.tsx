"use client";

import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiDownloadSimple, PiFileLight, PiTrashSimple } from "react-icons/pi";

const FileCard = ({
  id,
  uploading,
  progress,
  fileName,
  createdAt,
  fileUrl,
  resourceType,
  format,
  publicId,
  onDelete,
  deleting,
}: any) => {
  const { data: session } = useSession();
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
    onDelete();
  };

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div
      className={`flex items-center gap-4 shadow border-t border-gray-100 rounded-lg py-3 px-3 ${
        deleting && "animate-pulse"
      }`}
    >
      <div className="text-2xl text-primary">
        <PiFileLight />
      </div>
      <div className="flex-1 grid">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap mb-1">
          {fileName}
        </p>
        {uploading ? (
          <progress
            className="progress w-full md:max-w-xs h-1 progress-info"
            value={progress || 0}
            max="100"
          ></progress>
        ) : deleting ? (
          <p className="text-red-500 text-xs">Deleting</p>
        ) : (
          <p className="text-xs text-gray-400">{formattedDate}</p>
        )}
      </div>
      <div>
        <details
          ref={fileCardDropdownRef}
          id="file-card-dropdown"
          className={`dropdown dropdown-end`}
        >
          <summary className="m-1 btn btn-sm btn-square btn-ghost text-xl">
            <HiOutlineDotsVertical />
          </summary>
          <ul className="p-2 border-t mt-2 border-gray-100 shadow menu gap-2 dropdown-content z-[1] bg-base-100 rounded-lg w-52">
            <li onClick={() => (fileCardDropdownRef.current.open = false)}>
              <a
                href={fileUrl}
                download
                target="_blank"
                className="text-black no-underline"
              >
                <div className="flex flex-row items-center gap-4">
                  <span className="text-xl">
                    <PiDownloadSimple />
                  </span>
                  <p className="text-black font-semibold">Download</p>
                </div>
              </a>
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
