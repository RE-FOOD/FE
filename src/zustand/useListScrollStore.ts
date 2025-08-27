import { create } from 'zustand';

type S = {
  offsets: Record<string, number>;
  setOffset: (key: string, y: number) => void;
  getOffset: (key: string) => number | undefined;
  clearOffset: (key: string) => void;
};

export const useListScrollStore = create<S>((set, get) => ({
  offsets: {},
  setOffset: (key, y) => set((s) => ({ offsets: { ...s.offsets, [key]: y } })),
  getOffset: (key) => get().offsets[key],
  clearOffset: (key) =>
    set((s) => {
      const next = { ...s.offsets };
      delete next[key];
      return { offsets: next };
    }),
}));
