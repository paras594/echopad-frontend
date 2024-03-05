"use client";
import React, { useEffect, useRef } from "react";

const InstallPWABtn = () => {
  const defferedPrompt = useRef<any>(null);

  useEffect(() => {
    if (window) {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        console.log("beforeinstallprompt", e);

        defferedPrompt.current = e;
      });

      window.addEventListener("appinstalled", () => {
        // Hide the app-provided install promotion
        // hideInstallPromotion();
        // Clear the deferredPrompt so it can be garbage collected
        defferedPrompt.current = null;
        // Optionally, send analytics event to indicate successful install
        console.log("PWA was installed");
      });
    }
  }, [window]);

  const handleInstallClick = async () => {
    if (defferedPrompt.current) {
      defferedPrompt.current.prompt();

      const { outcome } = await defferedPrompt.current.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);

      defferedPrompt.current = null;
    }
  };

  return (
    <div>
      <button onClick={handleInstallClick} className="btn btn-primary">
        Install
      </button>
    </div>
  );
};

export default InstallPWABtn;
