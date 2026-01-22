# Fisherman 관리자 페이지

## ✅ PHP 버전 - 도톰홈에서 바로 실행 가능!

이제 **도톰홈 서버에서 직접 실행**됩니다! Node.js 없이 PHP로 작동하므로 별도의 서버 실행이 필요 없습니다.

### 🚀 배포 방법

FTP로 다음 파일들을 도톰홈 서버의 `/html/` 폴더에 업로드하세요:

```
html/
├── admin/              # 관리자 페이지
│   ├── index.html
│   ├── dashboard.html
│   └── dashboard.js
├── api/                # PHP API 백엔드
│   ├── config.php
│   ├── login.php
│   ├── logout.php
│   ├── check-auth.php
│   ├── upload-image.php
│   ├── work.php
│   ├── news.php
│   └── people.php
├── data/               # JSON 데이터 (자동 생성)
│   ├── work.json
│   ├── news.json
│   └── people.json
├── images/uploads/     # 이미지 업로드 폴더 (자동 생성)
├── js/                 # 기존 JavaScript 파일들
├── css/                # 기존 CSS 파일들
└── (기타 모든 파일)
```

### 📂 권한 설정

FTP로 업로드 후 다음 폴더의 권한을 **777**로 설정하세요:
- `/html/data/`
- `/html/images/uploads/`

### 🌐 접속 방법

```
http://fisherman.dothome.co.kr/admin
```

## 로그인 정보
- **아이디**: fisherman
- **비밀번호**: ns7076351!

## 기능

### ✅ 구현된 기능
1. **관리자 로그인/로그아웃**
   - 세션 기반 인증
   - 자동 로그인 상태 확인

2. **Work 관리**
   - 제목, 설명, 카테고리, 이미지 업로드
   - 등록된 항목 목록 보기
   - 항목 삭제

3. **News 관리**
   - 제목, 내용, 날짜, 이미지 업로드
   - 등록된 항목 목록 보기
   - 항목 삭제

4. **People 관리**
   - 이름, 직책, 소개, 프로필 이미지 업로드
   - 등록된 항목 목록 보기
   - 항목 삭제

5. **이미지 업로드**
   - 드래그 앤 드롭 지원
   - 미리보기 기능
   - 서버에 직접 저장

## 데이터 저장 구조

모든 데이터는 JSON 파일로 저장됩니다:
- `data/work.json` - Work 항목들
- `data/news.json` - News 항목들
- `data/people.json` - People 항목들

이미지는 다음 경로에 저장됩니다:
- `images/uploads/` - 업로드된 모든 이미지

## 로컬 테스트 (선택사항)

로컬에서 테스트하려면 PHP 내장 서버를 사용하세요:

```bash
php -S localhost:8000
```

그리고 `http://localhost:8000/admin`으로 접속

## 주의사항

1. **서버 권한**
   - `data/` 폴더: 쓰기 권한 필요 (777)
   - `images/uploads/` 폴더: 쓰기 권한 필요 (777)

2. **보안**
   - 관리자 비밀번호는 `/api/config.php`에서 변경 가능
   - 실제 운영 시 더 강력한 비밀번호로 변경 권장

3. **메인 페이지 연동**
   - 메인 페이지들이 `/data/` 폴더의 JSON 파일을 자동으로 읽어서 표시
   - 관리자 페이지에서 등록하면 즉시 메인 페이지에 반영됨!

## 기술 스택

- **백엔드**: PHP 7.0+
- **프론트엔드**: HTML, CSS, Vanilla JavaScript
- **데이터**: JSON 파일
- **인증**: PHP 세션
