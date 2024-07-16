import { create } from "zustand";

type searcStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggel: () => void;
};


export const useSearch=create<searcStore>((set,get)=>({
    isOpen: false,
    onOpen: () => set(() => ({ isOpen: true })),
    onClose: () => set(() => ({ isOpen: false })),
    toggel: () => set(() => ({ isOpen:!get().isOpen })),
  
}))