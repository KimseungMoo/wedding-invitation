# 2026-10-02 feat `/us` 시안 5 패미컴 입장 + F 본문

## 무엇을

C 귀여운 세이브 슬롯 입장을 버렸다. `/us` 첫 페인트는 시안 5 패미컴 FILE SELECT다. CONTINUE(이어하기) 뒤에 나오는 본문은 그대로 첫 시안 F 위젯이다. 본문은 파일 선택이 아니다.

## 왜

사용자가 C 대신 5. 패미컴(마리오 느낌)으로 입장을 고정했다. 마리오·버섯·닌텐도 로고·저작권 스프라이트는 쓰지 않고, 8비트 파일 선택·CONTINUE/NEW GAME·직접 그린 픽셀 두 사람만 가져왔다.

## 어떻게

- 입장: 검정+벽돌 FILE SELECT. FILE 1, 김승무·성은지, 2027.02.21, 더채플앳청담, HEARTS, CONTINUE / NEW GAME
- NEW GAME은 `NO DATA` 윙크. CONTINUE만 본문으로 간다
- 본문: D-day, 2027년 2월 달력 21일, 은지 메모, 알림, 리마인드, 이야기, 장소, 계좌
- 본문에 벽돌/검정 틴트만 얹어 아이폰 원판으로 튀지 않게 함
- `wedding.config` 사실. `/invitation` 크림·오프닝 그대로. 왕복 링크 유지

## 확인

- 변경 파일 eslint, `yarn build`
- 브라우저 390: 첫 화면 패미컴 FILE SELECT → CONTINUE 위젯 본문 → 하객장 크림 → peek로 `/us` 복귀
