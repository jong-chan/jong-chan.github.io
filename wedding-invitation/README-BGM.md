# 청첩장 배경음악 추가 (한국어/일본어)

이 버전은 이전 통합 소스의 메인 사진(LHS가 아닌 `LSH_1375.jpg`), 꽃잎 18개 효과,
참석 여부, 카카오톡/LINE 및 링크 복사 기능을 그대로 유지합니다.

## 음악 등록 절차
1. 본인이 사용 권리를 가진 MP3 파일을 `wedding-bgm.mp3`로 준비합니다.
2. GitHub의 `jong-chan.github.io` 저장소 안 `wedding-invitation/audio/wedding-bgm.mp3`에 업로드합니다.
3. `wedding-invitation/config.js`에서 `music.enabled`를 `false`에서 `true`로 변경합니다.
4. `index.html`, `styles.css`, `app.js`, `config.js` 수정 파일을 `wedding-invitation/` 폴더에 덮어씁니다.

## 동작
- 하단 오른쪽에 BGM OFF 버튼이 나타납니다.
- 손님이 누르면 음악이 재생되고 BGM ON 상태로 바뀝니다. 다시 누르면 일시정지합니다.
- 청첩장 페이지를 스크롤하는 동안 음악은 이어집니다.
- 한국어/일본어에서 버튼의 접근성 안내 문구도 바뀝니다.
- 모바일 브라우저는 소리 있는 자동재생을 차단할 수 있어, 처음부터 자동으로 재생하지 않습니다.
- MP3 등록 전에는 버튼을 표시하지 않습니다.
- 음원 파일은 제공하지 않습니다. 저작권이 허용된 음원만 사용하세요.

## GitHub Pages
배포 설정은 기존대로 `main / (root)`입니다.
청첩장 주소는 https://jong-chan.github.io/wedding-invitation/ 입니다.
