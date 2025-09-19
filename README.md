# RE:FOOD
🥇 2025 IITP 우수성과공유 컨퍼런스 최우수상

<img width="1062" height="599" alt="image" src="https://github.com/user-attachments/assets/b61ab463-3957-49d2-b152-948a86699d2b" />


## 🌳 서비스 소개

**가게에서 버려지는 식품들 너무 아까운데... 내가 싸게 살 수는 없을까?**   

리푸드는 남는 식품 거래 플랫폼 서비스로, 합리적 소비와 환경보호를 모두 얻는 똑똑한 푸드 픽업 서비스입니다.  
이를 통해 합리적이고 환경친화적인 식문화에 기여하자! 라는 서비스 목표를 갖고 있습니다.  



### 💰 우리 서비스의 가치
- **경제적 가치 - 소비자** : 소비자는 근처 마감 할인을 통한 이득을 얻는 동시에, 환경 포인트 및 쿠폰 리워드를 통해 서비스 이용 동기를 얻습니다.
- **경제적 가치 - 판매자** : 판매자는 재고에 대한 원가를 회수하고, 빠른 가게 노출을 통한 추가 매출 기회를 얻습니다.  
- **환경 보호**: 음식물 쓰레기 감소를 통한 탄소 배출량 감축

## ✨ 주요 기능

### 🔐 인증 및 권한 관리
- **JWT 기반 인증 시스템**: 안전하고 확장 가능한 토큰 기반 인증
- **OAuth2 소셜 로그인**: 카카오 로그인 지원
- **역할별 권한 처리**: 일반 사용자, 사업자, 관리자 역할 구분
- **환경 포인트 시스템**: 환경 친화적 활동에 대한 포인트 적립

### 🏪 가게 관리
- **사업자 등록 및 승인**: 사업자 자격 검증 시스템
- **가게 정보 관리**: 메뉴, 영업시간, 위치 등 상세 정보 관리
- **실시간 재고 관리**: 남는 음식 실시간 업데이트

### 🗺️ 지도 기반 서비스
- **위치 기반 가게 조회**: 사용자 위치 기반 근처 가게 검색
- **거리 계산**: 사용자와 가게 간 거리 자동 계산
- **지역별 필터링**: 원하는 지역의 가게만 조회

### 🛒 주문 및 결제
- **장바구니 시스템**: Redis 기반 실시간 장바구니 관리
- **주문 프로세스**: 주문 생성, 확인, 취소 전체 플로우
- **결제 시스템**: 다양한 결제 수단 지원
- **주문 내역 관리**: 사용자별 주문 이력 조회

### 🔔 알림 서비스
- **FCM 푸시 알림**: 실시간 주문 상태 알림
- **환경 레벨 업 알림**: 포인트 적립 및 레벨 상승 알림
- **가게별 알림**: 새로운 메뉴, 할인 정보 등


## 🛠️ 기술 스택

<img width="907" height="464" alt="2025-09-05_10 51 55" src="https://github.com/user-attachments/assets/8672fc64-0f1b-423c-97be-e6c8fb3158c2" />


### Frontend

- React 18
- React Native 0.74 (모바일 앱 개발)

### 상태 관리 및 데이터

- Zustand: 가벼운 전역 상태 관리
- React Query (TanStack Query): 서버 상태 관리 및 캐싱
- Async Storage: 로컬 스토리지
- Encrypted Storage: 민감 데이터 보안 저장

### 네트워크 & API

- Axios: HTTP 클라이언트
- React Native WebView: 외부 웹 뷰 연동

### 네이티브 기능 연동

- Geolocation (위치 서비스)
- Permissions (권한 관리)
- Image Picker (사진 업로드)
- Fast Image (고성능 이미지 로딩)
- Date Picker (날짜 선택)
- Naver Map SDK (지도 서비스)
- Kakao Login (소셜 로그인)
- Toss Payments SDK (결제 모듈)

### UI/UX

- React Navigation (Stack, Bottom Tabs): 화면 전환/탭 네비게이션
- Gesture Handler & Reanimated: 제스처, 애니메이션
- Safe Area Context & Screens: 안전 영역, 네이티브 화면 관리
- Vector Icons & Evil Icons: 아이콘 세트
- Linear Gradient: 그라데이션 효과
- Shadow-2: 그림자 효과
- SVG + Transformer: SVG 렌더링
- Lottie: 애니메이션
- Toast Message: 알림 메시지
- Bootsplash: 앱 시작 로딩 화면
- Gifted Charts: 차트 시각화

### 알림 & 메시징

- Firebase App & Messaging: 푸시 알림
- Notifee: 로컬 알림 확장

### 품질 관리 & 개발 환경

- TypeScript 5.0: 정적 타입
- ESLint + Prettier: 코드 품질 및 포맷팅
- Husky + Lint-staged: Git Hook 기반 코드 검사 자동화
- Jest + React Test Renderer: 테스트 프레임워크


### 빌드/런타임

- Metro Bundler (React Native 기본)
- Babel (Module Resolver 포함)
- Node.js 18+


## 📁 프로젝트 구조

```
src/
├── api/          # 서버 통신 (axios, fetch 등)
├── assets/       # 이미지, 아이콘, 폰트 등 정적 자원
├── components/   # 재사용 가능한 UI 컴포넌트
├── constants/    # 상수 값 (색상, 경로, 환경변수 키 등)
├── hooks/        # 커스텀 훅
├── navigation/   # 화면 전환 (React Navigation 구조)
├── screens/      # 실제 화면 단위 페이지
├── store/        # 전역 상태 관리 (zustand 등)
├── types/        # TypeScript 타입 정의
└── utils/        # 공용 유틸리티 함수
```

## 🏗️ 시스템 아키텍처

<img width="1125" height="551" alt="image" src="https://github.com/user-attachments/assets/8e3643c6-3abb-4686-9e69-d05441293365" />



---

**Refood Team** - 환경과 함께하는 똑똑한 한 끼를 만들어갑니다 🌱
