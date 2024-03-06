# coin-tracker-clone

## 컨셉
이 프로젝트는 암호화폐 정보 사이트에서 영감을 받아, 
 - 주요 암호화폐의 정보와 시세 제공
 - 시세의 변화 양상을 차트와 표의 시각 자료로 변환
 - 사용자 편의를 위한 다크모드, 라이트 모드 변환 기능 지원합니다.

기술적으로는 리엑트 쿼리와 styled-component를 이용해 클라이언트단에서 데이터를 받아 렌더링하는 CSR과 동적인 스타일링에 중점 두었습니다.

## Link
https://charchar111.github.io/coin-tracker-clone/

## 기술 스택

- React
- [React-router-dom](#데이터-캐싱)
- Recoil
- styled-components
- tanstack/react-query
- [apexcharts](#데이터의-시각화)

## 세부사항
### styled-components 기반의 다크 모드 팔레트 
스타일 컴포넌트는 스타일(라이트 모드, 다크 모드)을 객체값으로 저장 후 동적으로 전환이 가능한 CSS-in-JS 라이브러리입니다.
동적인 스타일링에 특화된 방식이기 때문에, 이 앱에서는 이런 장점을 최대한 살리고자 하였습니다. 다크 모드 전환 기능은 그 중 하나 입니다.

##### tailwindCSS와의 비교
tailwindCSS 역시 다크모드를 지원합니다. 다만, 각 모드에 대한 스타일링을 클래스네임에 모두 반영해야 하는 단점이 있는데 반해, 스타일 컴포넌트는 
동일한 디자인의 변수만 변경하는 방식으로 손쉽게 다크모드를 구현 가능합니다. 또한, 스타일링 코드와 js코드를 분할 가능하다는 점에서 가독성의 이점을 가질 수 있습니다.

### 데이터의 시각화
코인의 시세흐름 같은 연속적 데이터는 그래프 등의 시각 자료로 표현할 때 더 나은 유저경험을 줍니다. apexcharts는 데이터 시각화 라이브러리 중 하나로서 리엑트에서 사용 가능하면서도 깔끔한 스타일과 애니메이션을 지원합니다.
또한, 연속선 그래프의 형태를 특별한 커스텀 설정 없이 바로 데이터를 할당함으로써 구현가능하고 그 외의 다양한 그래프를 지원한다는 점이 주된 선택이유였습니다.

### 데이터 캐싱
대량의 코인 정보를 요청하는 앱의 특성 상, 동일한 정보를 중복 요청하지 않기 위한 캐싱 기능이 필수적이었고 그런 점에서 react-query를 채택하였습니다. 물론, 캐싱 기능이나 에러 핸들링, 로딩 스테이트는 직접 구현이 가능한 사항입니다만, 
이후 프로젝트의 확장 가능성을 고려한다면 mutation 등의 다양한 기능을 가진 react-query를 사용하는 것이 가독성이나 기능면에서 더 우수합니다. 

## 이슈-해결방안
### 데이터 요청 최적화 과정에서의 오류
#### 문제

데이터 요청을 최소화하기 위하여 유저가 일반적으로 가장 먼저 요청하는 홈 라우트에서 주요 데이터를 받고 다른 라우트 요청 시에 이 데이터를 재요청 없이 사용하도록 하였습니다.(react-router-dom의 Link state 기능)
그러나, url 검색이나 새로고침으로 홈 라우트를 경유하지 않고 다른 라우트를 요청할 시, 데이터가 제대로 들어가지 않았습니다.

#### 해결방안
특정 url을 요청할 때 홈 라우트에서 전달한 데이터를 확인하는 코드(react-router-dom의 uselocation)로 데이터의 유무를 확인합니다. 데이터가 존재하지 않을 시, 이 라우트에서 데이터를 요청하고 캐싱하도록 하였습니다.

## 배운 점
- 동적 스타일링을 하는 목적에서 스타일드 컴포넌트의 장점과 사용방법
  - css-in-js 라이브러리의 자유로운 함수, 변수 사용가능
  - theme 기능 지원으로 다크모드 구현의 편리성
 
- apexcharts 등의 라이브러리를 이용한 데이터 시각화
- 데이터를 캐싱하여서 다른 라우트에서 사용할 때 유저의 모든 url 유입 경로를 고려하여서 데이터가 없을 시에 재요청하는 코드 패턴
