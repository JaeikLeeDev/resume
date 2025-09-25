# 이재익 이력서 사이트

React와 Next.js로 구축된 모던한 개인 이력서 웹사이트입니다. 깔끔한 타이포그래피와 모듈화된 컴포넌트 구조로 설계되었으며, Notion API를 통해 동적으로 관리됩니다.

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
│   │   ├── CoreCompetencySection.tsx # 핵심 역량 섹션
│   │   ├── AchievementSection.tsx # 성과 섹션 (소제목별)
│   │   └── ValueSection.tsx # 가치관 섹션
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
- **Name** (Multi-select): 각 기술을 개별 옵션으로 추가 (예: React, TypeScript, Python, Docker 등)
- **Category** (Select): 카테고리 설정 (예: Frontend, Backend, Database, DevOps, Tools, Mobile, AI/ML 등)

#### Core Competencies 데이터베이스
- **Title** (Title): 역량 제목
- **Description** (Rich Text): 역량 설명
- **Skills** (Multi-select): 관련 기술 스택
- **Examples** (Rich Text): 세미콜론(;)으로 구분된 예시들

#### Experiences 데이터베이스
- **Company** (Title): 회사명
- **Position** (Rich Text): 직책
- **Period** (Rich Text): 근무 기간
- **Description** (Rich Text): 업무 설명

#### Achievement Sections 데이터베이스 (새로 추가)
- **Name** (Title): 소제목 (예: "SI 개발", "펌웨어 및 임베디드 SW 개발")
- **Achievements** (Rich Text): 세미콜론(;)으로 구분된 성과 목록
- **Skills** (Multi-select): 해당 섹션에서 사용한 기술 스택

#### Projects 데이터베이스
- **Name** (Title): 프로젝트명
- **Description** (Rich Text): 프로젝트 설명
- **Period** (Rich Text): 개발 기간
- **Skills** (Multi-select): 사용한 기술 스택
- **Features** (Rich Text): 세미콜론(;)으로 구분된 주요 기능들
- **GitHub** (URL): GitHub 저장소 링크
- **Website** (URL): 웹사이트 링크
- **iOS** (URL): iOS 앱스토어 링크
- **Android** (URL): Android 플레이스토어 링크
- **Contribution** (Rich Text): 기여도 정보

#### Portfolio 데이터베이스 (Projects와 동일한 구조)
- **Name** (Title): 포트폴리오명
- **Description** (Rich Text): 포트폴리오 설명
- **Period** (Rich Text): 개발 기간
- **Skills** (Multi-select): 사용한 기술 스택
- **Features** (Rich Text): 세미콜론(;)으로 구분된 주요 기능들
- **GitHub** (URL): GitHub 저장소 링크
- **Website** (URL): 웹사이트 링크
- **iOS** (URL): iOS 앱스토어 링크
- **Android** (URL): Android 플레이스토어 링크
- **Contribution** (Rich Text): 기여도 정보

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
NOTION_ACHIEVEMENT_SECTIONS_DB_ID=your_achievement_sections_database_id_here
NOTION_PROJECTS_DB_ID=your_projects_database_id_here
NOTION_PORTFOLIO_DB_ID=your_portfolio_database_id_here
NOTION_VALUES_DB_ID=your_values_database_id_here
NOTION_TOOLS_DB_ID=your_tools_database_id_here
```

### 4. 데이터 입력 방법 및 파싱 규칙

#### 📝 텍스트 구분자 규칙
이 템플릿에서는 **세미콜론(;)**을 구분자로 사용합니다:

- **Rich Text 필드**: 세미콜론(;)으로 구분하여 여러 항목 입력
- **Multi-select 필드**: 각 항목을 개별 옵션으로 선택

#### 📋 데이터베이스별 입력 예시

**Skills 데이터베이스:**
```
Name (Multi-select): [React, TypeScript, Next.js, Tailwind CSS]
Category (Select): Frontend
```

**Core Competencies - Examples:**
```
Examples (Rich Text): 
머신러닝 모델 개발부터 배포까지 전체 파이프라인 구축; 대용량 데이터 처리 및 전처리 자동화; 모델 성능 최적화 및 하이퍼파라미터 튜닝; MLOps 파이프라인 구축 및 모니터링 시스템 개발
```

**Achievement Sections - Achievements:**
```
Achievements (Rich Text):
(2024) '네츠모빌리티' 서비스 소요시간 예측 AI 개발; (2024) '네츠모빌리티' 서비스 예약 앱 개발; (2023) '아트봇' 태블릿용 3D 페인팅 앱 개발; (2023) '아하소풍' 웰다잉 앱 '엔딩노트' 개발
```

**Projects/Portfolio - Skills & Features:**
```
Skills (Multi-select): [Flutter, Firebase, GCP, Unity, React, TypeScript]
Features (Rich Text): 실시간 데이터 동기화; 오프라인 모드 지원; 푸시 알림; 사용자 인증
Contribution (Rich Text): 프론트엔드 개발 100%, 백엔드 API 설계 80%
```

#### 🎯 UI 표시 결과

**Skills 섹션:**
```
Frontend
[React] [TypeScript] [Next.js] [Tailwind CSS]
```

**핵심 역량:**
```
머신러닝 파이프라인 개발
[Python] [TensorFlow] [Scikit-learn] [Pandas] [NumPy]

머신러닝 모델 개발부터 배포까지 전체 파이프라인을 구축하고 운영한 경험이 있습니다.

• 머신러닝 모델 개발부터 배포까지 전체 파이프라인 구축
• 대용량 데이터 처리 및 전처리 자동화
• 모델 성능 최적화 및 하이퍼파라미터 튜닝
• MLOps 파이프라인 구축 및 모니터링 시스템 개발
```

**업무 경험:**
```
네츠모빌리티 | 시니어 개발자
2022-2024
AI 및 앱 개발을 담당하며 다양한 프로젝트를 성공적으로 완료했습니다.

SI 개발
[Pandas] [Numpy] [Pytorch] [GCP] [Flutter] [Firebase] [Unity]
• (2024) '네츠모빌리티' 서비스 소요시간 예측 AI 개발
• (2024) '네츠모빌리티' 서비스 예약 앱 개발
• (2023) '아트봇' 태블릿용 3D 페인팅 앱 개발

펌웨어 및 임베디드 SW 개발
[STM32L433] [LoRa] [Raspberry Pi] [C] [Python]
• 저전력 무선 통신 장비의 STM32L433 MCU 기반 펌웨어 개발
• 전력 소모 최적화 알고리즘 및 LoRa 통신망 라우팅 알고리즘 개발
```

**프로젝트 경험:**
```
네츠모빌리티 예약 시스템
2024.01 - 2024.06
실시간 예약 관리 및 AI 기반 소요시간 예측 시스템을 개발했습니다.
주요 기여도: 프론트엔드 개발 100%, 백엔드 API 설계 80%

[React] [TypeScript] [Node.js] [PostgreSQL] [AWS]
• 실시간 예약 상태 동기화
• AI 모델을 활용한 소요시간 예측
• 관리자 대시보드 구축
• 모바일 반응형 UI 구현

GitHub | Website | iOS | Android
```

**포트폴리오:**
```
개인 블로그 웹사이트
2023.08 - 2023.12
개발 경험과 기술적 인사이트를 공유하는 개인 블로그를 구축했습니다.
주요 기여도: 풀스택 개발 100%

[Next.js] [Tailwind CSS] [MDX] [Vercel]
• MDX를 활용한 마크다운 기반 블로그
• 다크모드 지원
• 검색 기능 구현
• SEO 최적화

GitHub | Website
```

### 5. 사용 방법

- **이력서 페이지**: `http://localhost:3000` (Notion API 연동)
- **개발 서버**: `npm run dev`로 로컬 개발 서버 실행
- **빌드**: `npm run build`로 정적 사이트 생성

## 🚀 템플릿으로 사용하기

이 프로젝트를 템플릿으로 사용하여 자신만의 이력서 사이트를 만들 수 있습니다.

### 1. 프로젝트 포크 및 설정
```bash
# 1. 이 저장소를 포크하거나 클론
git clone https://github.com/yourusername/jaeiklee-resume.git
cd jaeiklee-resume

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (.env.local 파일 생성)
cp .env.example .env.local
# .env.local 파일을 편집하여 본인의 Notion API 정보 입력
```

### 2. 개인화 설정
- **개인 정보**: `src/app/page.tsx`에서 이름, 제목 등 수정
- **디자인**: `src/app/globals.css`에서 색상, 폰트 등 커스터마이징
- **레이아웃**: `src/components/layout/`에서 레이아웃 구조 수정

### 3. Notion 데이터베이스 설정
위의 "Notion API 연동 설정" 섹션을 참고하여 본인의 데이터로 채워넣기

### 4. 배포
```bash
# GitHub Pages 배포
npm run deploy

# 또는 다른 호스팅 서비스 사용
npm run build
# build 폴더를 원하는 호스팅 서비스에 업로드
```

## 📋 개발 로드맵

- [x] 모던한 이력서 디자인 구현
- [x] 컴포넌트 모듈화 완료
- [x] 타이포그래피 시스템 구축
- [x] PDF 다운로드 기능
- [x] GitHub Pages 배포 설정
- [x] Notion API 연동
- [x] 소제목별 성과 섹션 구조화
- [x] Multi-select 기술 스택 지원
- [x] 세미콜론 구분자 파싱 시스템
- [x] 포트폴리오 섹션 추가
- [x] 다중 링크 지원 (GitHub, Website, iOS, Android)
- [x] 기여도 정보 표시 기능
- [x] 줄바꿈 지원 (Rich Text)
- [ ] 다국어 지원 (한국어/영어)
- [ ] 다크모드 지원
- [ ] 애니메이션 효과 추가
- [ ] Notion 데이터 실시간 동기화
- [ ] 이력서 버전 관리 시스템

## 🔗 배포

GitHub Actions를 통해 main 브랜치에 push하면 자동으로 GitHub Pages에 배포됩니다.

## 📄 라이선스

MIT License