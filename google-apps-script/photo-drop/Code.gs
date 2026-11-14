const PHOTO_DROP = {
  testUntil: '2026-11-15T22:15:00+09:00', // 한국 시간: 이 시각까지 시험 업로드 허용
  opensAt: '2027-04-17T00:00:00+09:00',
  closesAt: '2027-04-24T00:00:00+09:00',
  maxBytes: 10 * 1024 * 1024,
  maxUploads: 1000,
};

// 처음 한 번 편집기에서 실행하고 Google Drive 권한을 승인하세요.
// 끝의 _ 는 웹 페이지에서 이 관리 함수를 호출하지 못하게 합니다.
function setupPhotoDrop_() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('PHOTO_FOLDER_ID')) return;
  const folder = DriveApp.createFolder('하객 웨딩 사진 2027-04-17');
  props.setProperty('PHOTO_FOLDER_ID', folder.getId());
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('하객 사진 업로드')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 이름이나 이메일을 받지 않고 사진만 저장합니다. 파일 목록/Drive 주소는 공개하지 않습니다.
function uploadPhoto(payload) {
  const now = Date.now();
  const testing = now < Date.parse(PHOTO_DROP.testUntil || '');
  if (!testing && (now < Date.parse(PHOTO_DROP.opensAt) || now >= Date.parse(PHOTO_DROP.closesAt))) {
    throw new Error('사진은 4월 17일부터 7일 동안 업로드할 수 있습니다.');
  }
  if (!payload || typeof payload.base64 !== 'string' ||
      payload.base64.length > Math.ceil(PHOTO_DROP.maxBytes / 3) * 4 ||
      !/^[A-Za-z0-9+/]+={0,2}$/.test(payload.base64)) {
    throw new Error('사진 파일을 확인해 주세요. 한 장당 최대 10MB입니다.');
  }
  const bytes = Utilities.base64Decode(payload.base64);
  if (!bytes.length || bytes.length > PHOTO_DROP.maxBytes) throw new Error('한 장당 최대 10MB까지 가능합니다.');
  const b = bytes.slice(0, 16).map(v => (v + 256) % 256);
  const ascii = (start, end) => String.fromCharCode.apply(null, b.slice(start, end));
  let extension, mime;
  if (b[0] === 255 && b[1] === 216 && b[2] === 255) {
    extension = 'jpg'; mime = 'image/jpeg';
  } else if ([137,80,78,71,13,10,26,10].every((v, i) => b[i] === v)) {
    extension = 'png'; mime = 'image/png';
  } else if (b.length >= 16 && ascii(4,8) === 'ftyp' &&
      ['heic','heix','hevc','hevx','mif1','msf1'].includes(ascii(8,12))) {
    extension = 'heic'; mime = 'image/heic';
  } else {
    throw new Error('JPG, PNG, HEIC 사진만 업로드할 수 있습니다.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error('잠시 후 다시 시도해 주세요.');
  try {
    const props = PropertiesService.getScriptProperties();
    const folderId = props.getProperty('PHOTO_FOLDER_ID');
    if (!folderId) throw new Error('사진 업로드를 준비 중입니다.');
    const count = Number(props.getProperty('PHOTO_UPLOAD_COUNT') || 0);
    if (count >= PHOTO_DROP.maxUploads) throw new Error('사진 접수가 마감되었습니다.');
    const name = Utilities.formatDate(new Date(now), 'Asia/Seoul', 'yyyyMMdd_HHmmss') +
      '_' + Utilities.getUuid() + '.' + extension;
    DriveApp.getFolderById(folderId).createFile(Utilities.newBlob(bytes, mime, name));
    props.setProperty('PHOTO_UPLOAD_COUNT', String(count + 1));
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}
