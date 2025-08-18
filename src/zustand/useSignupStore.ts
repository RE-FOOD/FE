import { create } from 'zustand';

interface SignupState {
  nickname: string;
  phone: string;
  region: string;
  setNickname: (nickname: string) => void;
  setPhone: (phone: string) => void;
  setRegion: (region: string) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  nickname: '',
  phone: '',
  region: '',
  setNickname: (nickname) => set({ nickname }),
  setPhone: (phone) => set({ phone }),
  setRegion: (region) => set({ region }),
  reset: () => set({ nickname: '', phone: '', region: '' }),
}));
