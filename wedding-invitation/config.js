/**
 * 여기에 내용만 입력하면 청첩장에 자동 반영됩니다.
 * 디자인은 styles.css에서 바꿀 수 있습니다.
 * 이미지 위치: jong-chan.github.io 저장소의 wedding-invitation/images/
 * 경로 예: "images/LSH_0459.jpg" (웹 주소 /wedding-invitation/images/LSH_0459.jpg)
 * 일본어 표기는 nameJa, introJa, venueJa, invitationJa 등으로 수정합니다.
 */
window.WEDDING_CONFIG = {
  groom: {
    name: "이종찬",
    nameJa: "イ・ジョンチャン",
    intro: "이소민·김미순의 아들",
    introJa: "イ・ソミンとキム・ミスンの息子",
  },
  bride: {
    name: "나메타 치히로",
    nameJa: "行田ちひろ",
    intro: "나메타 켄지·나메타 히로코의 외동딸",
    introJa: "行田憲二と行田寛子の一人娘",
  },
  wedding: {
    date: "2027-04-17", // YYYY-MM-DD
    time: "14:30",       // 한국어·일본어 모두 같은 예식 시간 표시
    venue: "라플레이스",
    venueJa: "La Place",
    floor: "지하1층",
    floorJa: "地下1階",
    address: "서울 강남구 테헤란로 424 대치타워 B1F",
    addressJa: "B1F, 424, Teheran-ro, Gangnam-gu, Seoul",
    naverMapUrl: "https://naver.me/GlJIgkbO", // 예식장의 네이버지도 공유 링크
    transit: "2호선·수인분당선 선릉역\n1번 출구에서 약 300m, 도보 3분",
    transitJa: "地下鉄2号線・水仁・盆唐線「宣陵（ソンルン）駅」\n1番出口から約300m、徒歩約3分",
    bus: "간선: 146, 333, 341, 360, 740, N13, N61\n직행: 1100, 1700, 2000, 2000-1, 7007, 9303, 9414, 8001",
    busJa: "仁川空港から会場へのアクセス",
    // 제공된 경로와 이미지를 정리하고 중복 경로는 한 번만 표시합니다.
    airportRoutesJa: [
      {
        "title": "空港鉄道（AREX）＋地下鉄4号線・2号線",
        "steps": [
          "仁川空港ターミナル → 空港鉄道（AREX）でソウル駅へ。",
          "ソウル駅で地下鉄4号線に乗り換え、舎堂（サダン）駅へ。",
          "烏耳島（オイド）・安山（アンサン）・舎堂（サダン）行きにご乗車ください。",
          "舎堂駅で地下鉄2号線（方背・江南方面）に乗り換え、宣陵（ソンルン）駅で下車。"
        ]
      },
      {
        "title": "空港バス6009番＋地下鉄2号線",
        "steps": [
          "仁川空港ターミナル → 空港バス6009番 → 江南（カンナム）駅で下車。",
          "江南駅から地下鉄2号線（駅三・蚕室方面）に乗り、宣陵（ソンルン）駅で下車。"
        ]
      },
      {
        "title": "空港バス6103番＋徒歩",
        "steps": [
          "仁川空港ターミナル → 空港バス6103番。",
          "「三成駅・グランドインターコンチネンタル（삼성역·그랜드인터컨티넨탈）」で下車。",
          "三成（サムソン）駅から宣陵（ソンルン）駅まで徒歩約14分。"
        ]
      },
      {
        "title": "空港バス6703番＋徒歩",
        "steps": [
          "仁川空港ターミナル → 空港バス6703番。",
          "「宣靖陵駅・ラマダソウルホテル（선정릉역·라마다서울호텔）」で下車。",
          "宣靖陵（ソンジョンヌン）駅から宣陵（ソンルン）駅まで徒歩約19分。"
        ]
      },
      {
        "title": "空港バス6703番＋市内バス146番",
        "steps": [
          "仁川空港ターミナル → 空港バス6703番。",
          "「新論峴駅7番出口・教保タワー交差点（신논현역7번출구·교보타워사거리）」で下車。",
          "市内バス146番に乗り換え、「ポスコビル・DB金融センター（포스코빌딩·DB금융센터）」で下車。",
          "バス停から会場まで徒歩約2分。"
        ]
      },
      {
        "title": "空港バス6009番＋市内バス1100番または8001番",
        "steps": [
          "仁川空港ターミナル → 空港バス6009番。",
          "「新沙駅・プルン貯蓄銀行（中央）（신사역·푸른저축은행［중앙］）」で下車。",
          "1100番または8001番に乗り換え、「ポスコビル・DB金融センター（포스코빌딩·DB금융센터）」で下車。",
          "バス停から会場まで徒歩約2分。"
        ]
      },
      {
        "title": "空港バス6020番＋市内バス360番",
        "steps": [
          "仁川空港ターミナル → 空港バス6020番。",
          "「旧盤浦駅・世和高校（中央）（구반포역·세화고등학교［중앙］）」で下車。",
          "市内バス360番に乗り換え、「ポスコビル・DB金融センター（포스코빌딩·DB금융센터）」で下車。",
          "バス停から会場まで徒歩約2分。"
        ]
      }
    ],
    airportNoteJa: "方法1〜4：宣陵駅1番出口から会場（La Place・大峙タワー地下1階）まで約300m、徒歩約3分。\n徒歩時間は目安です。乗り場・停留所・運行状況はご利用前にご確認ください。",
    parking: "라플레이스 주차장 (대치타워)\nB2층~B5층, 200대 주차 가능\n하객 3시간 무료 (차량 번호 등록 후 출차)",
    parkingJa: "La Place駐車場（大峙タワー）\n地下2階〜地下5階、200台駐車可能\nご参列の方は3時間無料（出庫前に車両番号の登録が必要です）",
  },
  // 카카오 앱의 공개 JavaScript 키만 입력합니다. REST API/Admin 키는 사용하지 않습니다.
  // 카카오맵 사용 설정을 켜고 웹 도메인에 https://jong-chan.github.io 등록이 필요합니다.
  maps: {
    kakaoJavascriptKey: "79081e4d779eec48d8bd41f82725477c",
    streetAddress: "서울 강남구 테헤란로 424",
  },
  invitation: [
    "서로 다른 나라, 서로 다른 문화 속에서",
    "각자의 길을 걸어온 두 사람이 만났습니다.",
    "",
    "다름을 이해로, 이해를 사랑으로 채워가며",
    "이제 하나의 길을 함께 걸어가려 합니다.",
    "",
    "소중한 날에 함께하시어",
    "축복해 주시면 감사하겠습니다.",
  ],

  // 일본어를 선택하면 아래 초대 문구가 표시됩니다.
  invitationJa: [
    "異なる国で生まれ、異なる文化の中で",
    "それぞれの道を歩んできた二人が出会いました。",
    "",
    "お互いの違いを理解し、愛情へと育みながら",
    "これからは一つの道をともに歩んでまいります。",
    "",
    "私たちの大切な日にお越しいただき",
    "祝福していただけましたら幸いです。",
  ],

  // 메인 사진: 아치형 프레임과 하단 파도 장식으로 표시합니다.
  // 사진의 구도와 픽셀 크기를 유지하고 웹용으로 가볍게 압축했습니다.
  mainPhoto: "images/LSH_0001.jpg",

  // 배경음악: audio/wedding-bgm.mp3 사용. 버튼은 화면 오른쪽 하단에 표시됩니다.
  // 모바일 정책상 자동재생이 아닌 버튼 터치로 음악이 시작됩니다.
  music: {
    enabled: true,
    src: "audio/wedding-bgm.mp3",
    volume: 0.35,
    loop: true,
  },

  // 업로드된 사진 11장을 표시합니다. 최대 12장까지 등록할 수 있습니다.
  gallery: [
    "images/LSH_0459.jpg?v=optimized-20261112", // 01
    "images/LSH_0794.jpg?v=optimized-20261112", // 02
    "images/LSH_0853.jpg?v=optimized-20261112", // 03
    "images/LSH_1331.jpg?v=optimized-20261112", // 04
    "images/LSH_1375.jpg?v=optimized-20261112", // 05
    "images/LSH_1765.jpg?v=optimized-20261112", // 06
    "images/LSH_2092.jpg?v=optimized-20261112", // 07
    "images/LSH-0002.png", // 08
    "images/LSH-0003.png", // 09
    "images/LSH-0004.png", // 10
    "images/LSH-0005.png", // 11
    "", // 12 추가 예정
  ],

  // 선택한 언어에 맞는 Google Forms 응답 페이지를 새 창으로 엽니다.
  rsvp: {
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfXNVUeCvHf5uf1Dg3iNni4QwYsxlCX2dAyCzos6f4nr7p78g/viewform?usp=header",
    formUrlJa: "https://docs.google.com/forms/d/e/1FAIpQLSdTDDiWq9cIWDA3AghPkGiyp549XorwT5RjdKwzEhocWybZXQ/viewform?usp=header",
  },

  // 카카오톡 직접 공유를 사용하려면 Kakao Developers 앱의 JavaScript 키를 입력하고
  // https://jong-chan.github.io 를 JavaScript SDK 도메인 및 제품 링크 웹 도메인에 등록하세요.
  // 키가 없으면 기기의 공유 메뉴에서 카카오톡을 선택하도록 안내합니다.
  share: {
    kakaoJavascriptKey: "",
  },

  // 예식 당일부터 7일 동안 사용할 사진 업로드 페이지 주소를 입력하세요.
  // 주소를 비워 두면 오픈 예정/준비 중 안내만 표시됩니다.
  photoDrop: {
    testUntil: "2026-11-15T22:15:00+09:00", // 임시 테스트 종료 후 자동으로 예식 일정 적용
    uploadUrl: "https://script.google.com/macros/s/AKfycbx7j0yb8ORtFrsvWlEP4iT6HB21DLSPi4gJBOqOWepAyFv-0tJEBw5hf3liGXxumvKz/exec",
  },

  // 한국어는 양측 계좌를 표시하며, 일본어에서는 계좌 섹션을 숨깁니다.
  // 계좌 정보를 넣으면 '복사' 버튼이 활성화됩니다.
  accounts: [
    { side: "groom", label: "신랑 측", labelJa: "新郎側", bank: "하나은행", holder: "이종찬", number: "715-910207-71407" },
    { side: "bride", label: "신부 측", labelJa: "新婦側", bank: "국민은행", holder: "NAMETA CHIHIRO", number: "639002-01-724220" },
  ],
};
