# 공픈클로 웹사이트

공픈클로는 **공무원·공공기관 AI 업무자동화 100선**을 소개하는 정적 웹사이트입니다.

공공데이터포털, KOSIS, ECOS, 법령/국회 데이터와 OpenClaw 기반 자동화 아이디어를 묶어,
실무자가 바로 탐색할 수 있는 형태로 정리했습니다.

## 링크

- **공개 사이트**: https://hosungseo.github.io/gonpunclaw-web/
- **GitHub 저장소**: https://github.com/hosungseo/gonpunclaw-web

## 핵심 구성

- **홈 랜딩**
  - 공픈클로의 브랜드/작동 방식/운영 철학 소개
- **대시보드**
  - 공공 API 기반 데모 데이터 시각화
- **100개 유스케이스**
  - 부처·부서·난이도·자동화 방식별 탐색
- **About 페이지**
  - 책/프로젝트 소개 + 운영 철학 설명

## 운영 철학

공픈클로는 단순히 "API를 많이 붙인 사이트"가 아니라,
다음 원칙을 가진 실무형 자동화 플레이북을 지향합니다.

- **Research-first** — 먼저 맥락, 법령, API, 데이터 구조를 확인
- **Verification loop** — 구현보다 검증까지를 완료 기준으로 봄
- **Quality gate** — 정확성, 안전성, 재현성, 기록 가능성까지 점검

## 기술 스택

- **Next.js 15**
- **React 19**
- **Tailwind CSS 4**
- **Framer Motion**
- **GitHub Pages** (정적 export 배포)

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 아래 주소로 확인합니다.

```bash
http://localhost:3000
```

## 프로덕션 빌드

이 프로젝트는 GitHub Pages 배포를 위해 **정적 export** 방식으로 빌드됩니다.

```bash
npm run build
```

설정은 `next.config.ts`에서 관리합니다.

- `output: "export"`
- `images.unoptimized: true`

빌드 결과물은 `out/`에 생성됩니다.

## 배포 방식

현재 배포 구조는 다음과 같습니다.

- `main` 브랜치: 소스 코드
- `gh-pages` 브랜치: 정적 export 결과물
- GitHub Pages 소스: `gh-pages` 브랜치 `/`

공개 URL:

```bash
https://hosungseo.github.io/gonpunclaw-web/
```

## 디렉토리 메모

```bash
src/app/           # 라우트 페이지
src/components/    # UI 컴포넌트
src/data/          # 유스케이스/데모 데이터
src/lib/           # 데이터 접근, 검증, 사이트 설정
src/types/         # 타입 정의
```

## 현재 상태

- 홈 랜딩 리빌드 완료
- ECC 차용 운영 철학 반영 완료
- About 페이지 철학 연결 완료
- GitHub Pages 공개 배포 완료

## 작성자

- **서호성**
- 행정안전부 조직국

---

공픈클로는 “공공데이터를 읽는 것”에서 끝내지 않고,
**실제 업무 결과물까지 자동화하는 방식**을 보여주기 위한 프로젝트입니다.
