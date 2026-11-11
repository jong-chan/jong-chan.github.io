# 모바일 청첩장 기본 템플릿

심플한 **HTML / CSS / JavaScript** 기반 모바일 청첩장입니다. 별도 설치나 빌드 도구가 필요하지 않으며 GitHub Pages에 바로 배포할 수 있습니다. 참고 청첩장의 디자인을 복제하지 않고 **섹션 순서만** 참고해 만들었습니다.

## 섹션 순서

1. 메인 화면
2. 초대 문구
3. 신랑·신부 소개
4. 결혼식 날짜 + 달력
5. 웨딩 갤러리 (12칸)
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

사진을 아직 넣지 않으면 **PHOTO 01~12**의 빈 자리가 표시됩니다. 사진 등록 후 갤러리 이미지를 누르면 확대해서 볼 수 있습니다.

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
- 섹션별 배치: `styles.css`의 `.hero`, `.invitation`, `.couple`, `.schedule`, `.gallery`, `.directions`, `.accounts`
- 섹션의 마크업 구조: `index.html`

외부 라이브러리나 이미지 CDN 없이 만들어 유지보수가 쉽습니다.
