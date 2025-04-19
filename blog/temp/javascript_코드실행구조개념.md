# 자바스크립트 코드 실행의 구조 개념
js는 코드 실행 시 아래 두 단계를 거친다
1. 메모리 저장 단계
2. 실행 컨텍스트 생성 + 실행 시점

## 1. 코드 실행 전 : 파싱 & 컴파일
- 자바스크립트 엔진(V8)은 코드 실행 전 호이스팅(Hoisting) 진행
  1. 코드 파싱
  2. 실행 컨텍스트 구성
  3. 필요한 변수와 함수들을 메모리에 등록 

- 변수 선언(var)과 함수 선언문(function)은 `메모리`에 먼저 등록 (함수 스코프)
- 단, `let`, `const` (블록 스코프)는 TDZ(Temporal Dead Zone)에 들어가기 때문에, 초기화 되기 전 접근 시 에러 발생
    ```js
    // 아래와 같은 코드는
    console.log(a); // undefined
    var a = 5;

    // 내부적으로는 다음과 같이 동작함
    var a;
    console.log(a); // undefined
    a = 5;
    ```

## 2. 코드 실행 시: 실행 컨텍스트(Excution Context)
- js는 `실행 컨텍스트` 라는 구조를 만들어서 코드를 실행

### 실행 컨텍스트의 주요 구성 요소
1. 변수 환경 (Variable Environment) : 선언된 변수, 함수, 매개변수 저장
2. 스코프 체인(Scope Chain) : 외부 렉시컬 환경 참조
3. this 바인딩 : 실행 맥락에 따른 this 값

### 실행 컨텍스트 종류
1. 전역 실행 컨텍스트 – 스크립트가 로드되면 최초로 생성
2. 함수 실행 컨텍스트 – 함수가 호출될 때마다 생성
3. eval 실행 컨텍스트 – 거의 사용되지 않음

## 3. 콜 스택(Call Stack)
- js는 **싱글 스레드 기반**으로, 실행할 함수를 콜 스택에 쌓아서 처리

```js
function a() {
  b();
}
function b() {
  console.log('hello');
}
a();

-> 콜 스택 흐름:
[1] a() 호출 → a의 실행 컨텍스트 push
[2] b() 호출 → b의 실행 컨텍스트 push
[3] console.log → 로그 출력
[4] b() 종료 → b의 컨텍스트 pop
[5] a() 종료 → a의 컨텍스트 pop
```

## 4. 비동기 처리와 이벤트 루프(Event Loop)

```js
console.log("start");
setTimeout(() => console.log("timeout"), 0);
console.log("end");

====
start
end
(timeout은 나중에 이벤트 큐에서 실행)
```
- 이벤트 루프는 콜스택이 비었을 때 큐에 대기 중인 작업을 하나씩 스택에 올림

## 5. 렉시컬 환경(Lexical Environment)
- 코드가 어디에 선언되었는지에 따라 스코프가 결정됨

```js
function outer() {
  let x = 10;
  function inner() {
    console.log(x); // outer의 렉시컬 환경 참조
  }
  inner();
}
```