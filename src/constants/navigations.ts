const loggedOutNavigations = {
  LOGIN: 'Login',
  SIGNUP_TYPE: 'SignupType',
  USER_SIGNUP: 'UserSignup',
  SELLER_SIGNUP: 'SellerSignup',
} as const;

const userNavigations = {
  STORE_HOME: 'StoreHome',
  MAP_HOME: 'MapHome',
  LIKE_HOME: 'LikeHome',
  HISTORY_HOME: 'HistoryHome',
  ORDER_DETAIL: 'OrderDetail',
  REVIEW_WRITE: 'ReviewWrite',
  MYPAGE_HOME: 'MypageHome',
} as const;

export { loggedOutNavigations, userNavigations };
