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

type StoreCategory = 'ENFOOD' | 'CHFOOD' | 'KRFOOD' | 'JPFOOD' | 'SNACKFOOD' | 'DESSERT';

type StoreSort = 'NEAR' | 'REVIEW' | 'RATING';

interface Menu {
  id: number;
  name: string;
  price: number;
  dailyDiscountPercent: number;
  discountPrice: number;
  dailyQuantity: number;
  imageUrl: string;
}

interface Store {
  id: number;
  name: string;
  imageUrl: string;
  discountPercent: number;
  ratingAvg: number;
  count: number;
  distance: number;
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

interface DiscountMenu {
  storeId: number;
  menuName: string;
  ratingAvg: number;
  price: number;
  discountPrice: number;
  discountPercent: number;
  imageUrl: string;
}

interface PopularStore {
  id: number;
  name: string;
  ratingAvg: number;
  distance: number;
  imageUrl: string;
}

type CartMenu = Menu & {
  orderQuantity: number;
};

interface Cart {
  id: number;
  name: string;
  imageUrl: string;
  totalCoast: number;
  menus: CartMenu[];
}

interface CartStore {
  id: number;
  name: string;
  imageUrl: string;
  totalCoast: number;
  menus: CartMenu[];
}

interface Review {
  id: number;
  nickname: string;
  rating: number; // 1~5
  content: string;
  createdAt: string;
  menus: string[];
}

interface Overviews {
  cartCount: number;
  discountMenu: DiscountMenu[];
  locations: LocationFull;
  popularStores: PopularStore[];
}

export type {
  Member,
  Profile,
  Mypage,
  LocationFull,
  Location,
  Menu,
  StoreCategory,
  StoreSort,
  Store,
  StoreDetail,
  DiscountMenu,
  PopularStore,
  CartMenu,
  Cart,
  CartStore,
  Review,
  EnvironmentLevel,
  Overviews,
};
