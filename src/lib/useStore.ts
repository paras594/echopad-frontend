import { User } from "firebase/auth";
import { create } from "zustand";

interface State {
  // State
  isLoggedIn: boolean;
  email: string;
  name: string;
  roomCount: number;
  userContent: string;
  isUpdatingUserContent: boolean;
  uploadingFiles: {
    uploading: boolean;
    fileName: string;
    progress: number;
    filesCount: number;
  };

  // Actions
  setRoomCount: (count: number) => void;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: User) => void;
  setUserContent: (content: string) => void;
  setIsUpdatingUserContent: (value: boolean) => void;
  setUploadingFiles: ({
    uploading,
    fileName,
    progress,
    filesCount,
  }: any) => void;
}

const useStore = create<State>((set) => ({
  // State
  isLoggedIn: false,
  email: "",
  name: "",
  roomCount: 0,
  userContent: "",
  isUpdatingUserContent: false,
  uploadingFiles: {
    uploading: false,
    fileName: "",
    progress: 0,
    filesCount: 0,
  },

  // Actions
  setRoomCount: (count: number) => set((state: any) => ({ roomCount: count })),
  setIsLoggedIn: (value: boolean) => set(() => ({ isLoggedIn: value })),
  setUser: ({ name, email }: any) => set(() => ({ name, email })),
  setUserContent: (content: string) => set(() => ({ userContent: content })),
  setIsUpdatingUserContent: (value: boolean) =>
    set(() => ({ isUpdatingUserContent: value })),
  setUploadingFiles: ({ uploading, fileName, progress, filesCount }: any) =>
    set(() => ({
      uploadingFiles: { uploading, fileName, progress, filesCount },
    })),
}));

export default useStore;
