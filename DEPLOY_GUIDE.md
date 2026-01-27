# 🚀 배포 가이드

## 📦 배포 파일 구조

### 1️⃣ 빌드하기

```bash
npm run build
```

빌드가 완료되면 `dist/` 폴더가 생성됩니다.

### 2️⃣ FTP 업로드 파일 목록

서버에 업로드해야 할 파일/폴더:

```
📁 서버 (예: /html/ 또는 /public_html/)
├── 📄 index.html           ← dist/index.html
├── 📁 assets/              ← dist/assets/ (전체)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── 📁 api/                 ← api/ (PHP 파일들)
│   ├── check-auth.php
│   ├── config.php
│   ├── login.php
│   ├── logout.php
│   ├── news.php
│   ├── people.php
│   ├── upload-image.php
│   └── work.php
├── 📁 data/                ← data/ (JSON 파일들)
│   ├── work.json
│   ├── news.json
│   └── people.json
└── 📁 images/              ← images/ (이미지 파일들)
    ├── fishermen.png
    ├── witness.png
    └── uploads/
```

## 🔧 배포 순서

### STEP 1: 빌드

```bash
npm run build
```

### STEP 2: FTP 업로드

**FTP 클라이언트 (FileZilla, WinSCP 등) 사용:**

1. **dist/ 폴더 내용** → 서버 루트로 업로드
   ```
   dist/index.html → /html/index.html
   dist/assets/    → /html/assets/
   ```

2. **api/ 폴더** → 서버 루트로 업로드
   ```
   api/ → /html/api/
   ```

3. **data/ 폴더** → 서버 루트로 업로드
   ```
   data/ → /html/data/
   ```

4. **images/ 폴더** → 서버 루트로 업로드
   ```
   images/ → /html/images/
   ```

### STEP 3: PHP 설정 확인

서버의 `api/config.php` 파일을 열어서 DB 설정 등을 확인/수정합니다.

## 🌐 실환경 URL 구조

배포 후 다음과 같이 접근 가능합니다:

```
https://yourdomain.com/              → 홈페이지
https://yourdomain.com/work/         → 사역 페이지
https://yourdomain.com/news/         → 소식 페이지
https://yourdomain.com/people/       → 청년부원 페이지
https://yourdomain.com/admin         → 관리자 로그인 ✅
https://yourdomain.com/admin/dashboard → 관리자 대시보드 ✅
```

## ⚙️ 서버 요구사항

### 필수:
- ✅ **PHP 7.4 이상** (PHP 8+ 권장)
- ✅ **Apache 또는 Nginx** 웹서버
- ✅ **session 지원** (기본적으로 활성화되어 있음)

### .htaccess 설정 (Apache)

서버 루트에 `.htaccess` 파일이 필요합니다:

```apache
# React Router를 위한 설정
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # API 요청은 그대로 통과
  RewriteRule ^api/ - [L]

  # 실제 파일이나 디렉토리가 아니면 index.html로
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🎯 관리자 페이지 사용

1. **로그인:**
   - URL: `https://yourdomain.com/admin`
   - 아이디/비밀번호 입력 후 로그인

2. **대시보드:**
   - 로그인 후 자동으로 `/admin/dashboard`로 이동
   - 사역, 소식, 부원 관리 가능

## 📝 중요 파일 권한

FTP 업로드 후 다음 권한 설정:

```bash
chmod 755 api/
chmod 644 api/*.php
chmod 755 data/
chmod 666 data/*.json      # 쓰기 권한 필요
chmod 755 images/
chmod 755 images/uploads/
chmod 777 images/uploads/  # 이미지 업로드를 위해 쓰기 권한
```

## 🔒 보안 설정

### 1. config.php 보안
`api/config.php`에서 민감한 정보(DB 비밀번호 등) 관리

### 2. 관리자 비밀번호 변경
현재 하드코딩된 비밀번호를 변경하려면:
- `api/config.php` 또는 `api/login.php` 수정 필요

### 3. session_start() 확인
모든 PHP 파일에서 session이 제대로 작동하는지 확인

## 🐛 문제 해결

### 관리자 로그인이 안 될 때:
1. `api/login.php` 파일 권한 확인 (644)
2. PHP 에러 로그 확인
3. 브라우저 콘솔에서 네트워크 탭 확인

### 페이지가 404 에러가 날 때:
1. `.htaccess` 파일이 있는지 확인
2. Apache `mod_rewrite`가 활성화되어 있는지 확인
3. Nginx라면 별도 설정 필요

### 데이터가 로드되지 않을 때:
1. `data/*.json` 파일이 있는지 확인
2. 파일 권한 확인 (읽기 가능)
3. 브라우저 콘솔에서 에러 확인

## 📊 업데이트 방법

콘텐츠 수정 시:

### 프론트엔드 수정 시:
```bash
npm run build
# dist/ 폴더만 다시 업로드
```

### 데이터만 수정 시:
```bash
# data/*.json 파일만 수정 후 업로드
# 또는 관리자 페이지에서 직접 수정
```

## ✅ 체크리스트

배포 전 확인사항:

- [ ] `npm run build` 정상 실행
- [ ] `dist/` 폴더 생성 확인
- [ ] FTP 서버 접속 확인
- [ ] PHP 버전 확인 (7.4+)
- [ ] `.htaccess` 파일 업로드
- [ ] `api/` 폴더 업로드
- [ ] `data/` 폴더 업로드
- [ ] `images/` 폴더 업로드
- [ ] 파일 권한 설정
- [ ] 관리자 로그인 테스트
- [ ] 모든 페이지 접근 테스트

---

🎉 **배포 완료!**

문제가 발생하면 서버의 PHP 에러 로그를 확인하세요.
