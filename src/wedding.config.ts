export type AccountInfo = {
  bank: string;
  accountNumber: string;
  holder: string;
};

export type ChatSpeaker = "groom" | "bride" | "bot";

export type ChatMessage = {
  from: ChatSpeaker;
  text: string;
};

export type ChatThread = {
  title: string;
  messages: ChatMessage[];
};

export type Note = {
  title: string;
  body: string;
};

export type Reminder = {
  title: string;
  when: string;
  body: string;
};

export type StoryBeat = {
  title: string;
  body: string;
};

export const wedding = {
  groom: {
    name: "김승무",
    shortName: "승무",
  },
  bride: {
    name: "성은지",
    shortName: "은지",
  },
  greeting: `사랑하지 않고 스쳐 갈 수도 있었는데,\n사랑일지도 모른다고 걸음을 멈춰준\n그 사람이 정녕 고맙다고\n-양귀자 '모순'-`,
  date: {
    iso: "2027-02-21",
    label: "2027년 2월 21일",
    weekday: "일요일",
    time: "오전 11시 30분",
    full: "2027년 2월 21일 일요일 오전 11시 30분",
  },
  venue: {
    name: "더채플앳청담",
    hall: "채플홀(6층)",
    address: "서울특별시 강남구 선릉로 757, 채플홀(6층)",
    copyAddress: "서울특별시 강남구 선릉로 757",
    tel: "02-421-1121",
    parking: "1시간 30분 무료",
  },
  accounts: {
    groom: [
      { bank: "신한은행", accountNumber: "110-123-456789", holder: "김신랑" },
      { bank: "국민은행", accountNumber: "123-45-6789012", holder: "김아버지" },
      { bank: "우리은행", accountNumber: "1002-123-456789", holder: "김어머니" },
    ] satisfies AccountInfo[],
    bride: [
      { bank: "하나은행", accountNumber: "123-456789-01234", holder: "이신부" },
      { bank: "농협은행", accountNumber: "123-4567-8901-23", holder: "이아버지" },
      { bank: "신한은행", accountNumber: "110-987-654321", holder: "이어머니" },
    ] satisfies AccountInfo[],
  },
  us: {
    botName: "약속이",
    todayAlertCount: 1,
    todayAlertText: "오늘은 알림이 하나예요. 우리, 결혼합니다.",
    intro: "까먹을까 봐 만나기로 한 날을 봇에 적어 두기 시작했어요.",
    peekLink: "승무가 몰래 적어 둔 이야기",
    backLink: "일반 청첩장으로",
    chats: [
      {
        title: "금요일 저녁",
        messages: [
          { from: "groom", text: "이번 주 금요일 저녁 가능해?" },
          {
            from: "bot",
            text: "은지 일정에 금요일 저녁이 비어 있어요. 적어 둘까요?",
          },
          { from: "groom", text: "응, 그 파스타 집으로." },
          { from: "bot", text: "적어 두었어요. 은지에게도 알려둘게요." },
          { from: "bride", text: "좋아! 그 집 좋지." },
          { from: "bot", text: "금요일 저녁, 맞춰 두었어요." },
        ],
      },
      {
        title: "영화",
        messages: [
          { from: "groom", text: "토요일 낮에 영화 볼래?" },
          { from: "bot", text: "토요일이면 오후가 더 여유로워요." },
          { from: "bride", text: "응, 낮이 좋아. 로맨스는 말고." },
          { from: "bot", text: "토요일 오후 영화, 맞춰 두었어요." },
        ],
      },
      {
        title: "가족 식사",
        messages: [
          { from: "groom", text: "다음 주 일요일, 양가 식사 잡아줘." },
          {
            from: "bot",
            text: "일요일 낮 12시로 비워둘게요. 꽃도 챙기면 좋겠어요.",
          },
          { from: "bride", text: "응, 그때로 하자." },
          { from: "bot", text: "가족 식사, 맞춰 두었어요." },
        ],
      },
    ] satisfies ChatThread[],
    notes: [
      {
        title: "입맛",
        body: "매운 건 잘 못 먹어요. 고를 때 한 번 더 봐요.",
      },
      {
        title: "손",
        body: "조금만 추워도 손이 시려요. 나갈 때 장갑을 챙기면 좋아해요.",
      },
      {
        title: "커피",
        body: "아메리카노보다 라떼. 달지 않은 쪽으로.",
      },
      {
        title: "챙길 것",
        body: "가족 식사 전에는 꽃을 잊지 말 것.",
      },
    ] satisfies Note[],
    reminders: [
      {
        title: "매주 수요일 통화",
        when: "매주 수요일 밤",
        body: "바쁜 주에도 목소리만이라도.",
      },
      {
        title: "D-7 선물",
        when: "예식 일주일 전",
        body: "거창하지 않아도 돼요. 다만 깜빡이지 말 것.",
      },
      {
        title: "부모님 일정",
        when: "예식 한 달 전",
        body: "양가에 하루를 다시 한번 여쭤보기.",
      },
    ] satisfies Reminder[],
    story: [
      {
        title: "만남",
        body: "스쳐 갈 수도 있었는데, 걸음을 멈춘 날이 있었어요.",
      },
      {
        title: "첫 약속",
        body: "만나기로 한 날을 까먹을까 봐, 그때부터 봇에 적어 두기 시작했어요.",
      },
      {
        title: "메모",
        body: "좋아하는 것, 챙길 것을 하나씩 적어 두니 마음이 조금 더 또렷해졌어요.",
      },
      {
        title: "청첩장",
        body: "오늘은 알림이 하나예요. 우리, 결혼합니다.",
      },
    ] satisfies StoryBeat[],
  },
} as const;
