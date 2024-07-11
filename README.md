# 컨벤션

## 1. 변수, 함수명 카멜케이스

- ex) const userName =

## 2. 컴포넌트 명 파스칼 케이스

- ex) <Header/>

## 3. 이벤트 혹은 props 카멜케이스

- ex) onClick etc.

## 4. 클래스명 소문자(html에서 리액트로 마이그레이션 할 경우)

## 5. 주석처리는 주석이 필요한 구문 바로 위에

## 6. else사용 자제

- 조건이 여러개인 경우

```js
if(1조건){}
if(2조건){}
if(3조건){}
```

## 7. try/fetch 문 에러처리

```js
ex)
try{}
.catch(error){
console.log(error)
}
```

## 8. 스타일링.

- scss + styled(emotion) 권장, 필요에 따라 inline, 객체css 방식 적용
  - ex) 특정 상황에 따라 스타일이 변경될 때

## 9. 변수, 함수명 작명 추천

on~ 이벤트 발생할 때
is~ 있는지 없는지 확인할 때
get~ 값을 얻을 때
can~ 가능한지 확인할 때
clac~ 계산
handle 이벤트 작업 처리

## 10. Github commit 시 참고.

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

## 11. 공용 함수

- PhoneNumber : 휴대폰 번호 자동 하이픈 삽입, input의 maxLength={13} 반드시 삽입
- navi : useNavigate
