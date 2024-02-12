"use client";

import useStore from "@/lib/useStore";
import React from "react";
import { PiDevices } from "react-icons/pi";

const ConnectedDevicesCount = () => {
  const roomCount = useStore((state: any) => state.roomCount);
  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl text-white">
        <PiDevices />
      </span>
      <span className="kbd">{roomCount}</span>
    </div>
  );
};

export default ConnectedDevicesCount;
