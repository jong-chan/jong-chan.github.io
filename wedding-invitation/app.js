"use strict";

const config = window.WEDDING_CONFIG;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const put = (selector, value) => { $(selector).textContent = value ?? ""; };

// 현재 페이지(/wedding-invitation/)를 기준으로 사진을 로드합니다.
// config.js의 사진 경로 예시: "images/LSH_0459.jpg" -> /wedding-invitation/images/LSH_0459.jpg
const pageBase = new URL("./", window.location.href);
const resolvePhotoUrl = (path) => new URL(path, pageBase).href;

const translations = {
  ko: {
    skip: "본문으로 바로 가기", navigation: "청첩장 메뉴", languageSelection: "언어 선택",
    navInvitation: "초대", navCouple: "신랑·신부", navDate: "날짜", navGallery: "사진",
    navDirections: "오시는 길", navAccounts: "마음 전하기",
    mainPhotoAria: "메인 사진 영역", mainPhotoCaption: "메인 사진을 넣을 자리",
    heroMessage: "함께하는 첫날, 소중한 분들을 초대합니다.",
    scrollAria: "초대 문구로 이동", scrollText: "SCROLL TO EXPLORE",
    invitationHeading: "초대합니다", coupleHeading: "신랑 · 신부 소개",
    coupleDescription: "서로의 하루를 함께 채워갈 두 사람을 소개합니다.",
    groomRole: "GROOM · 신랑", brideRole: "BRIDE · 신부",
    scheduleHeading: "결혼식 날짜", calendarAria: "결혼식 달력",
    weekday0: "일", weekday1: "월", weekday2: "화", weekday3: "수", weekday4: "목", weekday5: "금", weekday6: "토",
    galleryHeading: "웨딩 갤러리", galleryDescription: "우리의 소중한 순간을 담았습니다.",
    galleryAria: "웨딩 사진 12장", galleryNote: "사진을 누르면 크게 볼 수 있습니다.",
    galleryPlaceholder: "사진을 추가해 주세요", directionsHeading: "오시는 길",
    mapAria: "예식장 지도", mapLoading: "지도를 불러오는 중입니다.",
    mapUnavailable: "지도를 표시할 수 없습니다. 아래 지도 버튼에서 위치를 확인해 주세요.",
    mapLinksAria: "지도 앱에서 보기", transitTitle: "지하철 안내", busTitle: "버스 안내", parkingTitle: "주차 안내",
    accountsHeading: "마음 전하는 곳", accountsDescription: "함께 축하해 주시는 마음만으로도 큰 기쁨입니다.",
    photoDialogAria: "웨딩 사진 크게 보기", closePhoto: "사진 닫기", prevPhoto: "← 이전", nextPhoto: "다음 →",
    prevPhotoAria: "이전 사진", nextPhotoAria: "다음 사진",
    missingTime: "예식 시간 추후 안내", missingAddress: "예식장 상세 주소를 입력해 주세요.",
    kakaoMap: "카카오맵", naverMap: "네이버지도", googleMap: "구글지도",
    groomSide: "신랑 측", brideSide: "신부 측",
    copyAccount: "계좌번호 복사", missingAccount: "계좌 정보를 입력하면 이곳에 표시됩니다.",
    copied: "계좌번호를 복사했습니다.", copyFailed: "복사에 실패했습니다. 계좌번호를 직접 선택해 주세요.",
    today: "오늘, 저희 결혼합니다!", past: "함께해 주셔서 감사합니다.",
    photoAlt: (n) => `웨딩 사진 ${n}`,
    photoZoom: (n) => `웨딩 사진 ${n} 크게 보기`,
    heroAlt: (g, b) => `${g}과 ${b}의 메인 웨딩 사진`,
    weddingDay: (m, d) => `${m}월 ${d}일, 결혼식 날`,
    countdown: (days) => `결혼식까지 D-${days}`,
    signature: (g, b) => `${g} · ${b} 올림`,
    documentTitle: (g, b) => `${g} ♥ ${b} | 모바일 청첩장`,
    metaDescription: "소중한 분들을 결혼식에 초대합니다.",
    rsvpHeading: "참석 여부", rsvpDescription: "소중한 분들을 더욱 정성껏 모실 수 있도록 참석 여부를 알려주세요.",
    rsvpOpen: "참석 여부 전달하기", rsvpDialogHeading: "참석 여부 전달", closeRsvp: "닫기",
    rsvpName: "성함", rsvpNamePlaceholder: "성함을 입력해 주세요", rsvpSide: "어느 쪽 하객이신가요?",
    rsvpSideSelect: "선택해 주세요", rsvpAttendance: "참석 여부", rsvpYes: "참석합니다", rsvpNo: "참석이 어렵습니다",
    rsvpGuestCount: "참석 인원 (본인 포함)", rsvpNote: "전하실 말씀 (선택)", rsvpNotePlaceholder: "메시지를 입력해 주세요",
    rsvpDisclaimer: "현재 응답 자동 접수는 연결되지 않았습니다. 작성한 내용을 복사하거나 메시지로 직접 보내야 전달됩니다.",
    rsvpPrepare: "응답 내용 만들기", rsvpResultLabel: "작성된 참석 응답", rsvpCopy: "응답 내용 복사",
    rsvpShare: "메시지로 보내기", rsvpAfterNotice: "응답 내용을 신랑 또는 신부에게 보내야 접수됩니다.",
    rsvpCopied: "응답 내용을 복사했습니다. 신랑 또는 신부에게 보내 주세요.",
    rsvpPrepared: "응답이 작성되었습니다. 복사하거나 공유해 주세요.",
    rsvpResultTitle: "[결혼식 참석 여부]", rsvpResultName: "성함", rsvpResultSide: "하객 구분", rsvpResultAttendance: "참석 여부", rsvpResultGuests: "참석 인원", rsvpResultNote: "전하실 말씀",
    shareHeading: "청첩장 공유하기", shareMessenger: "카카오톡으로 전달하기", copyInvitationLink: "청첩장 링크 복사하기",
    shareText: "이종찬 ♥ 나메타 치히로 결혼합니다! 2027년 4월 17일(토) 오후 2시 30분, 라플레이스",
    linkCopied: "청첩장 주소를 복사했습니다.", shareHint: "공유 목록에서 카카오톡을 선택해 주세요.",
    shareUnavailable: "카카오톡 직접 공유 설정 전입니다. 링크를 복사해 전달해 주세요.",
    musicPlay: "배경음악 재생", musicPause: "배경음악 일시정지",
    musicError: "음악을 재생할 수 없습니다. 음악 파일과 브라우저 설정을 확인해 주세요.",
  },
  ja: {
    skip: "本文へ移動", navigation: "招待状メニュー", languageSelection: "言語を選択",
    navInvitation: "ご挨拶", navCouple: "新郎・新婦", navDate: "日時", navGallery: "写真",
    navDirections: "アクセス", navAccounts: "お祝いのお気持ち",
    mainPhotoAria: "メイン写真", mainPhotoCaption: "メイン写真を入れる場所",
    heroMessage: "新たな一歩を踏み出す私たちを、どうぞ見守ってください。",
    scrollAria: "ご挨拶へ移動", scrollText: "SCROLL TO EXPLORE",
    invitationHeading: "ご招待のご挨拶", coupleHeading: "新郎・新婦のご紹介",
    coupleDescription: "これからの日々をともに歩む二人をご紹介します。",
    groomRole: "GROOM · 新郎", brideRole: "BRIDE · 新婦",
    scheduleHeading: "挙式日時", calendarAria: "挙式日のカレンダー",
    weekday0: "日", weekday1: "月", weekday2: "火", weekday3: "水", weekday4: "木", weekday5: "金", weekday6: "土",
    galleryHeading: "ウェディングギャラリー", galleryDescription: "私たちの大切な瞬間を集めました。",
    galleryAria: "ウェディング写真12枚", galleryNote: "写真をタップすると拡大できます。",
    galleryPlaceholder: "写真を追加してください", directionsHeading: "会場へのアクセス",
    mapAria: "会場の地図", mapLoading: "地図を読み込んでいます。",
    mapUnavailable: "地図を表示できません。下の地図ボタンから会場をご確認ください。",
    mapLinksAria: "地図アプリで見る", transitTitle: "地下鉄のご案内", busTitle: "バスのご案内", parkingTitle: "駐車場のご案内",
    accountsHeading: "お祝いのお気持ち", accountsDescription: "お祝いのお気持ちだけでも、私たちにとって大きな喜びです。",
    photoDialogAria: "ウェディング写真を拡大表示", closePhoto: "写真を閉じる", prevPhoto: "← 前へ", nextPhoto: "次へ →",
    prevPhotoAria: "前の写真", nextPhotoAria: "次の写真",
    missingTime: "挙式時間は後日ご案内します", missingAddress: "会場の住所をご入力ください。",
    kakaoMap: "Kakaoマップ", naverMap: "NAVERマップ", googleMap: "Googleマップ",
    groomSide: "新郎側", brideSide: "新婦側",
    copyAccount: "口座番号をコピー", missingAccount: "口座情報を入力すると、ここに表示されます。",
    copied: "口座番号をコピーしました。", copyFailed: "コピーできませんでした。口座番号を直接選択してください。",
    today: "本日、結婚式を迎えます！", past: "お祝いしていただき、ありがとうございました。",
    photoAlt: (n) => `ウェディング写真 ${n}`,
    photoZoom: (n) => `ウェディング写真 ${n} を拡大`,
    heroAlt: (g, b) => `${g}と${b}のメインウェディング写真`,
    weddingDay: (m, d) => `${m}月${d}日、挙式日`,
    countdown: (days) => `結婚式まであと${days}日`,
    signature: (g, b) => `${g} · ${b} より`,
    documentTitle: (g, b) => `${g} ♥ ${b} | 結婚式のご案内`,
    metaDescription: "私たちの結婚式にご招待いたします。",
    rsvpHeading: "ご出欠の確認", rsvpDescription: "皆さまを心を込めてお迎えするため、ご出欠をお知らせください。",
    rsvpOpen: "出欠を連絡する", rsvpDialogHeading: "出欠のご連絡", closeRsvp: "閉じる",
    rsvpName: "お名前", rsvpNamePlaceholder: "お名前をご入力ください", rsvpSide: "新郎・新婦どちらのご招待ですか？",
    rsvpSideSelect: "選択してください", rsvpAttendance: "ご出欠", rsvpYes: "出席します", rsvpNo: "欠席します",
    rsvpGuestCount: "出席人数（ご本人を含む）", rsvpNote: "メッセージ（任意）", rsvpNotePlaceholder: "メッセージをご入力ください",
    rsvpDisclaimer: "現時点では回答の自動受付は未設定です。内容をコピーするか、メッセージで直接お送りください。",
    rsvpPrepare: "回答内容を作成する", rsvpResultLabel: "作成した出欠のご連絡", rsvpCopy: "回答をコピー",
    rsvpShare: "メッセージで送る", rsvpAfterNotice: "新郎または新婦へ送信して初めて受付となります。",
    rsvpCopied: "回答をコピーしました。新郎または新婦へお送りください。",
    rsvpPrepared: "回答を作成しました。コピーまたは共有してください。",
    rsvpResultTitle: "【結婚式のご出欠】", rsvpResultName: "お名前", rsvpResultSide: "ご招待側", rsvpResultAttendance: "ご出欠", rsvpResultGuests: "出席人数", rsvpResultNote: "メッセージ",
    shareHeading: "招待状をシェア", shareMessenger: "LINEで送る", copyInvitationLink: "招待状のリンクをコピー",
    shareText: "イ・ジョンチャン＆ナメタ・チヒロの結婚式にご招待します。2027年4月17日（土）14:30、ラプレイス",
    linkCopied: "招待状のリンクをコピーしました。", shareHint: "共有先からLINEを選んでください。",
    shareUnavailable: "共有できませんでした。リンクをコピーしてお送りください。",
    musicPlay: "BGMを再生", musicPause: "BGMを一時停止",
    musicError: "音楽を再生できません。音声ファイルやブラウザの設定をご確認ください。",
  }
};

let currentLang = "ko";
const t = (key) => translations[currentLang][key];
const localized = (obj, key) => {
  const japanese = obj && obj[`${key}Ja`];
  return currentLang === "ja" && japanese != null && japanese !== "" ? japanese : (obj?.[key] ?? "");
};

function weddingDateParts() {
  const [year, month, day] = (config.wedding.date || "2027-04-17").split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return { year, month, day, date };
}
function getNames() {
  return [localized(config.groom, "name"), localized(config.bride, "name")];
}

function renderStaticText() {
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-aria]').forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  $$('[data-i18n-placeholder]').forEach((el) => { el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder)); });
  const [groomName, brideName] = getNames();
  document.title = t("documentTitle")(groomName, brideName);
  $('meta[name="description"]').setAttribute("content", t("metaDescription"));
  document.documentElement.lang = currentLang;
  $$('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === currentLang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderContent() {
  const { year, month, day, date } = weddingDateParts();
  const [groomName, brideName] = getNames();
  const venue = localized(config.wedding, "venue");
  const weekdays = currentLang === "ja" ? ["日", "月", "火", "水", "木", "金", "土"] : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const heroDate = currentLang === "ja"
    ? `${year}. ${String(month).padStart(2,"0")}. ${String(day).padStart(2,"0")}.（${weekdays[date.getDay()]}）`
    : `${year}. ${String(month).padStart(2,"0")}. ${String(day).padStart(2,"0")}. ${weekdays[date.getDay()]}`;
  $("#heroTitle").replaceChildren(
    document.createTextNode(`${groomName} `),
    create("span", "amp", "&"),
    document.createTextNode(` ${brideName}`)
  );
  put("#heroDate", heroDate);
  put("#heroVenue", venue);
  const invite = currentLang === "ja" && Array.isArray(config.invitationJa) ? config.invitationJa : config.invitation;
  put("#invitationText", (invite || []).join("\n"));
  put("#invitationSignature", t("signature")(groomName, brideName));
  put("#groomName", groomName);
  put("#groomIntro", localized(config.groom, "intro"));
  put("#brideName", brideName);
  put("#brideIntro", localized(config.bride, "intro"));
  const dateLabel = currentLang === "ja"
    ? `${year}年${month}月${day}日（${["日", "月", "火", "水", "木", "金", "土"][date.getDay()]}）`
    : new Intl.DateTimeFormat("ko-KR", { year:"numeric",month:"long",day:"numeric",weekday:"long" }).format(date);
  put("#scheduleDate", dateLabel);
  put("#scheduleDetail", `${config.wedding.time || t("missingTime")}  ·  ${venue}`);
  put("#venueName", venue);
  put("#venueAddress", localized(config.wedding, "address") || (config.wedding.address || t("missingAddress")));
  put("#transitInfo", localized(config.wedding, "transit"));
  put("#busInfo", localized(config.wedding, "bus"));
  put("#parkingInfo", localized(config.wedding, "parking"));
  put("#footerNames", `${groomName} & ${brideName}`);
  const mainImage = $("#heroPhoto img");
  if (mainImage) mainImage.alt = t("heroAlt")(groomName, brideName);
}

// 사진은 건드리지 않고 사진 위의 독립된 레이어만 애니메이션 처리합니다.
// SVG는 코드에서 생성하며 외부 라이브러리나 GIF 이미지를 사용하지 않습니다.
function makePetalSvg(isFlower) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", isFlower ? "0 0 40 40" : "0 0 28 34");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("aria-hidden", "true");
  if (isFlower) {
    // 작고 은은한 다섯 잎 벚꽃 모양
    const group = document.createElementNS(svg.namespaceURI, "g");
    for (let i = 0; i < 5; i++) {
      const petal = document.createElementNS(svg.namespaceURI, "path");
      petal.setAttribute("d", "M20 19 C13 15 12 7 18 4 C21 2 26 5 25 10 C25 14 22 17 20 19 Z");
      petal.setAttribute("transform", `rotate(${i * 72} 20 20)`);
      petal.setAttribute("fill", i % 2 ? "#f7d9dc" : "#ffe9e5");
      petal.setAttribute("stroke", "#f2c9cd");
      petal.setAttribute("stroke-width", ".65");
      group.append(petal);
    }
    const center = document.createElementNS(svg.namespaceURI, "circle");
    center.setAttribute("cx", "20");
    center.setAttribute("cy", "19");
    center.setAttribute("r", "2.5");
    center.setAttribute("fill", "#ead1a6");
    svg.append(group, center);
  } else {
    const petal = document.createElementNS(svg.namespaceURI, "path");
    petal.setAttribute("d", "M14 2 C23 3 28 11 25 20 C23 27 16 30 13 33 C11 27 4 24 3 17 C2 9 7 2 14 2 Z");
    petal.setAttribute("fill", "currentColor");
    petal.setAttribute("stroke", "#e7c4c8");
    petal.setAttribute("stroke-width", ".8");
    const vein = document.createElementNS(svg.namespaceURI, "path");
    vein.setAttribute("d", "M13 29 Q17 18 14 6");
    vein.setAttribute("fill", "none");
    vein.setAttribute("stroke", "#dbaab1");
    vein.setAttribute("stroke-width", ".6");
    vein.setAttribute("opacity", ".55");
    svg.append(petal, vein);
  }
  return svg;
}

function addHeroDecoration(photo) {
  const options = config.heroDecoration || {};
  if (options.title) {
    const title = create("div", "hero-photo-title", options.title);
    title.setAttribute("aria-hidden", "true");
    photo.append(title);
  }
  if (options.petals === false || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = create("div", "flower-petals");
  layer.setAttribute("aria-hidden", "true");
  const count = Math.min(Math.max(Number(options.petalCount) || 18, 1), 32);
  const colors = ["#ffe7e5", "#f8d2d8", "#fff0e9", "#f3dadd", "#fce4e9"];

  for (let i = 0; i < count; i++) {
    const isFlower = i % 6 === 0;
    const petal = create("span", "flower-petal");
    petal.append(makePetalSvg(isFlower));
    // 위치·속도·크기를 다르게 하여 자연스럽게 바람에 날리는 듯한 효과
    const x = (i * 37 + 11) % 98;
    const scale = (0.72 + (i % 5) * .11);
    const xDrift = (i % 2 ? 1 : -1) * (40 + (i % 5) * 23);
    const size = isFlower ? 21 + i % 5 : 13 + i % 8;
    petal.style.setProperty("--x", `${x}%`);
    petal.style.setProperty("--size", `${size}px`);
    petal.style.setProperty("--scale", `${scale}`);
    petal.style.setProperty("--drift", `${xDrift}px`);
    petal.style.setProperty("--sway", `${-xDrift * .34}px`);
    petal.style.setProperty("--duration", `${6.5 + (i * 7 % 9) * .6}s`);
    petal.style.setProperty("--delay", `${-(i * 1.93) % 11}s`);
    petal.style.setProperty("--tint", colors[i % colors.length]);
    layer.append(petal);
  }
  photo.append(layer);
}

function initHeroPhoto() {
  if (!config.mainPhoto) return;
  const photo = $("#heroPhoto");
  const img = create("img", "hero-image");
  img.alt = t("heroAlt")(...getNames());
  img.decoding = "async";
  img.addEventListener("load", () => {
    photo.classList.remove("photo-placeholder");
    // 이미지 엘리먼트 자체는 고정하고, 별도 타이틀/꽃잎 레이어만 추가합니다.
    photo.replaceChildren(img);
    addHeroDecoration(photo);
  }, { once: true });
  img.addEventListener("error", () => {
    console.warn("메인 사진 경로를 확인해 주세요:", config.mainPhoto);
  }, { once: true });
  img.src = resolvePhotoUrl(config.mainPhoto);
}

function renderCalendar() {
  const { year, month, day } = weddingDateParts();
  put("#calendarMonth", currentLang === "ja" ? `${year}年${month}月` : `${year}년 ${month}월`);
  const calendar = $("#calendarDays");
  calendar.replaceChildren();
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const lastDay = new Date(year, month, 0).getDate();
  for (let i = 0; i < firstWeekday; i++) {
    const empty = create("span", "calendar-blank");
    empty.setAttribute("aria-hidden", "true");
    calendar.append(empty);
  }
  for (let n = 1; n <= lastDay; n++) {
    const cell = create("span", n === day ? "calendar-day is-wedding" : "calendar-day", String(n));
    if (n === day) {
      cell.setAttribute("aria-label", t("weddingDay")(month, day));
      cell.setAttribute("aria-current", "date");
    }
    calendar.append(cell);
  }
  // 한국과 일본의 시간대는 모두 UTC+9입니다.
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const getPart = (type) => Number(dateParts.find((p) => p.type === type).value);
  const days = Math.round((Date.UTC(year, month - 1, day) - Date.UTC(getPart("year"), getPart("month") - 1, getPart("day"))) / 86400000);
  put("#dday", days > 0 ? t("countdown")(days) : days === 0 ? t("today") : t("past"));
}

const validGallery = [];
let selectedPhoto = 0;
let previousFocus = null;

function refreshGalleryLabels() {
  $$(".gallery-button").forEach((button) => {
    const n = Number(button.dataset.photoNumber);
    button.setAttribute("aria-label", t("photoZoom")(n));
    const image = button.querySelector("img");
    if (image) image.alt = t("photoAlt")(n);
  });
  if (validGallery.length && $("#photoDialog").open) showSelectedPhoto();
}
function showSelectedPhoto() {
  const image = validGallery[selectedPhoto];
  if (!image) return;
  $("#dialogImage").src = image.src;
  $("#dialogImage").alt = t("photoAlt")(image.number);
  put("#photoCount", `${selectedPhoto + 1} / ${validGallery.length}`);
  $("#prevPhoto").disabled = validGallery.length < 2;
  $("#nextPhoto").disabled = validGallery.length < 2;
}
function openGallery(index) {
  if (index < 0 || !validGallery.length) return;
  selectedPhoto = index;
  previousFocus = document.activeElement;
  showSelectedPhoto();
  $("#photoDialog").showModal();
  document.body.classList.add("dialog-open");
}
function closeGallery() { $("#photoDialog").close(); }
function initGallery() {
  const grid = $("#galleryGrid");
  const paths = Array.isArray(config.gallery) ? config.gallery.slice(0, 12) : [];
  while (paths.length < 12) paths.push("");
  paths.forEach((src, i) => {
    const number = i + 1;
    const tile = create("div", "gallery-tile photo-placeholder");
    tile.append(create("span", "gallery-placeholder-label", `PHOTO ${String(number).padStart(2,"0")}`));
    const caption = create("span", "gallery-placeholder-caption", t("galleryPlaceholder"));
    caption.dataset.i18n = "galleryPlaceholder";
    tile.append(caption);
    grid.append(tile);
    if (!src) return;
    const photoUrl = resolvePhotoUrl(src);
    const button = create("button", "gallery-button");
    button.type = "button";
    button.dataset.photoNumber = String(number);
    button.setAttribute("aria-label", t("photoZoom")(number));
    button.style.opacity = "0";
    button.style.position = "absolute";
    button.style.inset = "0";
    button.style.pointerEvents = "none";
    const img = create("img", "gallery-image");
    img.alt = t("photoAlt")(number);
    img.loading = "lazy";
    button.append(img);
    tile.append(button);
    img.addEventListener("load", () => {
      validGallery.push({ src: photoUrl, number });
      validGallery.sort((a, b) => a.number - b.number);
      button.removeAttribute("style");
      tile.replaceChildren(button);
      tile.classList.remove("photo-placeholder");
    }, { once: true });
    img.addEventListener("error", () => button.remove(), { once: true });
    button.addEventListener("click", () => openGallery(validGallery.findIndex((photo) => photo.number === number)));
    img.src = photoUrl;
  });
  $("#closeDialog").addEventListener("click", closeGallery);
  $("#prevPhoto").addEventListener("click", () => {
    selectedPhoto = (selectedPhoto + validGallery.length - 1) % validGallery.length;
    showSelectedPhoto();
  });
  $("#nextPhoto").addEventListener("click", () => {
    selectedPhoto = (selectedPhoto + 1) % validGallery.length;
    showSelectedPhoto();
  });
  $("#photoDialog").addEventListener("click", (event) => {
    if (event.target === $("#photoDialog")) closeGallery();
  });
  $("#photoDialog").addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (!$("#photoDialog").open) return;
    if (event.key === "ArrowLeft" && validGallery.length > 1) $("#prevPhoto").click();
    if (event.key === "ArrowRight" && validGallery.length > 1) $("#nextPhoto").click();
  });
}

let mapRenderVersion = 0;
let kakaoMapsSdkPromise;
let kakaoMapView;

function loadKakaoMaps(appkey) {
  if (window.kakao?.maps?.Map && window.kakao.maps.services?.Geocoder) return Promise.resolve(window.kakao.maps);
  if (kakaoMapsSdkPromise) return kakaoMapsSdkPromise;
  kakaoMapsSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    let timer;
    let settled = false;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) { script.remove(); reject(error); }
      else resolve(window.kakao.maps);
    };
    script.onload = () => {
      if (!window.kakao?.maps?.load) { finish(new Error("Kakao Maps SDK unavailable")); return; }
      window.kakao.maps.load(() => {
        if (window.kakao.maps.services?.Geocoder) finish();
        else finish(new Error("Kakao Maps geocoder unavailable"));
      });
    };
    script.onerror = () => finish(new Error("Kakao Maps SDK failed to load"));
    const url = new URL("https://dapi.kakao.com/v2/maps/sdk.js");
    url.search = new URLSearchParams({ appkey, libraries: "services", autoload: "false" });
    script.src = url.href;
    script.async = true;
    timer = setTimeout(() => finish(new Error("Kakao Maps SDK timed out")), 15000);
    document.head.append(script);
  }).catch((error) => { kakaoMapsSdkPromise = undefined; throw error; });
  return kakaoMapsSdkPromise;
}

function showMapMessage(provider, message) {
  const container = $("#venueMap");
  const card = create("div", "venue-map-card");
  card.append(create("span", "map-brand", provider));
  const status = create("p", "map-status", message);
  status.setAttribute("role", "status");
  card.append(status);
  container.replaceChildren(card);
}

async function renderVenueMap() {
  const version = ++mapRenderVersion;
  const container = $("#venueMap");
  if (currentLang === "ja") {
    const iframe = create("iframe", "venue-map-frame");
    iframe.title = "会場のGoogleマップ";
    const url = new URL("https://www.google.com/maps");
    url.search = new URLSearchParams({
      q: `${config.wedding.venue} ${config.maps?.streetAddress || config.wedding.address}`,
      output: "embed", hl: "ja", z: "17"
    });
    iframe.src = url.href;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    container.replaceChildren(iframe);
    return;
  }
  if (kakaoMapView) {
    container.replaceChildren(kakaoMapView.canvas);
    kakaoMapView.map.relayout();
    kakaoMapView.map.setCenter(kakaoMapView.position);
    return;
  }
  const key = config.maps?.kakaoJavascriptKey?.trim();
  if (!key) {
    console.warn("[Wedding map] configuration: Kakao JavaScript key is missing");
    showMapMessage("KAKAO MAP", t("mapUnavailable"));
    return;
  }
  showMapMessage("KAKAO MAP", t("mapLoading"));
  let stage = "SDK loading";
  try {
    const maps = await loadKakaoMaps(key);
    if (version !== mapRenderVersion) return;
    stage = "address search";
    const location = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Geocoding timed out")), 15000);
      new maps.services.Geocoder().addressSearch(config.maps?.streetAddress || config.wedding.address, (results, status) => {
        clearTimeout(timer);
        const address = results?.[0];
        if (status !== maps.services.Status.OK || !address) reject(new Error(`Venue address search failed: ${status}`));
        else resolve({ lat: Number(address.y), lng: Number(address.x) });
      });
    });
    if (version !== mapRenderVersion) return;
    if (!Number.isFinite(location.lat) || !Number.isFinite(location.lng)) throw new Error("Invalid map location");
    stage = "map rendering";
    const canvas = create("div", "venue-map-canvas");
    container.replaceChildren(canvas);
    const position = new maps.LatLng(location.lat, location.lng);
    const map = new maps.Map(canvas, { center: position, level: 3, scrollwheel: false });
    new maps.Marker({ position, map, title: config.wedding.venue });
    map.addControl(new maps.ZoomControl(), maps.ControlPosition.RIGHT);
    kakaoMapView = { canvas, map, position };
  } catch (error) {
    if (version === mapRenderVersion) {
      console.warn(`[Wedding map] ${stage}:`, error);
      showMapMessage("KAKAO MAP", t("mapUnavailable"));
    }
  }
}

function renderDirections() {
  const { venue, address } = config.wedding;
  const query = encodeURIComponent(`${venue} ${address}`);
  const googleUrl = new URL("https://www.google.com/maps/search/");
  googleUrl.search = new URLSearchParams({ api: "1", query: `${venue} ${address}`, hl: currentLang === "ja" ? "ja" : "ko" });
  const container = $("#mapLinks");
  container.replaceChildren();
  [
    { label: t("kakaoMap"), url: `https://map.kakao.com/link/search/${query}` },
    { label: t("naverMap"), url: config.wedding.naverMapUrl || `https://map.naver.com/p/search/${query}` },
    { label: t("googleMap"), url: googleUrl.href },
  ].forEach(({ label, url }) => {
    const anchor = create("a", "outline-button map-app-button", label);
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    container.append(anchor);
  });
  renderVenueMap();
}

let toastTimeout;
function toast(message) {
  const box = $("#toast");
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => box.classList.remove("show"), 2200);
}
async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    toast(t("copied"));
  } catch (_) {
    toast(t("copyFailed"));
  }
}
function renderAccounts() {
  const container = $("#accountGroups");
  const opened = [...container.querySelectorAll(".account-details")].map((detail) => detail.open);
  container.replaceChildren();
  (config.accounts || []).forEach((account, i) => {
    const { bank, holder, number } = account;
    const details = create("details", "account-details");
    details.open = Boolean(opened[i]);
    const summary = create("summary", "account-summary", localized(account, "label") || (i === 0 ? t("groomSide") : t("brideSide")));
    const content = create("div", "account-content");
    if (bank && holder && number) {
      content.append(create("p", "bank-name", `${localized(account, "bank")} · ${localized(account, "holder")}`));
      content.append(create("p", "account-number", number));
      const copy = create("button", "outline-button copy-button", t("copyAccount"));
      copy.type = "button";
      copy.addEventListener("click", () => copyText(number));
      content.append(copy);
    } else {
      content.append(create("p", "account-empty", t("missingAccount")));
    }
    details.append(summary, content);
    container.append(details);
  });
}

// 공개 청첩장 URL을 고정해 브라우저의 추적 파라미터나 해시가 공유되지 않도록 합니다.
const invitationBaseUrl = "https://jong-chan.github.io/wedding-invitation/";
const localizedInvitationUrl = () => currentLang === "ja" ? invitationBaseUrl + "?lang=ja" : invitationBaseUrl;

async function copyPlainText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (_) {
    // 권한/브라우저에 따라 실패할 수 있으므로 사용자가 직접 선택할 수 있도록 반환합니다.
    return false;
  }
}

function initShare() {
  $("#copyInvitationLink").addEventListener("click", async () => {
    if (await copyPlainText(localizedInvitationUrl())) toast(t("linkCopied"));
    else window.prompt(t("copyInvitationLink"), localizedInvitationUrl());
  });
  $("#shareMessenger").addEventListener("click", async () => {
    const url = localizedInvitationUrl();
    if (currentLang === "ja") {
      // LINE Developers에서 안내하는 URL+문구 공유 링크.
      const lineUrl = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(t("shareText"));
      window.open(lineUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const kakaoKey = (config.share?.kakaoJavascriptKey || "").trim();
    if (kakaoKey) {
      try {
        await ensureKakaoSdk(kakaoKey);
        window.Kakao.Share.sendDefault({
          objectType: "text", text: t("shareText"),
          link: { mobileWebUrl: url, webUrl: url }, buttonTitle: "청첩장 보기"
        });
        return;
      } catch (error) { console.warn("Kakao sharing unavailable:", error); }
    }
    // 카카오 JavaScript 키 미설정 시 휴대전화의 공유 메뉴를 사용합니다.
    // 이 메뉴에서 사용자가 카카오톡을 직접 선택할 수 있습니다.
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, text: t("shareText"), url });
        return;
      } catch (error) { if (error?.name === "AbortError") return; }
    }
    if (await copyPlainText(url)) toast(t("shareUnavailable"));
    else window.prompt(t("copyInvitationLink"), url);
  });
}

let kakaoSdkPromise;
function ensureKakaoSdk(key) {
  if (window.Kakao) {
    if (!window.Kakao.isInitialized()) window.Kakao.init(key);
    return Promise.resolve();
  }
  if (!kakaoSdkPromise) {
    kakaoSdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.5/kakao.min.js";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (!window.Kakao) return reject(new Error("Kakao SDK unavailable"));
        if (!window.Kakao.isInitialized()) window.Kakao.init(key);
        resolve();
      };
      script.onerror = () => reject(new Error("Kakao SDK failed to load"));
      document.head.append(script);
    }).catch((error) => { kakaoSdkPromise = null; throw error; });
  }
  return kakaoSdkPromise;
}

function updateRsvpCount() {
  const attending = $("#rsvpAttendance").value === "yes";
  $("#rsvpGuestCountField").hidden = !attending;
  $("#rsvpGuestCount").required = attending;
}
function buildRsvpMessage() {
  const name = $("#rsvpName").value.trim();
  const side = $("#rsvpSide").value;
  const attend = $("#rsvpAttendance").value;
  const num = Number($("#rsvpGuestCount").value) || 1;
  const note = $("#rsvpNote").value.trim();
  return [
    t("rsvpResultTitle"),
    `${t("rsvpResultName")}: ${name}`,
    `${t("rsvpResultSide")}: ${side === "groom" ? t("groomSide") : t("brideSide")}`,
    `${t("rsvpResultAttendance")}: ${attend === "yes" ? t("rsvpYes") : t("rsvpNo")}`,
    ...(attend === "yes" ? [`${t("rsvpResultGuests")}: ${num}`] : []),
    ...(note ? [`${t("rsvpResultNote")}: ${note}`] : []),
    invitationBaseUrl
  ].join("\n");
}
function initRsvp() {
  const dialog = $("#rsvpDialog");
  $("#openRsvp").addEventListener("click", () => {
    const formUrl = (config.rsvp?.formUrl || "").trim();
    if (formUrl && /^https:\/\//i.test(formUrl)) {
      window.open(formUrl, "_blank", "noopener,noreferrer");
    } else {
      dialog.showModal();
      $("#rsvpName").focus();
    }
  });
  $("#closeRsvp").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  $("#rsvpAttendance").addEventListener("change", updateRsvpCount);
  $("#rsvpForm").addEventListener("submit", (event) => {
    event.preventDefault();
    $("#rsvpResultText").value = buildRsvpMessage();
    $("#rsvpResult").hidden = false;
    $("#rsvpResult").scrollIntoView({ behavior: "smooth", block: "nearest" });
    toast(t("rsvpPrepared"));
  });
  $("#copyRsvp").addEventListener("click", async () => {
    if (await copyPlainText($("#rsvpResultText").value)) toast(t("rsvpCopied"));
    else { $("#rsvpResultText").focus(); $("#rsvpResultText").select(); }
  });
  $("#shareRsvp").addEventListener("click", async () => {
    const text = $("#rsvpResultText").value;
    if (navigator.share) {
      try { await navigator.share({ text, title: t("rsvpDialogHeading") }); return; }
      catch (error) { if (error?.name === "AbortError") return; }
    }
    if (await copyPlainText(text)) toast(t("rsvpCopied"));
    else { $("#rsvpResultText").focus(); $("#rsvpResultText").select(); }
  });
  updateRsvpCount();
}


// 오디오 파일이 없는 상태에서는 버튼을 숨깁니다. 자동재생은 시도하지 않습니다.
function updateMusicButton() {
  const button = $("#musicToggle");
  const audio = $("#weddingBgm");
  if (!button || button.hidden) return;
  const playing = !audio.paused && !audio.ended;
  button.classList.toggle("is-playing", playing);
  button.setAttribute("aria-pressed", String(playing));
  button.setAttribute("aria-label", playing ? t("musicPause") : t("musicPlay"));
  button.title = playing ? t("musicPause") : t("musicPlay");
  put("#musicButtonText", playing ? "BGM ON" : "BGM OFF");
}
function initBackgroundMusic() {
  const audioOptions = config.music || {};
  if (!audioOptions.enabled || !audioOptions.src) return;
  const audio = $("#weddingBgm");
  const button = $("#musicToggle");
  if (!audio || !button) return;
  audio.src = resolvePhotoUrl(audioOptions.src);
  audio.loop = audioOptions.loop !== false;
  audio.volume = Math.min(1, Math.max(0, Number(audioOptions.volume ?? 0.35)));
  button.hidden = false;
  button.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      updateMusicButton();
      return;
    }
    try {
      await audio.play(); // 사용자 터치 이벤트에서만 재생
    } catch (_) {
      toast(t("musicError"));
    }
    updateMusicButton();
  });
  audio.addEventListener("playing", updateMusicButton);
  audio.addEventListener("pause", updateMusicButton);
  audio.addEventListener("ended", updateMusicButton);
  audio.addEventListener("error", () => {
    if (!audio.paused) audio.pause();
    updateMusicButton();
    toast(t("musicError"));
  });
  updateMusicButton();
}

function setLanguage(nextLang) {
  currentLang = nextLang === "ja" ? "ja" : "ko";
  try { localStorage.setItem("wedding-invitation-language", currentLang); } catch (_) { /* 저장 불가 환경 */ }
  renderStaticText();
  renderContent();
  renderCalendar();
  renderDirections();
  renderAccounts();
  refreshGalleryLabels();
  // 작성된 응답이 있다면 선택한 언어로 다시 만듭니다.
  if ($("#rsvpResult") && !$("#rsvpResult").hidden) $("#rsvpResultText").value = buildRsvpMessage();
  $("#toast").classList.remove("show");
  updateMusicButton();
}

if (config) {
  try {
    const queryLang = new URLSearchParams(window.location.search).get("lang");
    const storedLang = localStorage.getItem("wedding-invitation-language");
    currentLang = queryLang === "ja" || queryLang === "ko" ? queryLang : storedLang === "ja" ? "ja" : "ko";
  } catch (_) { currentLang = "ko"; }
  initGallery();
  initHeroPhoto();
  initRsvp();
  initShare();
  initBackgroundMusic();
  setLanguage(currentLang);
  $$(".language-button").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
} else {
  console.error("config.js 파일을 확인해 주세요.");
}
