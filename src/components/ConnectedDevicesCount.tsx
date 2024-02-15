"use client";

import useStore from "@/lib/useStore";
import React from "react";
import { PiDevices } from "react-icons/pi";

const ConnectedDevicesCount = () => {
  const roomCount = useStore((state: any) => state.roomCount);
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl md:text-3xl text-primary">
        <PiDevices />
      </span>
      <span className="kbd scale-90">{roomCount}</span>
    </div>
  );
};

export default ConnectedDevicesCount;
