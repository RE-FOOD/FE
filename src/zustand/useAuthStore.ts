import { create } from 'zustand';

type AuthState = {
  kakaoAccessToken?: string;
  setKakaoAccessToken: (t?: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  kakaoAccessToken: undefined,
  setKakaoAccessToken: (t) => set({ kakaoAccessToken: t }),
  clear: () => set({ kakaoAccessToken: undefined }),
}));
