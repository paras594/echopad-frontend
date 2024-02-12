import { create } from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  email: "",
  name: "",
  roomCount: 0,
  setRoomCount: (count: number) => set((state: any) => ({ roomCount: count })),
  setIsLoggedIn: (value: boolean) =>
    set((state: any) => ({ isLoggedIn: value })),
  setUser: ({ name, email }: any) => set((state: any) => ({ name, email })),
}));

export default useStore;
