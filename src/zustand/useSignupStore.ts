import { create } from 'zustand';

interface SignupState {
  nickname: string;
  phone: string;
  address: string;
  roadAddress: string;
  setNickname: (nickname: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
  setRoadAddress: (roadAddress: string) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  nickname: '',
  phone: '',
  address: '',
  roadAddress: '',
  setNickname: (nickname) => set({ nickname }),
  setPhone: (phone) => set({ phone }),
  setAddress: (address) => set({ address }),
  setRoadAddress: (roadAddress) => set({ roadAddress }),
  reset: () => set({ nickname: '', phone: '', address: '', roadAddress: '' }),
}));
