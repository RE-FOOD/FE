const loggedOutNavigations = {
  LOGIN: 'Login',
  SIGNUP_TYPE: 'SignupType',
  USER_SIGNUP: 'UserSignup',
  SELLER_SIGNUP: 'SellerSignup',
  DAUM_POSTCODE: 'DaumPostcode',
} as const;

const userNavigations = {
  STORE_HOME: 'StoreHome',
  STORE_DETAIL: 'StoreDetail',
  STORE_REVIEW: 'StoreReview',
  STORE_INFO: 'StoreInfo',
  CATEGORY_LIST: 'CategoryList',
  SEARCH_RESULT: 'SearchResult',
  MAP_HOME: 'MapHome',
  LIKE_HOME: 'LikeHome',
  HISTORY_HOME: 'HistoryHome',
  ORDER_DETAIL: 'OrderDetail',
  REVIEW_WRITE: 'ReviewWrite',
  MYPAGE_HOME: 'MypageHome',
  NiCKNAME_CHANGE: 'NicknameChange',
  LOCATION: 'Location',
  LOCATION_POSTCODE: 'LocationPostcode',
  NOTIFICATION: 'Notification',
  CART: 'Cart',
  REVIEW: 'Review',
  REPORT: 'GreenReport',
  PRIVATE: 'Private',
  RULE: 'Rule',
} as const;

export { loggedOutNavigations, userNavigations };
