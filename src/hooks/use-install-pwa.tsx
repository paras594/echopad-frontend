"use client";
import { useEffect, useState } from "react";

const useInstallPWA = () => {
  const [defferedPrompt, setDefferedPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window) {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();

        setDefferedPrompt(e);
      });

      window.addEventListener("appinstalled", () => {
        // hideInstallPromotion();
        // Clear the deferredPrompt so it can be garbage collected
        setDefferedPrompt(null);
        // Optionally, send analytics event to indicate successful install
        console.log("PWA was installed");
        setIsInstalled(true);
      });

      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
        setDefferedPrompt(null);
      }
    }
  }, [window]);

  const handleInstallClick = async () => {
    if (defferedPrompt) {
      defferedPrompt.prompt();

      const { outcome } = await defferedPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
    }
  };

  return {
    handleInstallClick,
    defferedPrompt,
    isInstalled: !defferedPrompt || isInstalled,
  };
};

export default useInstallPWA;
