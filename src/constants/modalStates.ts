interface StateMapItem {
  title: string;
  subtitle?: string;
  desc?: string;
  btn: number[];
}

interface StateMap {
  [key: string]: StateMapItem;
}

interface ButtonMapItem {
  color: string;
  label: string;
}

interface ButtonMap {
  [key: number]: ButtonMapItem;
}

export const stateMap: StateMap = {
  Logout: {
    title: '로그아웃 하시겠습니까?',
    btn: [0, 1],
  },
  PasswordChanged: {
    title: '비밀번호 변경 완료',
    subtitle: '변경된 비밀번호로 로그인하세요.',
    btn: [3],
  },
  PasswordChangeWarning: {
    title: '비밀번호 변경',
    subtitle: '비밀번호를 변경하시겠습니까?\n 확인을 누르면 로그인 페이지로 이동합니다.',
    btn: [0, 1],
  },
  SignUpSuccess: {
    title: '가입 신청 완료',
    subtitle: '승인 결과는 카카오 계정에 등록된\n이메일로 안내드립니다.',
    btn: [3],
  },
  ChangeLocation: {
    title: '위치 변경',
    subtitle: '현위치를 변경하시겠습니까?',
    btn: [0, 2],
  },
  DeleteLocation: {
    title: '주소 삭제',
    subtitle: '주소를 삭제하시겠습니까?',
    btn: [0, 4],
  },
  AddressLimit: {
    title: '주소 추가 불가능',
    subtitle: '주소는 최대 10개까지 등록할 수 있습니다.\n기존 주소를 삭제 후 추가해주세요.',
    btn: [1],
  },
  ResetCart: {
    title: '장바구니 초기화 안내',
    subtitle: '같은 가게의 메뉴만 담을 수 있습니다.',
    desc: '선택하신 메뉴를 장바구니에 담을 경우\n이전에 담은 메뉴가 삭제됩니다.',
    btn: [0, 5],
  },
  DeleteMenu: {
    title: '메뉴 삭제',
    subtitle: '선택하신 메뉴를 삭제하시겠습니까?',
    btn: [0, 1],
  },
  Order: {
    title: '주문 접수',
    subtitle: '주문을 수락하시겠습니까?',
    btn: [0, 6],
  },
};

export const buttonMap: ButtonMap = {
  0: { color: '#E6E6E6', label: '취소' },
  1: { color: '#EA575B', label: '확인' }, // red
  2: { color: '#0FB758', label: '변경' },
  3: { color: '#0FB758', label: '확인' }, // green
  4: { color: '#EA575B', label: '삭제' },
  5: { color: '#EA575B', label: '새로 담기' },
  6: { color: '#0FB758', label: '수락' },
};
