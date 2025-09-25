# 이재익 이력서 사이트

React와 Next.js로 구축된 개인 이력서 빌더입니다. Notioin Database API를 연동하여 Notion 데이터베이스를 수정하면 바로 이력서 페이지에 반영되도록 구현했습니다.

## ✨ 주요 기능

- 🔄 **Notion API 연동**: Notion 데이터베이스 수정 시 실시간 반영
- 📸 **프로필 사진 지원**: Notion Files & media 필드로 이미지 관리
- 📝 **자기소개 관리**: 줄바꿈 지원으로 자연스러운 문단 구성
- 📄 **PDF Export**: 웹사이트를 A4 크기의 PDF로 다운로드
- 📱 **반응형 디자인**: 모바일과 데스크톱 최적화
- 🎨 **커스터마이징**: CSS 변수로 색상, 간격, 폰트 조정 가능
- 📋 **11개 섹션**: 개인정보, 기술, 경험, 프로젝트 등 포괄적 구성
- 🛠 **TypeScript**: 타입 안정성과 개발자 경험 향상

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Fonts**: Inter (주요 폰트), JetBrains Mono (코드/기술 스택)
- **PDF Generation**: html2canvas, jsPDF
- **API Integration**: Notion API (@notionhq/client)

## 📋 이력서 섹션 구성

이 프로젝트는 다음과 같은 11개 섹션으로 구성된 완전한 이력서를 제공합니다:

1. **개인 정보**: 이름, 연락처, 사진, 소개
2. **사용한 기술**: 기술 스택을 카테고리별로 분류
3. **핵심 역량**: 기술을 중심으로 핵심 역량 어필
4. **업무 경험**: 회사별 경험과 성과
5. **프로젝트 경험**: 개발한 프로젝트들
6. **포트폴리오**: 개인 프로젝트 및 작품
7. **가치관**: 개인의 가치관과 철학
8. **개발 외 툴 활용 역량**: 개발 외 사용하는 도구들
9. **학력**: 교육 배경 정보
10. **자격증 및 어학**: 취득한 자격증과 어학 능력
11. **병역**: 병역 복무 정보

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
│   │   ├── ContactInfo.tsx # 연락처 정보 섹션 (프로필 사진 포함)
│   │   ├── ProjectItem.tsx # 프로젝트/포트폴리오 아이템 (공통 컴포넌트)
│   │   ├── SkillSection.tsx # 기술 스택 섹션
│   │   ├── CoreCompetencySection.tsx # 핵심 역량 섹션
│   │   ├── WorkAchievementSection.tsx # 업무 성과 섹션 (소제목별)
│   │   ├── ValueSection.tsx # 가치관 섹션
│   │   ├── ToolSection.tsx # 개발 외 툴 섹션
│   │   ├── EducationSection.tsx # 학력 섹션
│   │   ├── CertificationSection.tsx # 자격증 및 어학 섹션
│   │   └── MilitaryServiceSection.tsx # 병역 섹션
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

## 🚀 템플릿으로 사용하기

이 프로젝트를 템플릿으로 사용하여 자신만의 이력서 사이트를 만들 수 있습니다.

### 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. Integration 이름 설정 (예: "Resume API")
3. 생성된 Internal Integration Token 복사

### 2. Notion 데이터베이스 생성

다음 데이터베이스들을 Notion에서 생성하고 Integration에 연결:

**⚠️ 중요**: 컬럼명은 반드시 소문자로 생성하고, 코드의 interface와 정확히 동일한 이름을 사용해야 합니다.

**📝 참고**: 각 데이터베이스에서 (Title)로 표시된 필드는 데이터베이스의 기본 Title 속성입니다.

#### Personal Info 데이터베이스
- **name** (Title)
- **title** (Rich Text) - 직책/포지션
- **email** (Email)
- **phone** (Phone Number)
- **location** (Rich Text)
- **photo** (Files & media)
- **introduction** (Rich Text)
- **github** (URL)
- **linkedin** (URL)
- **website** (URL)

#### Skills 데이터베이스
- **category** (Title)
- **name** (Multi-select): 각 기술을 개별 옵션으로 추가 (예: React, TypeScript, Python, Docker 등)

#### Core Competencies 데이터베이스
- **title** (Title)
- **description** (Rich Text): 역량 설명
- **skills** (Multi-select): 관련 기술 스택
- **examples** (Rich Text): 세미콜론(;)으로 구분된 예시들

#### Experiences 데이터베이스
- **company** (Title)
- **position** (Rich Text): 직책
- **period** (Rich Text): 근무 기간
- **description** (Rich Text): 업무 설명

#### Achievement Sections 데이터베이스
- **name** (Title)
- **achievements** (Rich Text): 세미콜론(;)으로 구분된 성과 목록
- **skills** (Multi-select): 해당 섹션에서 사용한 기술 스택

#### Projects 데이터베이스
- **name** (Title)
- **description** (Rich Text): 프로젝트 설명
- **period** (Rich Text): 개발 기간
- **skills** (Multi-select): 사용한 기술 스택
- **features** (Rich Text): 세미콜론(;)으로 구분된 주요 기능들
- **github** (URL): GitHub 저장소 링크
- **website** (URL): 웹사이트 링크
- **ios** (URL): iOS 앱스토어 링크
- **android** (URL): Android 플레이스토어 링크
- **contribution** (Rich Text): 기여도 정보

#### Portfolio 데이터베이스 (Projects와 동일한 구조)
- **name** (Title)
- **description** (Rich Text): 포트폴리오 설명
- **period** (Rich Text): 개발 기간
- **skills** (Multi-select): 사용한 기술 스택
- **features** (Rich Text): 세미콜론(;)으로 구분된 주요 기능들
- **github** (URL): GitHub 저장소 링크
- **website** (URL): 웹사이트 링크
- **ios** (URL): iOS 앱스토어 링크
- **android** (URL): Android 플레이스토어 링크
- **contribution** (Rich Text): 기여도 정보

#### Values 데이터베이스
- **title** (Title)
- **description** (Rich Text)

#### Tools 데이터베이스
- **category** (Title) - 카테고리명 (예: Graphic Design Tool (Adobe), UI Design Tool 등)
- **name** (Select) - 도구명 선택 (예: Premiere Pro, After Effects, Figma 등)
- **description** (Rich Text) - 숙련도 및 경험 설명 (예: 숙련 | 실사 기반 영상 편집 20건+)

#### Education 데이터베이스
- **institution** (Title)
- **degree** (Rich Text): 학위/전공 (예: 컴퓨터공학)
- **period** (Rich Text): 학력 기간 (예: 2012.02 ~ 2021.02)
- **location** (Rich Text): 위치 (예: 포항, 4년제)

#### Certifications 데이터베이스
- **name** (Title)
- **date** (Rich Text): 취득일 (예: 2020.11.12)
- **number** (Rich Text): 자격증 번호 (예: 20203220072C)
- **issuer** (Rich Text): 발행기관 (예: 한국산업인력공단)

#### Military Service 데이터베이스
- **name** (Rich Text): 병역 정보 (예: 육군 | 병장 | 만기 전역)
- **period** (Rich Text): 복무기간 (예: 2013.03 ~ 2014.12)

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
NOTION_EDUCATION_DB_ID=your_education_database_id_here
NOTION_CERTIFICATIONS_DB_ID=your_certifications_database_id_here
NOTION_MILITARY_SERVICE_DB_ID=your_military_service_database_id_here
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

**학력:**
```
한동대학교 컴퓨터공학
2012.02 ~ 2021.02 | 포항, 4년제

벨국제학교 대안학교
2008.02 ~ 2011.02 | 2008.08 고졸 검정고시
```

**자격증 및 어학:**
```
정보처리기사
2020.11.12 | 20203220072C | 한국산업인력공단

IoT지식능력검정
2022.06.10 | 2022-05-900159 | 한국지능형사물인터넷협회

OPIc IM2
2025.07.22 | BR9M-RQFO-XZ2F-KSM5-RA38 | ACTFL
```

**병역:**
```
육군 | 병장 | 만기 전역
2013.03 ~ 2014.12
```

### 5. 사용 방법

- **이력서 페이지**: `http://localhost:3000` (Notion API 연동)
- **개발 서버**: `npm run dev`로 로컬 개발 서버 실행
- **빌드**: `npm run build`로 정적 사이트 생성

## 🏗️ 프로젝트 구조 및 설계

### 컴포넌트 아키텍처
이 프로젝트는 다음과 같은 구조로 설계되었습니다:

- **레이아웃 컴포넌트**: `ResumeLayout`, `Page` - 전체 레이아웃 관리
- **섹션 컴포넌트**: 각 이력서 섹션별로 분리된 컴포넌트
- **공통 컴포넌트**: `ProjectItem` - 프로젝트/포트폴리오 공통 렌더링
- **UI 컴포넌트**: `PDFExport`, `TechChips` - 재사용 가능한 UI 요소

### 데이터 관리
- **Notion API 연동**: 모든 이력서 데이터를 Notion에서 동적으로 관리
- **타입 안정성**: TypeScript로 모든 데이터 구조 정의
- **데이터 변환**: Notion API 응답을 UI에 맞는 형태로 변환하는 함수들
- **코드 구조**: 명확하고 유지보수하기 쉬운 데이터 변환 함수들