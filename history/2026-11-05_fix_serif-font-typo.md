# 2026-11-05 fix 세리프 폰트 미적용·계좌 예금주 오타

## 무엇을

- `globals.css`의 `body`에서 잘못된 `font-family: var(--font-serif)` 선언을 제거했다.
- 한글 줄바꿈을 위해 `body`에 `word-break: keep-all`을 넣었다.
- 신부측 축의금 기본 예금주 이름(이신부·이아버지·이어머니)을 성씨(성신부·성아버지·성어머니)로 고쳤다.

## 왜

- `--font-serif`는 Tailwind v4 `@theme inline` 안에만 있어 `:root`에 노출되지 않는다. unlayered `body` 규칙이 `var(--font-serif)`를 쓰면 계산값이 무효가 되고, layered `font-serif` 유틸보다 우선해 전체가 시스템 sans-serif로 보였다.
- 신부 이름은 성은지인데 예금주 placeholder만 이씨로 되어 있었다.

## 어떻게

- `layout.tsx`의 `font-serif` 클래스만으로 Noto Serif KR이 적용되게 `body`의 `font-family` 줄을 삭제했다.
- `Account.tsx` bride 기본 holder 문자열만 수정했다.

## 결과

- 프로덕션 빌드 기준 `getComputedStyle(document.body).fontFamily`가 `"Noto Serif KR"`로 시작하고, 페이지에 쓰인 Noto Serif KR face가 loaded 상태로 올라온다.
- 신부측 계좌 아코디언에 성신부·성아버지·성어머니가 표시된다.

## 후속

- 계좌번호·은행명 placeholder는 실제 정보로 교체 필요.
- 종이 청첩장 이미지의 「김숭무」 오타는 저장소 밖(인쇄물) 문제.
