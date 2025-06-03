"use client";
import { useQueryClient } from "@tanstack/react-query";
import { PiArrowClockwiseBold } from "react-icons/pi";

const RefetchFilesBtn = () => {
  const queryClient = useQueryClient();

  const refreshFiles = () => {
    queryClient.invalidateQueries({ queryKey: ["files"] });
  };

  return (
    <button
      className="btn btn-primary btn-outline md:text-xl btn-square btn-sm md:btn-md"
      onClick={refreshFiles}
    >
      <PiArrowClockwiseBold />
    </button>
  );
};

export default RefetchFilesBtn;
