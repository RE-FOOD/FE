const loggedOutNavigations = {
  LOGIN: 'Login',
} as const;

const userNavigations = {
  STORE_HOME: 'StoreHome',
  MAP_HOME: 'MapHome',
  LIKE_HOME: 'LikeHome',
  HISTORY_HOME: 'HistoryHome',
  MYPAGE_HOME: 'MypageHome',
} as const;

export {loggedOutNavigations, userNavigations};
