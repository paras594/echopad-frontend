"use client";

import useStore from "@/lib/useStore";
import React from "react";
import { PiDevices } from "react-icons/pi";

const ConnectedDevicesCount = () => {
  const roomCount = useStore((state: any) => state.roomCount);
  return (
    <details className="dropdown">
      <summary className="btn px-1 btn-ghost">
        <div className="flex items-center gap-1">
          <span className="text-2xl md:text-3xl text-primary">
            <PiDevices />
          </span>
          <span className="kbd kbd-sm text-xs md:text-base sm:kbd-md sm:scale-90">
            {roomCount > 9 ? "9+" : roomCount}
          </span>
        </div>
      </summary>
      <div className="px-4 py-4 shadow text-sm mt-2 dropdown-content z-50 -translate-x-1/2 bg-base-100 rounded-lg">
        <span className="text-lg font-semibold text-primary">{roomCount}</span>{" "}
        <p className="whitespace-nowrap">Devices Connected</p>
      </div>
    </details>
  );
};

export default ConnectedDevicesCount;
