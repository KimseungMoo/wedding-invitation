# 2026-08-25 feat 개발자 버전 청첩장 `/us`

## 무엇을

하객장 흐름은 두고, 신랑 폰을 훔쳐보는 `/us`를 같은 크림 청첩장 종이 위에 붙였다.

## 왜

참고 데모의 IDE·git 얼굴은 쓰지 않고, “개발자는 연애도 이렇게 하는구나”가 읽히게 하려고. 신부는 개발자가 아니라 용어는 숨겼다.

## 어떻게

- `src/wedding.config.ts`에 이름·날짜·장소·인사말·계좌·스토리 카피를 모음
- `/invitation`은 config를 읽고, 푸터에 `/us` 작은 링크
- `/us`: 히어로(알림 막대) · 약속 봇 대화 · 신부 메모 · 리마인드 · 일기 · Location/Account
- 모노 폰트는 봇 이름만 (`Geist_Mono`)

## 확인

- 변경 파일 eslint 통과
- `yarn build` — `/us` 정적 라우트 생성
- 금지 단어(branch, repository, merge, commit, PR, CI, deploy, git log) 없음
