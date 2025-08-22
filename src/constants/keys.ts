const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  LOCATION: 'location',
  GET_LOCATIONS: 'getLocations',
} as const;

const storageKeys = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  IS_SELLER: 'isSeller',
} as const;

export { queryKeys, storageKeys };
