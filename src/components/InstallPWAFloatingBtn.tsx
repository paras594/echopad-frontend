"use client";
import React from "react";
import { PiDownload } from "react-icons/pi";
import useInstallPWA from "@/hooks/use-install-pwa";

const InstallPWAFloatingBtn = () => {
  const { handleInstallClick, isInstalled } = useInstallPWA();

  if (isInstalled) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="btn flex-col btn-circle md:hidden gap-0"
    >
      <span className="text-xl">
        <PiDownload />
      </span>
      <span className="text-[8px] md:text-xs">Install</span>
    </button>
  );
};

export default InstallPWAFloatingBtn;
