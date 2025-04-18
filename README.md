# Sentence Share

책을 읽다가 마음에 드는 문장을 발견하면 기록하는 서비스입니다.

## v2.0

### 배포 URL

https://sentence-share.vercel.app/

**Server Repositories**

https://github.com/dasom0801/sentence-share-server

### 사용 기술

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-lightgrey?style=for-the-badge) ![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=MUI&logoColor=white) ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white) ![TestingLibrary](https://img.shields.io/badge/React%20Testing%20Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white) ![Mock Service Worker](https://img.shields.io/badge/Mock%20Service%20Worker-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white) ![Github Actions](https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

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

### v1.0에서 달라진 점

- React를 버전을 업데이트했습니다.
- Vite를 사용하여 환경을 구성하였습니다.
- Typescript를 적용했습니다.
- 테스트 코드를 추가하였습니다.
- Storybook로 컴포넌트를 관리합니다.
- Zustand로 클라이언트 상태를 관리합니다.
- tanstack query로 서버 상태 관리를 합니다.
- firestore가 아닌 자체 서버와 통신합니다.
- github actions로 배포 자동화를 했습니다.
- 전체적인 UI를 개선했습니다.

---

## v1.0

### 링크

https://sentence-share.firebaseapp.com/

- 기간: 2019. 03. 10 ~ 03. 24

### 사용 기술

- HTML
- CSS(SCSS)
- React
  - create-react-app
  - react-router
  - redux
  - redux-thunk
- immutable.js
- axios
- firebase
- 카카오 검색 API
- 반응형 웹
