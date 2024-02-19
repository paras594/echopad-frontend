import { create } from "zustand";

const useUpdatingContentStore = create((set) => ({
  isUpdating: false,
  setIsUpdating: (value: boolean) =>
    set((state: any) => ({ isUpdating: value })),
}));

export default useUpdatingContentStore;
