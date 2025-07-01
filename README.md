# Sentence Share

책을 읽다가 마음에 드는 문장을 발견하면 기록하는 서비스입니다.

### 요구사항

- Node.js 20.0.0 이상

### 배포 URL

https://sentence-share.vercel.app/

### 사용 기술

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-lightgrey?style=for-the-badge) ![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=MUI&logoColor=white) ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Github Actions](https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### 폴더 구조

```
src/
├── app/                      # Next.js App Router 기반 라우트
│ ├── [route]/                # 라우트 폴더 (예: sentence, my, setting 등)
│ │ ├── page.tsx              # 라우트 진입점
│ │ ├── components/           # 해당 라우트 전용 UI 컴포넌트
│ │ ├── hooks/                # 해당 라우트 전용 hook
│ │ └── api/                  # 해당 라우트 전용 API 호출 함수
├── components/               # 공용 컴포넌트 (Atomic Design 기반)
│ ├── atoms/
│ ├── molecules/
│ └── organisms/
├── api/                      # 전역 API 호출 함수
├── constants/                # 전역 상수
├── db/                       # 데이터베이스 설정, 모델, 컨트롤러
├── hooks/                    # 전역 공용 훅
├── lib/                      # 외부 SDK 초기화, config (ex. firebase)
├── mocks/                    # 테스트 및 Storybook용 mock 데이터
├── store/                    # 글로벌 상태 관리 (Zustand 관련 코드)
├── types/                    # 전역 타입 정의
└── utils/                    # 유틸리티 함수
```

### 주요 기능

- 구글 계정으로 회원가입
- 최신순/인기순 정렬

  <img src="./images/MainList.png" width="70%" alt="최신순/인기순 정렬">

- 닉네임과 프로필 이미지 변경

  <img src="./images/Setting.png" width="70%" alt="닉네임과 프로필 이미지 변경">

- 문장 작성 및 수정

  <img src="./images/BookSearch.png" width="70%" alt="책 검색">

  <img src="./images/SentenceInput.png" width="70%" alt="문장 작성">

- 내가 등록한 문장, 좋아한 문장 목록

  <img src="./images/UserSentence.png" width="70%" alt="내가 등록한 문장">

  <img src="./images/UserLike.png" width="70%" alt="내가 좋아한 문장">

- 책에 등록된 문장 목록

  <img src="./images/BookSentence.png" width="70%" alt="내가 좋아한 문장">
