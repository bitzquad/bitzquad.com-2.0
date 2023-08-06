import create from "zustand";

const useUserStore = create((set) => ({
    value: null,
    setUser: (newuser: any) => set({ value: newuser }),
}));

export default useUserStore;
