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
    nameJa: "ナメタ・チヒロ",
    intro: "나메타 켄지·나메타 히로코의 외동딸",
    introJa: "ナメタ・ケンジとナメタ・ヒロコの一人娘",
  },
  wedding: {
    date: "2027-04-17", // YYYY-MM-DD
    time: "14:30",       // 한국어·일본어 모두 같은 예식 시간 표시
    venue: "라플레이스",
    venueJa: "ラプレイス",
    address: "서울 강남구 테헤란로 424 대치타워 B1F",
    addressJa: "",        // 일본어 주소 (선택)
    naverMapUrl: "https://naver.me/GlJIgkbO", // 예식장의 네이버지도 공유 링크
    transit: "2호선·수인분당선 선릉역\n1번 출구에서 약 300m, 도보 3분",
    transitJa: "地下鉄2号線・水仁・盆唐線「宣陵（ソンルン）駅」\n1番出口から約300m、徒歩約3分",
    bus: "간선: 146, 333, 341, 360, 740, N13, N61\n직행: 1100, 1700, 2000, 2000-1, 7007, 9303, 9414, 8001",
    busJa: "幹線バス: 146, 333, 341, 360, 740, N13, N61\n直行バス: 1100, 1700, 2000, 2000-1, 7007, 9303, 9414, 8001",
    parking: "라플레이스 주차장 (대치타워)\nB2층~B5층, 200대 주차 가능\n하객 3시간 무료 (차량 번호 등록 후 출차)",
    parkingJa: "ラプレイス駐車場（大峙タワー）\n地下2階〜地下5階、200台駐車可能\nご参列の方は3時間無料（出庫前に車両番号の登録が必要です）",
  },
  // 카카오 앱의 공개 JavaScript 키만 입력합니다. REST API/Admin 키는 사용하지 않습니다.
  // 카카오맵 사용 설정을 켜고 웹 도메인에 https://jong-chan.github.io 등록이 필요합니다.
  maps: {
    kakaoJavascriptKey: "79081e4d779eec48d8bd41f82725477c",
    streetAddress: "서울 강남구 테헤란로 424",
  },
  invitation: [
    "서로 다른 길을 걷던 두 사람이",
    "이제 같은 방향을 바라보며 함께 걸어가려 합니다.",
    "소중한 날에 함께하시어 축복해 주시면 감사하겠습니다.",
  ],

  // 일본어를 선택하면 아래 초대 문구가 표시됩니다.
  invitationJa: [
    "それぞれの道を歩んできた二人が",
    "これからは同じ未来を見つめ、ともに歩んでまいります。",
    "大切な一日を皆さまと迎えられましたら幸いです。",
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

  // 웨딩 갤러리 12칸 중 업로드된 7장을 먼저 연결했습니다.
  // 추후 사진 5장을 더 올리면 빈 문자열을 해당 경로로 변경하세요.
  gallery: [
    "images/LSH_0459.jpg?v=optimized-20261112", // 01
    "images/LSH_0794.jpg?v=optimized-20261112", // 02
    "images/LSH_0853.jpg?v=optimized-20261112", // 03
    "images/LSH_1331.jpg?v=optimized-20261112", // 04
    "images/LSH_1375.jpg?v=optimized-20261112", // 05
    "images/LSH_1765.jpg?v=optimized-20261112", // 06
    "images/LSH_2092.jpg?v=optimized-20261112", // 07
    "", // 08 추가 예정
    "", // 09 추가 예정
    "", // 10 추가 예정
    "", // 11 추가 예정
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

  // 한국어는 groom만 표시하며, 일본어에서는 계좌 섹션을 숨깁니다.
  // 계좌 정보를 넣으면 '복사' 버튼이 활성화됩니다.
  accounts: [
    { side: "groom", label: "신랑 측", labelJa: "新郎側", bank: "하나은행", holder: "이종찬", number: "715-910207-71407" },
    { side: "bride", label: "신부 측", labelJa: "新婦側", bank: "", holder: "", number: "" },
  ],
};
