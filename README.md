# gRPC

-   gRPC 프레임워크 구현 리포지토리

## gRPC 란?

-   HTTP 2.0 기반 RPC 프레임 워크
-   쉽게 말해 HTTP 2.0 위에서 돌아가는 REST API 비스무리한거
-   데이터를 `직렬화` 및 `압축` 하기 때문에 많은 양의 데이터를 전송할 시 REST 보다 몇배는 더 빠르게 전송 할 수 있다

## 개발환경

### 서버

-   `Java 21`

### 클라이언트

-   `Node.js`

## 사용법

### 서버

1. `Java 21` 설치

2. gradle로 빌드
    ```bash
    gradlew build
    ```
3. `VS code` 에서 디버깅 시작
    > `gradlew run` 으로 해도 되긴 하지만 한글 깨짐

### 클라이언트

1. `Node.js` & `Npm` 설치

2. 패키지 설치

    ```bash
    npm i
    ```

3. 실행

    - `VS code` 에서 디버깅 시작
    - 또는 npm 으로 시작

        ```bash
        npm run start
        ```

#### Main.proto 가 바뀔 시
- 바뀐 proto맞게 타입을 다시 빌드해야 한다
```bash
npm run protoc
```

