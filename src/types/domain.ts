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
  environmentPoint: number;
  nextLevelPoint: number;
  progressPercentage: number;
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
  storeName: string;
  rating: number;
  content: string;
  createdAt: string;
  menus: string[];
}

interface StoreReviewMenu {
  id: number;
  name: string;
}

interface StoreReview {
  id: number;
  memberId: number;
  memberNickName: string;
  rating: number;
  content: string;
  createdAt: string;
  menuList: StoreReviewMenu[];
}

export type StoreSortOption = 'NEAR' | 'REVIEW' | 'RATING';
interface Like {
  id: number;
  name: string;
  status: 'OPEN' | 'CLOSE';
  ratingAvg: number;
  count: number;
  distance: number;
  salePercent: number;
  imageUrl?: string;
}

interface Map {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: 'OPEN' | 'CLOSED';
  maxPercent: number;
}
interface Overviews {
  cartCount: number;
  hasUnread: boolean;
  discountMenu: DiscountMenu[];
  locations: LocationFull;
  popularStores: PopularStore[];
}

type OrderMenu = Pick<CartMenu, 'name' | 'orderQuantity' | 'imageUrl' | 'discountPrice'>;

interface Order {
  name: string;
  address: string;
  totalCoast: number;
  openTime: string;
  closeTime: string;
  menus: OrderMenu[];
}

interface History {
  orderId: number;
  storeId: number;
  storeName: string;
  imageUrl: string;
  status: boolean;
  menuName: string;
}

interface SellerOrder {
  orderId: number;
  pickupDueTime: string;
  menus: string[];
  menuCount: number;
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELED' | string;
}

interface MonthAmount {
  [key: string]: number;
}

interface StoreInsight {
  salesAmount: number;
  popularMenu: string[];
  monthAmount: MonthAmount;
}

interface Notification {
  id: number;
  type:
    | 'ORDER_COMPLETION'
    | 'ORDER_CANCELED'
    | 'ORDER_PICK_UP'
    | 'ENVIRONMENT_LEVEL_UP'
    | 'FAVORITE_STORE_DAILY_REGISTRATION';
  redirectTargetId: number | null;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
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
  Like,
  Map,
  Overviews,
  Order,
  OrderMenu,
  MonthAmount,
  StoreInsight,
  History,
  SellerOrder,
  Notification,
  StoreReview,
};
