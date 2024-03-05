"use client";
import useInstallPWA from "@/hooks/use-install-pwa";

const TrialNTest = () => {
  const { handleInstallClick, isInstalled } = useInstallPWA();

  return (
    <div>
      <button onClick={handleInstallClick} className="btn btn-outline">
        Install
      </button>
      <p>Installed: {isInstalled.toString()}</p>
    </div>
  );
};

export default TrialNTest;
