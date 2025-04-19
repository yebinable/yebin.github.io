# 자바스크립트의 실행 컨텍스트란?
- 코드가 실행되는 환경(Context) 을 의미하며, 코드가 실행되기 전에 생성되고 여러 단계를 거쳐 구성됩니다. 실행 컨텍스트는 전역 코드, 함수 코드, eval() 코드 등에서 각각 생성될 수 있으며, 실행 시 자바스크립트 엔진이 참조하는 가장 핵심적인 내부 구조 중 하나입니다.
- 실행 컨텍스트는 크게 3단계(생성 → 초기화 → 실행) 로 나눌 수 있는데, 생성 단계에 집중해서 설명하겠습니다. 
   
# 실행 컨텍스트 생성 단계(Creation Phase)
실행 컨텍스트는 세부적으로 3가지 단계로 구성 됩니다.
1. 렉시컬 환경 구성
2. 변수 환경 구성
3. this 바인딩 결정

## 1. 렉시컬 환경(Lexical Environment) 구성
렉시컬 환경은 식별자(변수, 함수 등)와 그 식별자가 참조하는 값을 저장하는 공간입니다.

### 환경 레코드(Environment Record)
실제 변수 이름과 값을 저장하는 객체입니다.
-	var, function 등은 이 시점에 등록됩니다.
-	let, const는 등록되지만 값은 할당되지 않고 “TDZ(Temporal Dead Zone)” 에 존재합니다.
   > TDZ(Temporal Dead Zone) 이란?
   > - `let`이나 `const`로 선언한 변수들이 실제 코드에서 선언되기 전까지 접근할 수 없는 영역을 말합니다.
   > - `let`이나 `const`는 변수 호이스팅은 되지만, `var`와 달리 초기화 전에 접근하면 에러가 발생 됩니다.

### 외부 렉시컬 환경 참조(Outer Lexical Environment Reference)
상위 스코프를 참조하기 위한 포인터입니다.
함수 내부라면, 선언된 시점의 외부 환경을 참조합니다 (Closure를 위한 기반).

## 2. 변수 환경(Variable Environment) 구성
초기에는 LexicalEnvironment와 동일하지만, var만 관리하는 별도 공간으로 생각할 수 있습니다. 이후 ECMA에서 대부분 LexicalEnvironment로 통합되어 다룸.

## 3. this 바인딩 결정
- 전역 컨텍스트: this는 전역 객체(window 또는 global)
-	함수 컨텍스트: 호출 방식에 따라 this 결정 (일반 호출, 메서드 호출, new, bind/apply/call 등)
-	strict mode에서는 명시되지 않은 경우 undefined가 바인딩됨

# 실행 컨텍스트 초기화 단계(Initialization Phase)
실행 컨텍스트 초기화 단계는 생성 단계에서 선언만 되어 있던 식별자들을 실제 메모리에 값으로 할당하는 과정입니다.
코드 실행 직전에 이 단계가 마무리되어야 코드가 정상적으로 실행될 수 있습니다.
이때 아래와 같은 작업을 합니다.
1. 변수 초기화
2. 함수 선언 바인딩
3. this 바인딩 완료

초기화 단계는 실질적인 값 할당이 일어나는 시점
- 이 단계가 완료되어야 코드가 안전하게 실행될 수 있음
- TDZ는 이 시점에 종료됨
- 실행 컨텍스트는 이 단계 이후 “활성화된 상태” 로 실행 큐에 올라감

# 실행 단계 (Execution Phase)
자바스크립트 실행 컨텍스트의 마지막 단계인 **실행 단계**에서는 실제 코드가 한 줄씩 실행됩니다.  
생성 및 초기화 단계에서 세팅된 변수와 함수, `this` 바인딩을 활용하여 프로그램이 작동하게 됩니다.

### 1. 코드 실행
- 변수에 값 할당
- 연산 수행
- 조건문/반복문 처리
- 함수 실행 등

```js
let x = 5;
let y = x * 2;
console.log(y); // 10
```

### 2. 스코프 체인 탐색
- 변수 참조 시 현재 렉시컬 환경에서 식별자를 찾음
- 없으면 외부 환경 참조를 따라 상위 스코프로 이동

```js
function outer() {
  let a = 10;
  function inner() {
    console.log(a); // outer의 a를 참조
  }
  inner();
}
outer();
```

### 3. 클로저 생성
- 내부 함수가 외부 변수에 접근할 경우
- 외부 렉시컬 환경을 기억하는 함수(클로저) 생성됨

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

### 4. 콜 스택 처리
- 함수가 호출되면 새로운 실행 컨텍스트가 생성되어 콜 스택에 push
- 함수가 종료되면 해당 컨텍스트는 pop

```js
function a() {
  b();
}
function b() {
  c();
}
function c() {
  console.log("done");
}
a();
```

콜 스택 흐름:
```
[global] → a() → b() → c() → 실행 → pop 순
```


