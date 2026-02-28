# HerdVibe PWA

홈 화면에 추가하면 앱처럼 사용할 수 있는 PWA(Progressive Web App) 셸입니다.

## 설치 방법

### 1단계: GitHub 레포 생성 & 배포

1. GitHub에 `herdvibe-pwa` 레포를 새로 만듭니다
2. 이 폴더의 모든 파일을 푸시합니다
3. Settings → Pages → Source를 `main` 브랜치로 설정
4. 배포 URL: `https://kittycapital.github.io/herdvibe-pwa/`

### 2단계: 아임웹 Header Code에 아래 코드 삽입

아임웹 관리자 → 환경설정 → SEO(검색엔진최적화) → 공통 코드 삽입 → Header Code

```html
<!-- HerdVibe PWA 안내 배너 -->
<script>
(function(){
  // 이미 앱으로 열린 경우 무시
  if(window.matchMedia('(display-mode: standalone)').matches) return;
  // 모바일에서만 표시
  if(!/Mobi|Android|iPhone|iPad/.test(navigator.userAgent)) return;
  // 24시간 내 닫은 경우 무시
  var d = localStorage.getItem('hv-pwa-dismiss');
  if(d && Date.now() - parseInt(d) < 86400000) return;

  window.addEventListener('load', function(){
    var bar = document.createElement('div');
    bar.innerHTML = '<div style="display:flex;align-items:center;gap:10px;max-width:600px;margin:0 auto"><div style="font-size:18px">📊</div><div style="flex:1"><strong style="color:#fff;font-size:13px">HerdVibe 앱으로 열기</strong><br><span style="color:#888;font-size:11px">홈 화면에 추가하면 앱처럼 사용 가능</span></div><a href="https://kittycapital.github.io/herdvibe-pwa/" style="background:#22d3ee;color:#000;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;white-space:nowrap">앱 열기</a><button onclick="this.parentNode.parentNode.remove();localStorage.setItem(\'hv-pwa-dismiss\',Date.now())" style="background:none;border:none;color:#555;font-size:18px;cursor:pointer">&times;</button></div>';
    bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:999999;background:#111;border-top:1px solid #222;padding:12px 16px;font-family:sans-serif';
    document.body.appendChild(bar);
  });
})();
</script>
```

### 3단계: 아이콘 교체

`icons/` 폴더의 icon-192.png, icon-512.png를 실제 HerdVibe 로고로 교체하세요.
- icon-192.png: 192x192px
- icon-512.png: 512x512px
- 배경은 검정(#000), 투명 배경 가능

## 파일 구조

```
herdvibe-pwa/
├── index.html       ← PWA 셸 (herdvibe.com을 iframe으로 로드)
├── manifest.json    ← 앱 이름, 아이콘, 테마 설정
├── sw.js            ← 서비스 워커 (캐싱)
├── icons/
│   ├── icon-192.png ← 홈 화면 아이콘
│   └── icon-512.png ← 스플래시 화면 아이콘
└── README.md
```

## 사용자 경험

1. 사용자가 모바일로 herdvibe.com 접속
2. 하단에 "앱으로 열기" 배너 표시
3. 배너 클릭 → PWA 페이지로 이동
4. 브라우저가 "홈 화면에 추가" 프롬프트 표시 (Android)
5. 설치 후 앱처럼 실행 (주소창 없음, 독립 앱 형태)

iOS의 경우 Safari에서 공유 → "홈 화면에 추가"를 수동으로 해야 합니다.
