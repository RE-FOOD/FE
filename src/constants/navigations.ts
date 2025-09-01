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
  MENU_DETAIL: 'MenuDetail',
  CATEGORY_LIST: 'CategoryList',
  SEARCH_RESULT: 'SearchResult',
  ORDER: 'Order',
  TOSS_PAYMENT: 'TossPayment',
  ORDER_SUCCESS: 'OrderSuccess',
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
  STORE_LIST: 'StoreList',
  EMPTY_STATE: 'EmptyState',
} as const;

const sellerNavigations = {
  MYPAGE_HOME: 'MypageHome',
  ORDER_HOME: 'OrderHome',
  MENU_HOME: 'MenuHome',
  MENU_REGISTER: 'MenuRegister',
  MENU_MODIFY: 'MenuModify',
};

export { loggedOutNavigations, userNavigations, sellerNavigations };
