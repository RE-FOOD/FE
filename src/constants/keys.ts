const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  LOCATION: 'location',
  GET_LOCATIONS: 'getLocations',
  STORE: 'store',
  GET_STORE_DETAIL: 'getStoreDetail',
  GET_MENU_DETAIL: 'getMenuDetail',
  GET_STORE_REVIEW: 'getStoreReview',
  CART: 'cart',
  GET_CART: 'getCart',
  GET_CART_COUNT: 'getCartCount',
  MEMBER: 'member',
  GET_OVERVIEWS: 'getOverviews',
  ORDER: 'Order',
  GET_ORDER: 'getOrder',
  ENVIRONMENT: 'environment',
  GET_REPORT: 'getReport',
  SELLER: 'seller',
  GET_STORE_INSIGHT: 'getStoreInsight',
  NOTIFICATION: 'notification',
  GET_NOTIFICATION: 'getNotifiation',
} as const;

const storageKeys = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  IS_SELLER: 'isSeller',
} as const;

export { queryKeys, storageKeys };
