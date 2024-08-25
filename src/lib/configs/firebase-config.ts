import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: "AIzaSyDdDzmr6st1LV-A5ooy0JeNM4l9sfgLS2Q",
        authDomain: "echopad-a314f.firebaseapp.com",
        projectId: "echopad-a314f",
        storageBucket: "echopad-a314f.appspot.com",
        messagingSenderId: "412327230158",
        appId: "1:412327230158:web:fbbb54f5153242ee37ee9f",
      });

export const auth = getAuth(firebaseApp);
