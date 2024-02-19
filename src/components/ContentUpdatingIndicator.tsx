"use client";

import useUpdatingContentStore from "@/lib/useUpdatingContentStore";
import { useEffect, useState } from "react";
import { AiOutlineSync } from "react-icons/ai";
import { BsCloudCheck } from "react-icons/bs";

const ContentUpdatingIndicator = () => {
  const { isUpdating } = useUpdatingContentStore((state: any) => state);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!isUpdating) {
      setTimeout(() => {
        setHide(true);
      }, 2000);
    }

    if (isUpdating) {
      setTimeout(() => {
        setHide(false);
      }, 0);
    }
  }, [isUpdating]);

  return (
    <div
      className={`transition duration-300 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
    >
      {isUpdating ? (
        <span className="animate-spin block text-lg">
          <AiOutlineSync />
        </span>
      ) : (
        <span className="text-lg text-green-600">
          <BsCloudCheck />
        </span>
      )}
    </div>
  );
};

export default ContentUpdatingIndicator;
