<div align="center" width="500">
  <img src="./src/images/logo.png" width="500" height="200">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">초등학생 성장 지원 서비스</h2>

**해솔 : 해처럼 밝고🌞 소나무처럼 바르게🌲**
</br>
`우리 아이의 찬란하고 올곧은 성장을 기원합니다`

</div>
<h4>❗ 문제의식과 타겟 설정</h4>

- 2022년 기준 맞벌이 부부는 전체 유배우가구 중 46.1% / 참조 : [통계청](https://www.index.go.kr/unity/potal/indicator/IndexInfo.do?cdNo=2&clasCd=10&idxCd=F0034#)
- 현대 사회에서 부모님들은 자녀 교육에 높은 관심을 가지고 있으나, 바쁜 일상에 자녀의 성적관리와 학교 일정을 체계적으로 관리하기 어려움
- 어린아이의 특성상 부모에게 받는 영향이 매우 크므로, 자녀의 학업 성취도와 성장에 부정적인 영향을 미칠 수 있음

<h4>👩‍💼 페르소나</h4>

- 이름 : 김리온 / 나이 : 35세 / 직업 : 마케팅 매니저
- 특이사항 : 남편과 초등 3학년 아들을 둔 워킹맘, 자녀 교육에 관심이 많으나 잦은 야근으로 인해 시간이 부족함

<h4>📅 개발기간</h4>

- 2024-06-24 ~ 2024-07-23

<h4>📌 기술 스택</h4>
<div style="margin: 0 auto; text-align: center;" align="center">
        <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
        <img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white">
        <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
        <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
        <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
        <br/><img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
        <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
        <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
        <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
        <br/><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
        <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
        <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white">
        <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
</div>

<h4>👩‍💻 멤버구성</h4>

- 이도현 : 깃허브 관리 / 로그인, 회원가입 / 차트
- 김현주 : 문서 관리(노션, 회의록 etc.) / 메인 페이지 / 관리자 승인 / 내 정보 수정
- 김수민 : 피그마 관리 / 성적 등록 등 교사 측 action 전반

# 컨벤션

## 1. 변수, 함수명 카멜케이스

- ex) `const userName =`

## 2. 컴포넌트 명 파스칼 케이스

- ex) `<Header/>`

## 3. 이벤트 혹은 props 카멜케이스

- ex) `onClick` etc.

## 4. 클래스명 소문자(html에서 리액트로 마이그레이션 할 경우)

## 5. 주석처리는 주석이 필요한 구문 바로 위에

## 6. else사용 자제(콜백 헬 방지)

- 조건이 여러개인 경우

```js
if(1조건){}
if(2조건){}
if(3조건){}
```

## 7. 스타일링

- scss + styled(emotion) 권장, 필요에 따라 inline, 객체css 방식 적용
  - ex) 특정 상황에 따라 스타일이 변경될 때

## 8. 변수, 함수명 작명 추천

on~ 이벤트 발생할 때
is~ 있는지 없는지 확인할 때
get~ 값을 얻을 때
can~ 가능한지 확인할 때
clac~ 계산
handle 이벤트 작업 처리

## 9. Github commit 시 참고.

> 커밋 컨벤션 - 무엇을 왜 바꾸었는지 기재

- feat : 새로운 기능 추가
- fix : 버그 수정
- add : 파일 추가
- docs : 문서 수정
- style : 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
  refactor
- test : 테스트 코드, 리팩토링 테스트 코드 추가
- chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
- design : CSS 등 사용자 UI 디자인 변경
- comment : 필요한 주석 추가 및 변경
- rename : 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
- remove : 파일을 삭제하는 작업만 수행한 경우
- !BREAKING CHANGE : 커다란 API 변경의 경우
- !HOTFIX : 급하게 치명적인 버그를 고쳐야 하는 경우

## 10. 공용 함수

- PhoneNumber : 휴대폰 번호 자동 하이픈 삽입, input의 maxLength={13} 반드시 삽입
- 새로 추가시 README에 작성
