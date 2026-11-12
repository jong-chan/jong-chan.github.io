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
    mapAria: "지도 영역", mapPlaceholder: "지도를 넣거나 외부 지도 링크를 연결할 자리",
    mapLinksAria: "지도 앱에서 보기", transitTitle: "지하철 / 대중교통", parkingTitle: "주차 안내",
    accountsHeading: "마음 전하는 곳", accountsDescription: "함께 축하해 주시는 마음만으로도 큰 기쁨입니다.",
    photoDialogAria: "웨딩 사진 크게 보기", closePhoto: "사진 닫기", prevPhoto: "← 이전", nextPhoto: "다음 →",
    prevPhotoAria: "이전 사진", nextPhotoAria: "다음 사진",
    missingTime: "예식 시간 추후 안내", missingAddress: "예식장 상세 주소를 입력해 주세요.",
    missingMapAddress: "주소를 등록하면 네이버지도·카카오맵 버튼이 표시됩니다.",
    naverMap: "네이버지도", kakaoMap: "카카오맵",
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
    mapAria: "地図エリア", mapPlaceholder: "地図または外部地図リンクを追加する場所",
    mapLinksAria: "地図アプリで見る", transitTitle: "電車・公共交通機関", parkingTitle: "駐車場のご案内",
    accountsHeading: "お祝いのお気持ち", accountsDescription: "お祝いのお気持ちだけでも、私たちにとって大きな喜びです。",
    photoDialogAria: "ウェディング写真を拡大表示", closePhoto: "写真を閉じる", prevPhoto: "← 前へ", nextPhoto: "次へ →",
    prevPhotoAria: "前の写真", nextPhotoAria: "次の写真",
    missingTime: "挙式時間は後日ご案内します", missingAddress: "会場の住所をご入力ください。",
    missingMapAddress: "住所を登録すると、NAVERマップ・Kakaoマップへのリンクが表示されます。",
    naverMap: "NAVERマップ", kakaoMap: "Kakaoマップ",
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

function renderDirections() {
  const { venue, address } = config.wedding;
  const container = $("#mapLinks");
  container.replaceChildren();
  if (!address || !address.trim()) {
    container.append(create("p", "map-hint", t("missingMapAddress")));
    return;
  }
  // 검색 정확도를 위해 지도 검색어는 실제 한국어 주소를 유지합니다.
  const query = encodeURIComponent(`${venue} ${address}`);
  [
    { label: t("naverMap"), url: `https://map.naver.com/p/search/${query}` },
    { label: t("kakaoMap"), url: `https://map.kakao.com/link/search/${query}` },
  ].forEach(({ label, url }) => {
    const anchor = create("a", "outline-button", label);
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    container.append(anchor);
  });
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

function setLanguage(nextLang) {
  currentLang = nextLang === "ja" ? "ja" : "ko";
  try { localStorage.setItem("wedding-invitation-language", currentLang); } catch (_) { /* 저장 불가 환경 */ }
  renderStaticText();
  renderContent();
  renderCalendar();
  renderDirections();
  renderAccounts();
  refreshGalleryLabels();
  $("#toast").classList.remove("show");
}

if (config) {
  try {
    const queryLang = new URLSearchParams(window.location.search).get("lang");
    const storedLang = localStorage.getItem("wedding-invitation-language");
    currentLang = queryLang === "ja" || queryLang === "ko" ? queryLang : storedLang === "ja" ? "ja" : "ko";
  } catch (_) { currentLang = "ko"; }
  initGallery();
  initHeroPhoto();
  setLanguage(currentLang);
  $$(".language-button").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
} else {
  console.error("config.js 파일을 확인해 주세요.");
}
