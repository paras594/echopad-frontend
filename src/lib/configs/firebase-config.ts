import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: "AIzaSyAVbE1CD58zz0jg6YwYgT0j_0wSHUzN0nQ",
        authDomain: "echopad-460805.firebaseapp.com",
        projectId: "echopad-460805",
        storageBucket: "echopad-460805.firebasestorage.app",
        messagingSenderId: "383860536783",
        appId: "1:383860536783:web:63904e8a6e97547e654eba",
        measurementId: "G-2MT939MFC7",
      });

export const auth = getAuth(firebaseApp);
