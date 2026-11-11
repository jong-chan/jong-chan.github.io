"use strict";

const config = window.WEDDING_CONFIG;
// GitHub Pages 사용자 사이트의 하위 경로에서 사진을 불러옵니다.
// config.js에는 "images/파일명.jpg" 형식으로 입력하면 됩니다.
const WEDDING_PAGE_BASE = new URL("/wedding-invitation/", window.location.origin);
const resolvePhotoUrl = (path) => new URL(path, WEDDING_PAGE_BASE).href;
const $ = (selector) => document.querySelector(selector);
const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const put = (selector, value) => { $(selector).textContent = value ?? ""; };

function weddingDateParts(isoDate) {
  const [year, month, day] = (isoDate || "2027-04-17").split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return { year, month, day, date };
}

function initContent() {
  const { groom, bride, wedding, invitation } = config;
  const { date } = weddingDateParts(wedding.date);
  const dateKorean = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric", month: "long", day: "numeric", weekday: "long"
  }).format(date);
  const dateHero = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]}`;

  put("#heroTitle", "");
  $("#heroTitle").append(
    document.createTextNode(`${groom.name} `),
    create("span", "amp", "&"),
    document.createTextNode(` ${bride.name}`)
  );
  put("#heroDate", dateHero);
  put("#heroVenue", wedding.venue);
  put("#invitationText", invitation.join("\n"));
  put("#invitationSignature", `${groom.name} · ${bride.name} 올림`);
  put("#groomName", groom.name);
  put("#groomIntro", groom.intro);
  put("#brideName", bride.name);
  put("#brideIntro", bride.intro);
  put("#scheduleDate", dateKorean);
  put("#scheduleDetail", [wedding.time || "예식 시간 추후 안내", wedding.venue].join("  ·  "));
  put("#venueName", wedding.venue);
  put("#venueAddress", wedding.address || "예식장 상세 주소를 입력해 주세요.");
  put("#transitInfo", wedding.transit);
  put("#parkingInfo", wedding.parking);
  put("#footerNames", `${groom.name} & ${bride.name}`);
  document.title = `${groom.name} ♥ ${bride.name} | 모바일 청첩장`;

  if (config.mainPhoto) {
    const photo = $("#heroPhoto");
    const img = create("img", "hero-image");
    img.src = resolvePhotoUrl(config.mainPhoto);
    img.alt = `${groom.name}과 ${bride.name}의 메인 웨딩 사진`;
    img.style.display = "none";
    photo.append(img); // DOM에 넣어 비동기 이미지 로딩을 안정적으로 유지합니다.
    img.addEventListener("load", () => {
      img.style.display = "";
      photo.replaceChildren(img);
    }, { once: true });
    img.addEventListener("error", () => img.remove(), { once: true });
  }
}

function initCalendar() {
  const { year, month, day, date } = weddingDateParts(config.wedding.date);
  put("#calendarMonth", `${year}년 ${month}월`);
  const calendar = $("#calendarDays");
  const startDay = new Date(year, month - 1, 1).getDay();
  const lastDay = new Date(year, month, 0).getDate();

  for (let i = 0; i < startDay; i++) {
    const empty = create("span", "calendar-blank");
    empty.setAttribute("aria-hidden", "true");
    calendar.append(empty);
  }
  for (let n = 1; n <= lastDay; n++) {
    const cell = create("span", n === day ? "calendar-day is-wedding" : "calendar-day", String(n));
    if (n === day) {
      cell.setAttribute("aria-label", `${month}월 ${day}일, 결혼식 날`);
      cell.setAttribute("aria-current", "date");
    }
    calendar.append(cell);
  }

  // 한국 시간 기준으로 오늘 날짜와 결혼식 날짜를 비교합니다.
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const getPart = (type) => Number(dateParts.find((p) => p.type === type).value);
  const y = getPart("year"), m = getPart("month"), d = getPart("day");
  const days = Math.round((Date.UTC(year, month - 1, day) - Date.UTC(y, m - 1, d)) / 86400000);
  put("#dday", days > 0 ? `결혼식까지 D-${days}` : days === 0 ? "오늘, 저희 결혼합니다!" : "함께해 주셔서 감사합니다.");
}

const validGallery = [];
let selectedPhoto = 0;
let previousFocus = null;

function openGallery(index) {
  selectedPhoto = index;
  previousFocus = document.activeElement;
  showSelectedPhoto();
  $("#photoDialog").showModal();
  document.body.classList.add("dialog-open");
}

function showSelectedPhoto() {
  const image = validGallery[selectedPhoto];
  $("#dialogImage").src = image.src;
  $("#dialogImage").alt = `웨딩 사진 ${image.number}`;
  put("#photoCount", `${selectedPhoto + 1} / ${validGallery.length}`);
  $("#prevPhoto").disabled = validGallery.length < 2;
  $("#nextPhoto").disabled = validGallery.length < 2;
}

function closeGallery() {
  $("#photoDialog").close();
}

function initGallery() {
  const grid = $("#galleryGrid");
  const paths = Array.isArray(config.gallery) ? config.gallery.slice(0, 12) : [];
  while (paths.length < 12) paths.push("");

  paths.forEach((src, i) => {
    const no = String(i + 1).padStart(2, "0");
    const tile = create("div", "gallery-tile photo-placeholder");
    const label = create("span", "gallery-placeholder-label", `PHOTO ${no}`);
    const caption = create("span", "gallery-placeholder-caption", "사진을 추가해 주세요");
    tile.append(label, caption);
    grid.append(tile);

    if (!src) return;
    const photoUrl = resolvePhotoUrl(src);
    const button = create("button", "gallery-button");
    button.type = "button";
    button.setAttribute("aria-label", `웨딩 사진 ${i + 1} 크게 보기`);
    button.style.opacity = "0";
    button.style.position = "absolute";
    button.style.inset = "0";
    button.style.pointerEvents = "none";
    const img = create("img", "gallery-image");
    img.alt = `웨딩 갤러리 사진 ${i + 1}`;
    img.loading = "lazy";
    button.append(img);
    tile.append(button); // lazy 이미지는 DOM에 있어야 정상 로드됩니다.
    img.addEventListener("load", () => {
      validGallery.push({ src: photoUrl, number: i + 1 });
      validGallery.sort((a, b) => a.number - b.number);
      button.removeAttribute("style");
      tile.replaceChildren(button);
      tile.classList.remove("photo-placeholder");
    }, { once: true });
    img.addEventListener("error", () => button.remove(), { once: true });
    button.addEventListener("click", () => openGallery(validGallery.findIndex((photo) => photo.number === i + 1)));
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
    if (previousFocus) previousFocus.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (!$("#photoDialog").open) return;
    if (event.key === "ArrowLeft" && validGallery.length > 1) $("#prevPhoto").click();
    if (event.key === "ArrowRight" && validGallery.length > 1) $("#nextPhoto").click();
  });
}

function initDirections() {
  const { venue, address } = config.wedding;
  const container = $("#mapLinks");
  // 주소가 입력된 경우에만 실제 지도 검색 링크를 보여줍니다.
  if (!address.trim()) {
    container.append(create("p", "map-hint", "주소를 등록하면 네이버지도·카카오맵 버튼이 표시됩니다."));
    return;
  }
  const query = encodeURIComponent(`${venue} ${address}`);
  const links = [
    { label: "네이버지도", url: `https://map.naver.com/p/search/${query}` },
    { label: "카카오맵", url: `https://map.kakao.com/link/search/${query}` },
  ];
  links.forEach(({ label, url }) => {
    const a = create("a", "outline-button", label);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    container.append(a);
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
    toast("계좌번호를 복사했습니다.");
  } catch (_) {
    toast("복사에 실패했습니다. 계좌번호를 직접 선택해 주세요.");
  }
}

function initAccounts() {
  const container = $("#accountGroups");
  (config.accounts || []).forEach(({ label, bank, holder, number }) => {
    const details = create("details", "account-details");
    const summary = create("summary", "account-summary", label);
    const content = create("div", "account-content");
    if (bank && holder && number) {
      content.append(create("p", "bank-name", `${bank} · ${holder}`));
      content.append(create("p", "account-number", number));
      const copy = create("button", "outline-button copy-button", "계좌번호 복사");
      copy.type = "button";
      copy.addEventListener("click", () => copyText(number));
      content.append(copy);
    } else {
      content.append(create("p", "account-empty", "계좌 정보를 입력하면 이곳에 표시됩니다."));
    }
    details.append(summary, content);
    container.append(details);
  });
}

if (config) {
  initContent();
  initCalendar();
  initGallery();
  initDirections();
  initAccounts();
} else {
  console.error("config.js를 확인해 주세요.");
}
