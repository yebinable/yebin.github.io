# 타입스크립트 란?
- 타입스크립트(ts)는 더 안전하고, 더 정교하게 JavaScript를 작성하게 해주는 개발자 구인 트랜스파일 언어 입니다.
- Microsoft 가 개발하여 든든하죠(?)


# 타입스크립트를 사용하는 이유
- **코드 안정성 증가 : 실수 방지, 명확한 인터페이스, 리팩토링 안전성**
- 자동완성, 타입 추론, 코드 탐색 등 용이
- 협업과 유지보수에 강점
- 최신 JS 기능 지원

# 타입스크립트가 자바스크립트로 변환되어 실행되는 과정 요약
```
TypeScript (.ts)
   │  작성
   ▼
tsc (TypeScript Compiler)
   │  트랜스파일: 타입 제거 + JS 생성
   ▼
JavaScript (.js)
   │  V8에서 실행
   ▼
JS 엔진 내부 처리
  ├─ 파싱 → AST
  ├─ 컴파일 → 바이트코드
  ├─ 실행컨텍스트 생성
  ├─ 실행
  └─ (필요 시) TurboFan JIT 최적화
```

# 조금 더 상세하게 보기 
![](/img/content_img/2025-04-20-00-24-19.png)

```mermaid
sequenceDiagram
actor Developer
participant TypeScriptCompiler (tsc)
participant JavaScriptEngine (V8)
participant Parser
participant IgnitionCompiler
participant ExecutionContext
participant TurboFanJIT

Developer ->> TypeScriptCompiler: 작성된 .ts 파일 전달
TypeScriptCompiler ->> TypeScriptCompiler: 타입 검사 (정적 분석)
TypeScriptCompiler ->> TypeScriptCompiler: 타입 제거 및 JS 코드 생성
TypeScriptCompiler ->> Developer: .js 파일 반환

Developer ->> JavaScriptEngine: JS 파일 실행 요청
JavaScriptEngine ->> Parser: JS 파싱 및 AST 생성
Parser ->> JavaScriptEngine: AST 반환

JavaScriptEngine ->> IgnitionCompiler: AST → 바이트코드 변환
IgnitionCompiler ->> JavaScriptEngine: 바이트코드 반환

JavaScriptEngine ->> ExecutionContext: 실행 컨텍스트 생성
ExecutionContext ->> JavaScriptEngine: 변수 환경, this 바인딩 등 설정 완료

JavaScriptEngine ->> ExecutionContext: 바이트코드 실행

ExecutionContext ->> TurboFanJIT: (핫코드 감지 시) 최적화 요청
TurboFanJIT ->> JavaScriptEngine: 최적화된 머신코드 제공
JavaScriptEngine ->> ExecutionContext: 최적화된 코드 실행
```

