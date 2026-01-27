# Fishermen React 프로젝트

내수동교회 청년부 웹사이트 - React 버전

## 🎯 프로젝트 구조

```
reactWF/
├── src/
│   ├── main.jsx              # React 진입점
│   ├── App.jsx               # 메인 앱 컴포넌트
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── Home.jsx          # 홈페이지
│   │   ├── Work.jsx          # 사역 페이지
│   │   ├── News.jsx          # 소식 페이지
│   │   ├── People.jsx        # 청년부원 페이지
│   │   └── Admin/            # 관리자 페이지
│   │       ├── Login.jsx     # 로그인
│   │       └── Dashboard.jsx # 대시보드
│   ├── components/           # 공통 컴포넌트
│   │   ├── Navbar.jsx        # 네비게이션
│   │   ├── Footer.jsx        # 푸터
│   │   └── Modal.jsx         # 모달
│   ├── context/              # Context API
│   │   └── GroupContext.jsx  # Witness/Fishermen 그룹 관리
│   └── styles/               # CSS 파일
│       └── main.css          # 통합 스타일
├── api/                      # PHP API (배포용)
├── data/                     # JSON 데이터
├── images/                   # 이미지 파일
├── old_html/                 # 기존 HTML 백업
├── index.html                # HTML 템플릿
├── vite.config.js            # Vite 설정
└── package.json              # 프로젝트 설정

```

## 🚀 시작하기

### 1. 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:5173 에서 확인

### 2. 프로덕션 빌드

```bash
npm run build
```

→ `dist/` 폴더에 빌드 파일 생성

### 3. 빌드 미리보기

```bash
npm run preview
```

## 📦 배포 방법 (FTP)

### 배포할 파일 목록:

1. **dist/** 폴더의 모든 내용 (빌드 결과)
2. **api/** 폴더 (PHP API 파일)
3. **data/** 폴더 (JSON 데이터)
4. **images/** 폴더 (이미지 파일)

### 배포 순서:

1. `npm run build` 실행
2. FTP 클라이언트로 서버 접속
3. 위 파일들을 서버 루트 디렉토리에 업로드

```
서버 구조:
/html/
├── index.html              (dist/index.html)
├── assets/                 (dist/assets/)
│   ├── index-[hash].js
│   └── index-[hash].css
├── api/                    (PHP 파일들)
├── data/                   (JSON 파일들)
└── images/                 (이미지 파일들)
```

## 🔑 주요 기능

### 1. Witness/Fishermen 그룹 토글
- URL 파라미터로 관리: `?group=witness` 또는 `?group=fishermen`
- Context API로 전역 상태 관리
- 그룹별 다른 콘텐츠, 스타일, 통계 표시

### 2. 페이지 라우팅
- `/` - 홈페이지
- `/work/` - 사역 활동
- `/news/` - 소식
- `/people/` - 청년부원
- `/admin` - 관리자 로그인
- `/admin/dashboard` - 관리자 대시보드

### 3. 데이터 관리
- JSON 파일 기반 (`/data/work.json`, `/data/news.json`)
- PHP API를 통한 CRUD 작업
- 관리자 페이지에서 직접 수정 가능

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **React Router 6** - 라우팅
- **Vite** - 빌드 도구
- **PHP** - 백엔드 API
- **JSON** - 데이터 저장

## 📝 다음 개발 사항

### 우선순위 높음:
1. Admin Dashboard 상세 기능 구현 (CRUD)
2. 이미지 업로드 기능 추가
3. PHP API 파일 정리 및 최적화

### 우선순위 중간:
4. People 페이지 더 상세히 구현
5. 페이지네이션 추가 (News, Work)
6. 로딩 상태 및 에러 처리 개선

### 우선순위 낮음:
7. SEO 최적화
8. 성능 최적화 (이미지 lazy loading 등)
9. 애니메이션 효과 추가

## 🔧 문제 해결

### 개발 서버가 시작되지 않을 때:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 빌드 오류가 발생할 때:
```bash
npm run build -- --debug
```

### API가 작동하지 않을 때:
- PHP 서버가 실행 중인지 확인
- `/api/` 폴더의 파일 권한 확인
- 브라우저 콘솔에서 에러 메시지 확인

## 📞 문의

문제가 발생하거나 추가 기능이 필요하면 연락주세요.

---

✅ **기존 레이아웃/기능 동일하게 유지**
✅ **URL 구조 동일 (/work/, /news/ 등)**
✅ **관리자 페이지 실환경에서 바로 접근 가능**
✅ **FTP로 간단히 배포**
