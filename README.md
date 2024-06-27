![image](https://github.com/part4-project/effi_frontend/assets/75316998/9ef85757-e27e-4b22-aca5-5dce1c921f5e)

 🗓 개발기간 : 24년 5월 13일 ~ 

 💬 [EFFI에서 회의하기](https://cli.effi.club/) (현재 치솟는 서버 크레딧으로 인해 서버를 닫은 상태입니다.)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fpart4-project%2Feffi_frontend&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [멤버 소개](#-멤버)
3. [사용 스킬 소개](#-기술-스택)
4. [디렉토리 구조](#%EF%B8%8F-디렉토리-구조)
5. [브랜치 전략](#-브랜치-전략)

<br/>

# 📖 프로젝트 소개

`EFFI` 는 효율성을 뜻하는 efficiency 에서 이름을 가져왔습니다.
<br />
화상회의 중 논의했던 안건이나 대화내용을 리포트 형식으로 제공함으로써 따로 회의록을 작성하지 않고 회의에만 집중할 수 있도록 하여 효율적인 협업문화를 제공하는 것을 목표로 하고 있습니다.

### 📝주요 기능
✅ `소셜 로그인 및 로그아웃` - google OAuth 를 사용하여 google 이메일을 통해 로그인 할 수 있습니다.

<img src="https://github.com/part4-project/effi_frontend/assets/75316998/be1d02a7-84f8-46d4-9ad0-081a653971b2" width="100%" height="100%"/>

<br><br>
✅ `Nav, Side 바` - nav, side 바는 회의실을 제외하고 모든 레이아웃에 fixed로 공통으로 존재합니다.
- Nav 바에서는 다크모드를 설정할 수 있고, 알림 목록 및 내 프로필을 조회할 수 있습니다. 알림은 socket으로 구현되어 실시간으로 확인할 수 있습니다.
- Side 바에서는 로비 페이지로 이동할 수 있는 버튼이 있고, 그룹 만들기 및 내가 만든 그룹 리스트들을 볼 수 있습니다.

<img src="https://github.com/part4-project/effi_frontend/assets/75316998/e6d72f64-3c4b-4abf-aeda-7dc1554e403a" width="100%" height="100%"/>

<br><br>
✅ `로비 페이지` - 로비 페이지에서는 예약된 회의 일정을 캘린더에서 확인할 수 있고, 퀵버튼을 통해 내 프로필을 보거나 내가 만든 그룹의 회의를 바로 생성할 수 있습니다.
  
<img src="https://github.com/part4-project/effi_frontend/assets/75316998/ad17e943-3600-4654-adf1-e2d01264d7e9" width="100%" height="100%"/>

<br><br>
✅ `그룹 홈` - 특정 그룹 홈 페이지에서는 회의 생성, 그룹 관리 외에 리포트 목록과 그룹 멤버들을 조회할 수 있습니다. 

<img src="https://github.com/part4-project/effi_frontend/assets/75316998/25648d61-eda1-43b6-8b41-077c14703be6" width="100%" height="100%"/>

<br><br>
✅ `회의실` - 회의실에서는 접속한 멤버들끼리 webRTC 및 socket으로 구현된 화상채팅과 텍스트 채팅을 할 수 있습니다. 다른 멤버들이 체크하는 안건을 실시간으로 확인할 수 있고, 예상 종료 시간 이후에 회의실에 남아있는 멤버가 1명일 시 방이 5분 뒤 자동으로 종료됩니다.



# 🧑‍🤝‍🧑 멤버
<br/>

<table>
  <tr>
    <td height="160px" align="center"><a href="https://github.com/dali1999"><img src="https://avatars.githubusercontent.com/u/75316998?v=4" width="160px"/><br/>FE_황경수</a></td> 
    <td height="160px" align="center"><a href="https://github.com/bumpy1800"><img src="https://avatars.githubusercontent.com/u/51107943?v=4" width="160px"/><br/>FE_김재성</a></td> 
    <td height="160px" align="center"><a href="https://github.com/mynameJS"><img src="https://avatars.githubusercontent.com/u/128225030?v=4" width="160px"/><br/>FE_이재성</a></td> 
    <td height="160px" align="center"><a href="https://github.com/skoo1100"><img src="https://avatars.githubusercontent.com/u/55544307?v=4" width="160px"/><br/>FE_여승구</a></td> 
    <td height="160px" align="center"><a href="https://github.com/choiwonseokgit"><img src="https://avatars.githubusercontent.com/u/107683008?v=4" width="160px"/><br/>FE_최원석</a></td> 
  </tr>
  <tr>
    <td height="160px" align="center"><a href="https://github.com/Sfer7"><img src="https://avatars.githubusercontent.com/u/106132097?v=4" width="160px"/><br/>BE_소준영</a></td> 
    <td height="160px" align="center"><a href="https://maze-wasp-d65.notion.site/Dream-Maker-d1e511f087a84fc5908b1077041f47ef"><img src="https://cdn.discordapp.com/attachments/1243408025788747831/1254781911868510318/image.png?ex=667e09f8&is=667cb878&hm=92671cb004c125b0f5b7f2b006be44c5d56fd26bc7c22468d4251bde4d330b5e&" width="160px"/><br/>DESIGN_조효은</a></td> 
  </tr>
</table>
<br/>


# ✨ 기술 스택

</br>

<b>FE</b>
<p align='left'>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=ffffff" alt='react'> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff" alt='typescript'>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=ffffff" alt='react-query'>
  <img src="https://img.shields.io/badge/Zustand-F0BA47?style=for-the-badge&logoColor=ffffff" alt='zustand'>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=ffffff" alt='styled-components'>
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=ffffff" alt='react-router'>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff" alt='vite'>
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=ffffff" alt='axios'>
  
  </br>
  <img src="https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=ffffff" alt='WebRTC'>
  <img src="https://img.shields.io/badge/Websocket-DDA14D?style=for-the-badge&logoColor=ffffff" alt='Websocket'> 
  <img src="https://img.shields.io/badge/stomp-5A29E4?style=for-the-badge&logoColor=ffffff" alt='stomp'>
  <img src="https://img.shields.io/badge/kurento utils-7F9644?style=for-the-badge&logoColor=ffffff" alt='kurento utils'>

</p>

# 🗂️ 디렉토리 구조
```
└─ src
 ├─ api
 ├─ assets 
 ├─ components
 ├─ constants
 ├─ hooks
 ├─ pages
 ├─ stores
 ├─ styles
 ├─ utils
 ├─ App.tsx
 ├─ main.tsx
 └─ Router.tsx
```
+ src폴더
   + `api` : axios 인스턴스 설정 및 api 호출 함수들이 위치합니다.
   + `assets` : icons, images들이 위치합니다.
   + `components` : 전역으로 재사용 가능한 컴포넌트들이 위치합니다.
   + `constants` : 공통적으로 사용되는 상수들을 정의한 파일들이 위치합니다.
   + `hooks` : 전역으로 쓰이는 커스텀 훅들이 위치합니다. `react-query`를 사용하여 데이터를 전역적으로 관리하기 위한 훅도 이 폴더에 위치합니다.
   + `pages` : react router를 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 이 폴더에 위치시킵니다. 각 페이지 컴포넌트 마다 아래 디렉토리 구조를 적용해 해당 페이지에서만 사용되는 컴포넌트, 훅, 유틸 함수 등을 관리하도록 했습니다.
     
     ```
     └─ pages
       └─ login
         ├─ api
         ├─ components
         ├─ constants
         ├─ hooks
         ├─ utils
         ├─ types
         └─ index.tsx
     ```
   + `stores` : zustand를 사용하여 데이터를 전역적으로 관리하기 위한 폴더입니다.
   + `styles` : 전역적인 styled가 담긴 폴더
   + `utils` : 자주 사용되는 로직을 담는 폴더
  <br/>


# 🔎 브랜치 전략
### 'EFFI'에서는 4개의 브랜치를 관리하는 Git Flow 브랜치 전략을 사용합니다.

### `main`
- 항상 Stable 한 상태인 Branch입니다.
- 모든 커밋은 언제든 배포할 수 있는 상태여야하며 언제든 Branch를 새로 만들어도 문제가 없어야 합니다. 또한 Main Branch의 모든 커밋은 빌드가 되고 테스트를 통과해야합니다.
<br/>

### `develop`
- 개발을 위한 코드가 담긴 Branch입니다.
- 개발이 모두 완료가 되면 Main Branch로 merge 됩니다.
<br/>

### `feature`
- 새로운 기능을 개발할 때에는 feature 브랜치를 develop 브랜치로부터 생성합니다.
- 별도로 hotfix 브랜치를 관리하지 않으며, 버그 수정도 feature 브랜치에서 진행합니다.
- feature 브랜치의 이름은 기능을 설명하는 명확한 이름으로 네이밍 해야합니다.
  ex ) `feature/user-content-cache`
- feature 브랜치의 커밋은 기능이 완성되지 않았더라도 팀원들간 원할한 소통을 위해 꾸준히 Push합니다.
- 새로운 기능을 개발하기 위해 feature 브랜치를 생성하기전 develop 브랜치에서 Pull을 해야합니다. 
- 해당 브랜치에서 기능개발을 완료 후 PR이 승인되어 develop에 merge되면 remote 저장소에 있는  해당 기능 브랜치는 삭제해야 합니다.

### `release`
- 이번 출시 버전을 준비하는 브랜치입니다.
- 배포를 위한 전용 브랜치를 사용함으로써 한 파트가 해당 배포를 준비하는 동안 다른 파트는 다음 배포를 위한 기능 개발을 계속할 수 있습니다.
