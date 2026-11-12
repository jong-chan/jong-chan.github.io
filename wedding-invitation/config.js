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
    intro: "신랑을 소개하는 짧은 문구를 입력해 주세요.",
    introJa: "新郎の紹介文を入力してください。",
  },
  bride: {
    name: "나메타 치히로",
    nameJa: "ナメタ・チヒロ",
    intro: "신부를 소개하는 짧은 문구를 입력해 주세요.",
    introJa: "新婦の紹介文を入力してください。",
  },
  wedding: {
    date: "2027-04-17", // YYYY-MM-DD
    time: "14:30",       // 한국어·일본어 모두 같은 예식 시간 표시
    venue: "라플레이스",
    venueJa: "ラプレイス",
    address: "",          // 예식장 상세 주소를 입력해 주세요.
    addressJa: "",        // 일본어 주소 (선택)
    transit: "대중교통 이용 방법을 입력해 주세요.",
    transitJa: "公共交通機関でのアクセスをご入力ください。",
    parking: "주차 정보를 입력해 주세요.",
    parkingJa: "駐車場のご案内をご入力ください。",
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

  // 메인 사진: 현재는 LSH_1765.jpg 사용. 다른 사진을 원하면 파일명만 바꾸세요.
  mainPhoto: "images/LSH_1765.jpg",

  // 웨딩 갤러리 12칸 중 업로드된 7장을 먼저 연결했습니다.
  // 추후 사진 5장을 더 올리면 빈 문자열을 해당 경로로 변경하세요.
  gallery: [
    "images/LSH_0459.jpg", // 01
    "images/LSH_0794.jpg", // 02
    "images/LSH_0853.jpg", // 03
    "images/LSH_1331.jpg", // 04
    "images/LSH_1375.jpg", // 05
    "images/LSH_1765.jpg", // 06
    "images/LSH_2092.jpg", // 07
    "", // 08 추가 예정
    "", // 09 추가 예정
    "", // 10 추가 예정
    "", // 11 추가 예정
    "", // 12 추가 예정
  ],

  // 참석 여부 자동 접수는 아직 연결되지 않았습니다.
  // Google Forms 등 외부 응답 폼 URL을 준비하면 formUrl에 입력하세요.
  rsvp: {
    formUrl: "",
  },

  // 카카오톡 직접 공유를 사용하려면 Kakao Developers 앱의 JavaScript 키를 입력하고
  // https://jong-chan.github.io 를 JavaScript SDK 도메인 및 제품 링크 웹 도메인에 등록하세요.
  // 키가 없으면 기기의 공유 메뉴에서 카카오톡을 선택하도록 안내합니다.
  share: {
    kakaoJavascriptKey: "",
  },

  // 계좌 정보를 넣으면 '복사' 버튼이 활성화됩니다.
  accounts: [
    { label: "신랑 측", labelJa: "新郎側", bank: "", holder: "", number: "" },
    { label: "신부 측", labelJa: "新婦側", bank: "", holder: "", number: "" },
  ],
};
