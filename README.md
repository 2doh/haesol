
# 프로젝트 생성 테스트 - 김현주

# 프로젝트 생성 테스트 김수민


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

## 8. 스타일링

- scss + styled(emotion) 권장, 필요에 따라 inline, 객체css 방식 적용
  - ex) 특정 상황에 따라 스타일이 변경될 때

## 9. 변수, 함수명 작명 추천

on~ 이벤트 발생할 때
is~ 있는지 없는지 확인할 때
get~ 값을 얻을 때
can~ 가능한지 확인할 때
clac~ 계산
handle 이벤트 작업 처리
