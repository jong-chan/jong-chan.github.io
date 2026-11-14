# 모바일 청첩장 기본 템플릿

심플한 **HTML / CSS / JavaScript** 기반 모바일 청첩장입니다. 별도 설치나 빌드 도구가 필요하지 않으며 GitHub Pages에 바로 배포할 수 있습니다. 참고 청첩장의 디자인을 복제하지 않고 **섹션 순서만** 참고해 만들었습니다.

## 섹션 순서

1. 메인 화면
2. 초대 문구
3. 신랑·신부 소개
4. 결혼식 날짜 + 달력
5. 웨딩 갤러리 (좌우 슬라이드, 최대 12장)
6. 오시는 길
7. 마음 전하는 곳 (계좌번호 복사 기능 포함)

## 파일 설명

| 파일 | 역할 |
| --- | --- |
| `index.html` | 7개 섹션의 HTML 구조 |
| `styles.css` | 색상·글꼴·배치 등 디자인 |
| `config.js` | 이름·날짜·사진 경로·계좌 등 내용 |
| `app.js` | 달력·사진 확대·계좌 복사 동작 |
| `.nojekyll` | GitHub Pages가 정적 파일을 그대로 제공하게 하는 빈 파일 |

## 1. 내용 수정하기

`config.js` 파일을 열고 다음 항목을 변경합니다.

- `groom.name`, `bride.name`: 이름
- `groom.intro`, `bride.intro`: 두 사람 소개
- `wedding.date`: 날짜 (`2027-04-17` 형식)
- `wedding.time`: 예식 시간 (현재 비어 있음)
- `wedding.venue`, `wedding.address`: 식장 및 상세 주소
- `wedding.transit`, `wedding.parking`: 교통·주차 안내
- `invitation`: 초대 문구 각 줄
- `accounts`: 은행·예금주·계좌번호

현재 날짜 **2027년 4월 17일**, 식장 이름 **라플레이스**는 기본값으로 반영했습니다. 시간·상세 주소·이름·계좌번호는 임의로 만들지 않고 빈칸 또는 예시 문구로 두었습니다.

## 2. 웨딩 사진 넣기

1. 프로젝트 폴더 안에 `images` 폴더를 만듭니다.
2. `images/main.jpg`, `images/01.jpg` ... `images/12.jpg`와 같이 사진을 추가합니다. 파일명은 자유롭습니다.
3. `config.js`의 아래 항목을 수정합니다.

```js
mainPhoto: "images/main.jpg",
gallery: [
  "images/01.jpg", "images/02.jpg", "images/03.jpg", "images/04.jpg",
  "images/05.jpg", "images/06.jpg", "images/07.jpg", "images/08.jpg",
  "images/09.jpg", "images/10.jpg", "images/11.jpg", "images/12.jpg",
],
```

갤러리는 등록된 사진을 한 장씩 크게 표시합니다. 모바일에서는 좌우 스와이프, PC에서는 이전·다음 버튼으로 넘길 수 있으며, 아래에 현재 사진 순서가 표시됩니다. 갤러리에 초점을 둔 상태에서 좌우 방향키와 Home/End 키로도 이동할 수 있습니다. 빈 경로나 불러오지 못한 사진은 제외하고, 표시할 사진이 없으면 안내 문구를 보여줍니다. 사진을 누르면 확대해서 볼 수 있습니다.

## 3. GitHub Pages에 게시하기

1. GitHub에서 새 **Public** 저장소를 만듭니다. 예: `wedding-invitation`
2. 이 폴더의 파일 전체를 **저장소 루트(최상위)** 에 업로드하고 `Commit changes`합니다. (`index.html`이 최상위에 있어야 합니다.)
3. 저장소 **Settings → Pages**로 이동합니다.
4. **Build and deployment → Source**는 **Deploy from a branch**를 선택합니다.
5. **Branch: main / (root)**로 설정하고 **Save**합니다.
6. 게시되면 대개 다음 URL에서 열립니다.

   `https://본인아이디.github.io/wedding-invitation/`

GitHub Pages 배포 상태와 게시 주소는 저장소의 **Settings → Pages**에서 확인하세요. 저장소 이름에 따라 URL은 달라집니다.

> **주의:** 공개 GitHub 저장소에 업로드한 사진, 이름, 계좌번호 등은 누구나 볼 수 있습니다. 공개 전에 정보 노출 범위를 반드시 확인하세요.

## 4. 디자인 바꾸기

- 전체 색상 / 글꼴 / 폭: `styles.css` 맨 위의 `:root` 변수
- 섹션별 배치: `styles.css`의 `.hero`, `.invitation`(초대 문구·가족 소개), `.schedule`, `.gallery`, `.directions`, `.accounts`
- 섹션의 마크업 구조: `index.html`

외부 라이브러리나 이미지 CDN 없이 만들어 유지보수가 쉽습니다.

## 하객 포토 드롭

참석 여부 위에 하객 사진 공유 안내가 표시됩니다. `config.js`의 `photoDrop.uploadUrl`에 실제 사진 업로드 페이지의 HTTPS 주소를 넣어 연결합니다. 사진 저장 서비스 자체는 이 정적 사이트에서 제공하지 않습니다.

청첩장에는 사진 선택란 없이 안내와 이동 버튼만 표시합니다. 이름 없이 사진만 받는 Apps Script 소스 및 배포 방법은 [`google-apps-script/photo-drop`](../google-apps-script/photo-drop/README.md)에 있습니다.

한국·일본 시간 기준 예식 당일 0시부터 7일간 링크가 활성화됩니다. 그 전에는 오픈 예정일, 그 후에는 마감 안내를 표시합니다. 주소가 비어 있으면 접수 기간에도 준비 중 상태를 유지합니다.

## 지도와 언어 전환

- 지도 버튼은 한국어·일본어 모두 카카오맵 / 네이버지도 / 구글지도 순서입니다.
- `wedding.naverMapUrl`은 예식장의 네이버지도 공유 링크입니다.
- 일본어 화면은 예식장 이름과 도로명주소로 검색한 Google 지도를 iframe으로 표시합니다. `hl=ja`로 일본어를 요청하며 별도 Google API 키를 사용하지 않습니다. 실제 검색 결과와 위치는 게시 후 확인하세요.
- 한국어 화면은 Kakao Maps JavaScript API를 사용합니다. `config.js`의 `maps.kakaoJavascriptKey`에 카카오 앱의 **공개 JavaScript 키**를 입력하세요. REST API 키·Admin 키·Client Secret은 입력하지 않습니다.
- 카카오 개발자 콘솔의 카카오맵 사용 설정을 켜고, 웹 도메인에 `https://jong-chan.github.io`를 등록하세요. 로컬에서 실제 SDK를 검증하려면 사용 중인 로컬 도메인도 등록해야 합니다.
- `maps.streetAddress`는 층수·건물명을 제외한 도로명주소입니다. Kakao Geocoder가 반환한 좌표에 예식장 마커를 표시합니다.
- 키가 없거나 지도 로딩이 실패하면 안내 문구와 외부 지도 버튼을 제공합니다. 실제 지도 표시를 완료하려면 JavaScript 키와 등록 도메인에서 검증해야 합니다.
- 언어를 여러 번 전환해도 이미 만든 카카오 지도를 재사용하며, 뒤늦게 도착한 주소 검색 결과가 일본어 구글 지도를 덮어쓰지 않습니다.

## 웹용 사진 압축

- 사진의 픽셀 크기와 구도를 유지하고, JPEG 품질 97·프로그레시브 저장으로 용량을 줄였습니다.
- 메인 PNG는 같은 픽셀 크기의 `images/LSH_0001.jpg`로 변환했습니다.
- JPG의 ICC 색상 프로파일은 유지했습니다.
- 업로드 원본은 Git 커밋 `9339ce9`의 `wedding-invitation/images/`에 보관돼 있습니다. 추가 압축이 필요하면 이 원본에서 다시 생성하세요.
