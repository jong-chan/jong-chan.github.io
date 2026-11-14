# 모바일 청첩장 — 꽃잎 애니메이션 업데이트

> 이전 버전의 기록입니다. 현재 메인은 이름·사진 위 문구·꽃잎 효과를 제거하고, 큰 날짜와 아치형 사진·하단 파도 장식을 사용합니다. 파도는 `styles.css`의 `.hero-wave`에서 조절하며, 동작 줄이기 설정에서는 정지합니다.

- 사진: `images/LSH_1375.jpg` — GitHub에 이미 업로드된 **원본 JPG 그대로** 사용합니다. GIF나 재인코딩한 사진은 필요하지 않습니다.
- 메인 사진 위에 `OUR WEDDING DAY` 문구와 흩날리는 꽃잎 HTML/SVG/CSS 애니메이션을 추가했습니다.
- 인물 및 배경을 포함한 사진 자체는 애니메이션되지 않습니다.
- 한국어/일본어 및 기존 섹션은 유지합니다.

## GitHub 적용

1. ZIP을 압축 해제합니다.
2. `jong-chan.github.io` 저장소의 **`wedding-invitation/` 폴더에** `index.html`, `styles.css`, `config.js`, `app.js` 4개 파일을 업로드해서 덮어씁니다.
3. `Commit changes`를 누르고 Pages 배포가 끝나면 `https://jong-chan.github.io/wedding-invitation/`을 확인하세요.
4. GitHub의 `wedding-invitation/images/LSH_1375.jpg` 파일은 그대로 두세요.

## 간단한 조정

`config.js` 파일의 `heroDecoration`에서 다음 값을 바꿀 수 있습니다.

- `title`: 상단 글씨. 예: `"OUR WEDDING DAY"` 또는 `""` (숨기기)
- `petals`: `true` (켜기) 또는 `false` (끄기)
- `petalCount`: 꽃잎 개수. 기본 `18`, 최대 `32`.

가장 기본적인 색상·속도 수정은 `styles.css`의 `.flower-petal`, `@keyframes petalDrift`에서 할 수 있습니다.

사용자가 기기에서 `동작 줄이기(Reduce Motion)`를 켠 경우 꽃잎 움직임은 표시하지 않습니다.
