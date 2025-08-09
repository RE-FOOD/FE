const loggedOutNavigations = {
  LOGIN: 'Login',
  SIGNUP_TYPE: 'SignupType',
  USER_SIGNUP: 'UserSignup',
  SELLER_SIGNUP: 'SellerSignup',
} as const;

const userNavigations = {
  STORE_HOME: 'StoreHome',
  CATEGORY_LIST: 'CategoryList',
  SEARCH_RESULT: 'SearchResult',
  MAP_HOME: 'MapHome',
  LIKE_HOME: 'LikeHome',
  HISTORY_HOME: 'HistoryHome',
  MYPAGE_HOME: 'MypageHome',
  LOCATION: 'Location',
  NOTIFICATION: 'Notification',
  CART: 'Cart',
} as const;

export { loggedOutNavigations, userNavigations };
