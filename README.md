# 이재익 이력서 사이트

React와 Next.js로 구축된 모던한 개인 이력서 웹사이트입니다. 깔끔한 타이포그래피와 모듈화된 컴포넌트 구조로 설계되었습니다.

## ✨ 주요 기능

- 📝 **모듈화된 컴포넌트**: 재사용 가능한 컴포넌트로 구성된 깔끔한 구조
- 📄 **PDF Export**: 웹사이트를 A4 크기의 PDF로 다운로드 가능
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 모두 최적화된 경험
- 🎨 **일관된 디자인**: 체계적인 타이포그래피 위계와 spacing 시스템
- 🚀 **GitHub Pages 호스팅**: 정적 사이트 생성을 통한 빠른 로딩
- 🔄 **Notion API 연동**: Notion 데이터베이스와 실시간 연동으로 동적 이력서 관리

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Fonts**: Inter (주요 폰트), JetBrains Mono (코드/기술 스택)
- **PDF Generation**: html2canvas, jsPDF
- **API Integration**: Notion API (@notionhq/client)
- **Deployment**: GitHub Pages (Static Export)

## 📁 프로젝트 구조

```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # 글로벌 스타일 및 디자인 시스템
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 이력서 페이지 (Notion API 연동)
│   └── api/                # API 라우트
│       └── resume/         # 이력서 데이터 API
├── components/              # React 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── Page.tsx        # A4 페이지 래퍼
│   │   └── ResumeLayout.tsx # 이력서 전체 레이아웃
│   ├── sections/           # 이력서 섹션별 컴포넌트
│   │   ├── ContactInfo.tsx # 연락처 정보 섹션
│   │   ├── ExperienceItem.tsx # 경험/프로젝트 아이템
│   │   ├── SkillSection.tsx # 기술 스택 섹션
│   │   └── ValueSection.tsx # 가치관/핵심역량 섹션
│   └── ui/                 # 재사용 가능한 UI 컴포넌트
│       ├── PDFExport.tsx   # PDF 다운로드 버튼
│       └── TechChips.tsx   # 기술 스택 칩
├── lib/                    # 유틸리티 함수
│   ├── notion.ts          # Notion API 클라이언트 및 데이터 fetching
│   └── pdf.ts             # PDF 생성 유틸리티
└── types/                 # TypeScript 타입 정의
    └── index.ts           # 공통 타입 정의
```

## 🎨 디자인 시스템

### 타이포그래피 위계
- **Hero** (40px, 700): 메인 제목
- **Section Title** (28px, 700): 섹션 제목  
- **Subsection Title** (22px, 600): 서브섹션 제목
- **Item Title** (20px, 700): 아이템 제목
- **Item Subtitle** (18px, 600): 아이템 서브제목
- **Body** (16px, 400): 본문 텍스트
- **Meta** (14px, 400): 메타 정보

### Spacing 시스템
- `--space-xs`: 8px
- `--space-sm`: 16px  
- `--space-md`: 24px
- `--space-lg`: 32px
- `--space-xl`: 48px
- `--space-2xl`: 64px
- `--space-3xl`: 96px

## 🚀 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone https://github.com/yourusername/jaeiklee-resume.git
cd jaeiklee-resume
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

### 3. 빌드 및 배포

```bash
# 정적 사이트 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

## 🔧 Notion API 연동 설정

### 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. Integration 이름 설정 (예: "Resume API")
3. 생성된 Internal Integration Token 복사

### 2. Notion 데이터베이스 생성

다음 데이터베이스들을 Notion에서 생성하고 Integration에 연결:

#### Personal Info 데이터베이스
- **Name** (Title)
- **Title** (Rich Text)
- **Email** (Email)
- **Phone** (Phone Number)
- **Location** (Rich Text)
- **GitHub** (URL)
- **LinkedIn** (URL)
- **Website** (URL)

#### Skills 데이터베이스
- **Name** (Title)
- **Category** (Select: 원하는 카테고리 자유롭게 설정, 예: Frontend, Backend, Database, DevOps, Tools, Mobile, AI/ML 등)
- **Level** (Rich Text: 자유롭게 설명 입력, 예: "3년 경험", "고급 수준", "프로젝트 5건 완료", "인증서 보유" 등)

#### Core Competencies 데이터베이스
- **Title** (Title)
- **Description** (Rich Text)
- **Technologies** (Multi-select)
- **Examples** (Rich Text)

#### Experiences 데이터베이스
- **Company** (Title)
- **Position** (Rich Text)
- **Period** (Rich Text)
- **Description** (Rich Text)
- **Achievements** (Rich Text)
- **Technologies** (Multi-select)

#### Projects 데이터베이스
- **Name** (Title)
- **Description** (Rich Text)
- **Period** (Rich Text)
- **Technologies** (Multi-select)
- **Features** (Rich Text)
- **GitHub** (URL)
- **Demo** (URL)

#### Values 데이터베이스
- **Title** (Title)
- **Description** (Rich Text)

#### Tools 데이터베이스
- **Name** (Title)
- **Category** (Select)
- **Description** (Rich Text)

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경변수들을 설정:

```env
# Notion API 설정
NOTION_TOKEN=your_notion_integration_token_here

# Notion Database IDs (각 데이터베이스 URL에서 32자리 ID 추출)
NOTION_PERSONAL_INFO_DB_ID=your_personal_info_database_id_here
NOTION_SKILLS_DB_ID=your_skills_database_id_here
NOTION_CORE_COMPETENCIES_DB_ID=your_core_competencies_database_id_here
NOTION_EXPERIENCES_DB_ID=your_experiences_database_id_here
NOTION_PROJECTS_DB_ID=your_projects_database_id_here
NOTION_VALUES_DB_ID=your_values_database_id_here
NOTION_TOOLS_DB_ID=your_tools_database_id_here
```

### 4. 사용 방법

- **이력서 페이지**: `http://localhost:3000` (Notion API 연동)

## 📋 개발 로드맵

- [x] 모던한 이력서 디자인 구현
- [x] 컴포넌트 모듈화 완료
- [x] 타이포그래피 시스템 구축
- [x] PDF 다운로드 기능
- [x] GitHub Pages 배포 설정
- [x] Notion API 연동
- [ ] 다국어 지원 (한국어/영어)
- [ ] 다크모드 지원
- [ ] 애니메이션 효과 추가
- [ ] Notion 데이터 실시간 동기화
- [ ] 이력서 버전 관리 시스템

## 🔗 배포

GitHub Actions를 통해 main 브랜치에 push하면 자동으로 GitHub Pages에 배포됩니다.

## 📄 라이선스

MIT License