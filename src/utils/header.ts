import axiosInstance from '@/api/axios';

function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  // 헤더가 존재한다면 삭제
  delete axiosInstance.defaults.headers.common[key];
}

export { setHeader, removeHeader };
