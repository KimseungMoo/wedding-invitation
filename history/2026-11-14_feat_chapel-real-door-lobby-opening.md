# 2026-11-14 더 채플 앳 청담 실제 문 디자인 및 로비 입장 모션(시안 A) 적용

## 배경 및 목적

- 오프닝 화면(`DoorOpen.tsx`)의 문 디자인을 더 채플 앳 청담 6층 채플홀 실제 입구 사진과 동일한 직사각형 계단식 트래버틴 석재 프레임 및 티크 원목 양문 구조로 개편했다.
- 문틀이 벽 한가운데 액자처럼 떠 있거나 두 장의 홀 이미지가 겹치며 어색하게 보이던 문제를 해결하기 위해, 실제 로비 벽면·대리석 바닥 연결 구도와 3D 문 두께 단면, 바닥 사다리꼴 채광, 반 걸음 미세 전진(`scale: 1 → 1.24`)이 결합된 시안 A를 적용했다.

## 주요 변경 파일

- `src/components/intro/DoorOpen.tsx`
  - 상단 4줄 세로 플루트 + 하단 교차 꽃잎 양각 패턴 + 하단 원통형 손잡이 SVG(`ChapelDoorPanelSvg`) 구현
  - 크림 트래버틴 석조 벽면(`top-0 bottom-[25.5%]`)과 석재 걸레받이 플린스, 광택 대리석 로비 바닥(`top-[74.5%] bottom-0`)을 분리해 문틀 하단이 바닥 경계선에 밀착되도록 배치
  - 양문짝 안쪽 `7px` 원목 두께 단면(`rotateY(±90deg)`) 및 회전 각도에 따른 음영 변화 적용
  - 문 개방 시 로비 대리석 바닥 위로 퍼지는 사다리꼴 채광과 반 걸음 미세 전진(`scale: 1 → 1.24`), 상·하단 고정 텍스트 오버레이 구성
  - 세로 높이가 낮은 모바일 화면에서도 상단 타이틀이 문틀과 겹치지 않도록 도어 높이를 반응형(`min(360px, 46dvh)`)으로 조정하고 바닥 경계선을 `21%`로 배치, 하단 안내 문구를 `'문을 터치해 입장해 주세요'`로 변경, 상단 예식 시각을 `AM 11:30`으로 정정
- `src/components/invitation/Greeting.tsx`, `src/app/invitation/page.tsx`
  - 하단 갤러리 섹션과 중복되는 `INVITATION` 카드 내 커플 사진(`couplePhoto`) 프레임 및 `일시/장소` 하단 구분선(`border-b`) 제거, `일 시` 문구 내 `오전 11시 30분` 줄바꿈 적용
- `src/components/invitation/Gallery.tsx`, `src/app/globals.css`, `src/app/invitation/page.tsx`, `public/gallery/img-001.jpg ~ img-022.jpg`
  - `/Users/sunmoo/Downloads/청첩장사진`에서 재정렬된 `001.jpeg` ~ `022.jpg` 총 22장을 번호 순서 그대로 고화질(높이 1200px, 품질 90)로 변환하여 갤러리에 연동
  - 브라우저/Next 이미지 캐시 충돌을 방지하기 위해 파일명을 `img-001.jpg` ~ `img-022.jpg`로 고유화하고, `IntersectionObserver`를 통해 갤러리 섹션이 화면에 진입했을 때부터 4초 자동 넘김이 시작되도록 개선하여 스크롤 도달 시 항상 1번 사진(`001.jpeg`)이 먼저 표시되도록 수정
  - 가로 구도인 `020.jpeg`(`img-020.jpg`)와 정방형 `021.jpeg`(`img-021.jpg`)에서 좌측 벽면 대신 우측의 신랑·신부가 3:4 세로 프레임 중앙에 오도록 크롭 위치를 재조정
  - 갤러리 클릭 확대 모달을 제거하고, 멀티터치 핀치줌·iOS 제스처·롱프레스 이미지 저장(`-webkit-touch-callout: none`, `pointer-events: none` 및 투명 오버레이)·우클릭·드래그·인쇄/캡처 단축키 제한 적용
- `src/components/invitation/Account.tsx`, `src/app/layout.tsx`
  - 신랑(`김승무 - 토스뱅크 1000-1599-2712`) 및 신부(`성은지 - 농협 127-12-344017`) 계좌를 추가하고, 기존 혼주 계좌번호에 은행별 표준 하이픈(`112-2040-3246-03`, `3333-07-2869593`, `127-12-380646`, `127-12-204590`)을 적용하되 복사 버튼 클릭 시에는 하이픈을 제거한 순수 숫자만 클립보드에 복사되도록 수정
  - iOS 사파리·인앱 브라우저에서 계좌번호 일부만 전화번호로 오인식해 밑줄이 생기던 현상을 막기 위해 `formatDetection` 비활성화를 추가하고, 모든 계좌번호에 균일한 밑줄과 클릭 복사 동작을 적용
- `src/app/layout.tsx`, `src/app/globals.css`, `public/fonts/MaruBuri-*.woff2`
  - 네이버 마루부리(`MaruBuri` Light/Regular/SemiBold/Bold `.woff2`) 폰트 파일을 프로젝트 내에 다운로드하고 `next/font/local`로 셀프 호스팅 연동하여 외부 CDN 의존 없이 모든 브라우저에서 마루부리 서체가 즉시 적용되도록 구성

## 검증 결과

- `rm -rf .next && yarn build` 성공
- `npx tsc --noEmit` 및 `npx eslint src/components/intro/DoorOpen.tsx src/components/invitation/Greeting.tsx src/components/invitation/Gallery.tsx src/app/invitation/page.tsx` 통과
- 로컬 서버(`http://localhost:3000/opening/door`, `http://localhost:3000/invitation`)에서 닫힘/열림 화면, 상단 여백, `INVITATION` 섹션, `GALLERY` 22장 렌더링 확인 완료
