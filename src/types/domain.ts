interface Member {
  id: number;
  email: string;
  nickname?: string;
  phone: string;
  address?: string;
  bussinessNumber?: string;
}

interface Location {
  id: number;
  address: string;
  isMostRecent: boolean;
}

interface Profile {
  id: number;
  email: string;
  nickname: string;
  phone: string;
  role: string;
  joinType: string;
  businessLicenseNumber?: string | null;
  isBusinessApproved?: 'APPROVED' | null;
  location?: Location | null;
}

export type EnvironmentLevel = 'SPROUT' | 'SEEDLING' | 'TREE' | 'FRUIT';
interface Mypage {
  id: number;
  email: string;
  nickname: string;
  environmentLevel: EnvironmentLevel;
  orderCount: number;
  dishCount: number;
  environmentScore: number;
}

interface Menu {
  id: number;
  name: string;
  price: number;
  dailyDiscountPercent: number;
  discountPrice: number;
  dailyQuantity: number;
  imageUrl: string;
}

interface StoreDetail {
  name: string;
  phoneNumber: string;
  address: string;
  description: string;
  origin: string;
  openTime: string;
  closeTime: string;
  category: string;
  latitude: number;
  longitude: number;
  imageUrl: string[];
  menus: Menu[];
  like: boolean;
  ratingAvg: number;
  count: number;
}

interface Review {
  id: number;
  nickname: string;
  rating: number; // 1~5
  content: string;
  createdAt: string;
  menus: string[];
}

interface UpdateNicknameRequest {
  nickname: string;
}

interface UpdateNicknameData {
  id: number;
  nickname: string;
}

export type {
  Member,
  Profile,
  Mypage,
  Menu,
  StoreDetail,
  Review,
  UpdateNicknameData,
  UpdateNicknameRequest,
};
