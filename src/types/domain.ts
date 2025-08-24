interface Member {
  id: number;
  email: string;
  nickname?: string;
  phone: string;
  address?: string;
  bussinessNumber?: string;
}

interface LocationFull {
  id: number;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  isMostRecent: boolean;
}

type Location = Pick<LocationFull, 'id' | 'address' | 'isMostRecent'>;

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

type EnvironmentLevel = 'SPROUT' | 'SEEDLING' | 'TREE' | 'FRUIT';
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

interface Like {
  id: number;
  name: string;
  rating: number;
  review: number;
  near: number;
  discount: number;
  image?: string;
}

export type {
  Member,
  Profile,
  Mypage,
  LocationFull,
  Location,
  Menu,
  StoreDetail,
  Review,
  EnvironmentLevel,
  Like,
};
