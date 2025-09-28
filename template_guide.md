# Notion DB 연동 개발자 이력서 빌더

React와 Next.js로 구축된 개인 이력서 빌더입니다. Notioin Database API를 연동하여 Notion 데이터베이스를 수정하면 이력서 페이지에 반영되도록 구현했습니다. 개발자 이력에 최적화되어 있습니다.

이재익 이력서 페이지: https://jaeikleedev.github.io/jaeiklee-resume/

## ✨ 주요 기능

- 🔄 **Notion API 연동**: Notion 데이터베이스 연동하여 Notion에서 이력서 내용 수정
- 📸 **프로필 사진 지원**: Notion Files & media 필드로 이미지 관리
- 📱 **반응형 디자인**: 모바일과 데스크톱 최적화
- 📋 **11개 섹션**: 개인정보, 기술, 경험, 프로젝트 등 포괄적 구성

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Fonts**: Inter (주요 폰트), JetBrains Mono (코드/기술 스택)
- **API Integration**: Notion API (@notionhq/client)

## 📋 이력서 섹션 구성

1. **개인 정보**: (연락처, 사진, 소개, ...)
2. **사용한 기술**:
3. **핵심 역량**
4. **업무 경험**
5. **프로젝트 경험**
6. **포트폴리오** (개인 프로젝트)
7. **가치관**
8. **개발 외 툴 활용 역량**
9. **학력**
10. **자격증 및 어학**
11. **병역**

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
│   │   ├── CertificationSection.tsx # 자격증 및 어학 섹션
│   │   ├── ContactInfo.tsx # 연락처 정보 섹션 (프로필 사진 포함)
│   │   ├── CoreCompetencySection.tsx # 핵심 역량 섹션
│   │   ├── EducationSection.tsx # 학력 섹션
│   │   ├── MilitaryServiceSection.tsx # 병역 섹션
│   │   ├── OtherToolSection.tsx # 개발 외 툴 섹션
│   │   ├── ProjectItem.tsx # 프로젝트/포트폴리오 아이템 (공통 컴포넌트)
│   │   ├── SkillSection.tsx # 기술 스택 섹션
│   │   ├── ValueSection.tsx # 가치관 섹션
│   │   └── WorkAchievementSection.tsx # 업무 성과 섹션 (소제목별)
│   └── ui/                 # 재사용 가능한 UI 컴포넌트
│       └── TechChips.tsx   # 기술 스택 칩
├── lib/                    # 유틸리티 함수
│   └── notion.ts          # Notion API 클라이언트 및 데이터 fetching
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

### 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. Integration 이름 설정 (예: "Resume API")
3. 생성된 Internal Integration Token 복사

### 2. Notion 데이터베이스 생성

다음 데이터베이스들을 Notion에서 생성하고 Integration에 연결:

#### **⚠️ 중요**
- 컬럼명은 반드시 소문자로 생성하고, notion.ts의 interface와 정확히 동일한 이름을 사용해야 합니다.
- 

자세한 작성법은 아래 Notion database를 참고해주세요

> 이재익 이력서 Notion Database: https://fluorescent-airplane-153.notion.site/Jaeik-Lee-Resume-Database-278b61feddfe80628aadf4982bcb492a

#### Personal Info 데이터베이스
- **name** (Title) - 이름
- **position** (Rich Text) - 직책/포지션
- **email** (Email) - 이메일
- **phone** (Phone Number) - 전화번호
- **location** (Rich Text) - 위치
- **photo** (Files & media) - 프로필 사진
- **introduction** (Rich Text) - 짧은 소개
- **github** (URL) - 깃허브
- **linkedin** (URL) - 링크드인
- **website** (URL) - 웹사이트

#### Skill 데이터베이스
- **title** (Title) - 카테고리
- **skills** (Multi-select) - 기술 스택
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Core Competency 데이터베이스
- **title** (Title) - 제목
- **description** (Rich Text) - 설명
- **skills** (Multi-select) - 관련 기술 스택
- **details** (Rich Text) - 사례, bullet point 설명
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Work Summary 데이터베이스
- **company** (Title) - 회사
- **position** (Rich Text) - 직책
- **period** (Rich Text) - 근무 기간
- **description** (Rich Text) - 회사 설명
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Work Achievement 데이터베이스
- **title** (Title) - 성과 소제목
- **details** (Rich Text) - 성과 디테일
- **skills** (Multi-select) - 해당 성과 관련 기술 스택
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Project 데이터베이스
- **title** (Title) - 프로젝트 제목
- **description** (Rich Text) - 프로젝트 설명
- **period** (Rich Text) - 개발 기간
- **skills** (Multi-select) - 사용한 기술 스택
- **details** (Rich Text) - 성과 상세
- **contribution** (Rich Text) - 기여도 정보
- **github** (URL) - GitHub 저장소 링크
- **website** (URL) - 웹사이트 링크
- **ios** (URL) - iOS 앱스토어 링크
- **android** (URL) - Android 플레이스토어 링크
- **post** (URL) - 블로그 글 링크
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Portfolio 데이터베이스
- **title** (Title) - 포트폴리오 제목
- **description** (Rich Text) - 포트폴리오 설명
- **period** (Rich Text) - 개발 기간
- **skills** (Multi-select) - 사용한 기술 스택
- **details** (Rich Text) - 주요 기능들
- **github** (URL) - GitHub 저장소 링크
- **website** (URL) - 웹사이트 링크
- **ios** (URL) - iOS 앱스토어 링크
- **android** (URL) - Android 플레이스토어 링크
- **post** (URL) - 블로그 글 링크
- **contribution** (Rich Text) - 기여도 정보
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Value 데이터베이스
- **title** (Title) - 가치관 제목
- **detail** (Rich Text) - 상세 내용
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Other Tool 데이터베이스
- **title** (Select) - 도구명
- **category** (Title) - 카테고리
- **description** (Rich Text) - 숙련도 및 경험 설명
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Education 데이터베이스
- **title** (Title) - 학교명
- **degree** (Rich Text) - 학위/전공
- **period** (Rich Text) - 학력 기간
- **location** (Rich Text) - 위치
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Certification 데이터베이스
- **title** (Title) - 자격증명
- **date** (Rich Text) - 취득일
- **number** (Rich Text) - 자격증 번호
- **issuer** (Rich Text) - 발행기관
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Military Service 데이터베이스
- **title** (Rich Text) - 병역 정보
- **period** (Rich Text) - 복무기간

### 3. 정렬 시스템

모든 데이터베이스(Personal Info, Military Service 제외)에서 **order** 프로퍼티를 사용하여 표시 순서를 제어합니다:

- **order 1** → 맨 위에 표시
- **order 2** → 두 번째에 표시
- **order 3** → 세 번째에 표시
- **order 값이 없거나 잘못된 경우** → 맨 아래에 표시

**정렬 예시:**
```
Skill 데이터베이스:
- Frontend (order: 1) → 맨 위
- Backend (order: 2) → 두 번째
- DevOps (order: 3) → 세 번째
- Other (order 없음) → 맨 아래
```

### 4. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경변수들을 설정:

```env
# Notion API 설정
NOTION_TOKEN=your_notion_integration_token_here

# Notion Database IDs (각 데이터베이스 URL에서 32자리 ID 추출)
NOTION_CERTIFICATION_DB_ID=your_certification_database_id_here
NOTION_CORE_COMPETENCY_DB_ID=your_core_competency_database_id_here
NOTION_EDUCATION_DB_ID=your_education_database_id_here
NOTION_MILITARY_SERVICE_DB_ID=your_military_service_database_id_here
NOTION_OTHER_TOOL_DB_ID=your_other_tool_database_id_here
NOTION_PERSONAL_INFO_DB_ID=your_personal_info_database_id_here
NOTION_PORTFOLIO_DB_ID=your_portfolio_database_id_here
NOTION_PROJECT_DB_ID=your_project_database_id_here
NOTION_SKILL_DB_ID=your_skill_database_id_here
NOTION_VALUE_DB_ID=your_value_database_id_here
NOTION_WORK_ACHIEVEMENT_DB_ID=your_work_achievement_database_id_here
NOTION_WORK_SUMMARY_DB_ID=your_work_summary_database_id_here
```

### 5. 데이터 입력 방법 및 파싱 규칙

#### 📝 텍스트 구분자 규칙
이 템플릿에서는 **세미콜론(;)**을 구분자로 사용합니다:

- **Rich Text 필드**: 세미콜론(;)으로 구분하여 여러 항목 입력
- **Multi-select 필드**: 각 항목을 개별 옵션으로 선택

#### 📋 데이터베이스별 입력 예시

**Skill 데이터베이스:**
```
Name (Multi-select): [React, TypeScript, Next.js, Tailwind CSS]
Category (Select): Frontend
```

**Core Competency - Details:**
```
Details (Rich Text): 
머신러닝 모델 개발부터 배포까지 전체 파이프라인 구축; 대용량 데이터 처리 및 전처리 자동화; 모델 성능 최적화 및 하이퍼파라미터 튜닝; MLOps 파이프라인 구축 및 모니터링 시스템 개발
```

**Work Achievement Sections - Details:**
```
Achievements (Rich Text):
(2024) '네츠모빌리티' 서비스 소요시간 예측 AI 개발; (2024) '네츠모빌리티' 서비스 예약 앱 개발; (2023) '아트봇' 태블릿용 3D 페인팅 앱 개발; (2023) '아하소풍' 웰다잉 앱 '엔딩노트' 개발
```

**Project/Portfolio - Skills & Details:**
```
Skills (Multi-select): [Flutter, Firebase, GCP, Unity, React, TypeScript]
Details (Rich Text): 실시간 데이터 동기화; 오프라인 모드 지원; 푸시 알림; 사용자 인증
Contribution (Rich Text): 프론트엔드 개발 100%, 백엔드 API 설계 80%
```

#### 🎯 UI 표시 결과

**Skill 섹션:**
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

### 6. 사용 방법

- **이력서 페이지**: `http://localhost:3000` (Notion API 연동)
- **개발 서버**: `npm run dev`로 로컬 개발 서버 실행
- **빌드**: `npm run build`로 정적 사이트 생성

## 🏗️ 프로젝트 구조 및 설계

### 컴포넌트 아키텍처
이 프로젝트는 다음과 같은 구조로 설계되었습니다:

- **레이아웃 컴포넌트**: `ResumeLayout`, `Page` - 전체 레이아웃 관리
- **섹션 컴포넌트**: 각 이력서 섹션별로 분리된 컴포넌트
- **공통 컴포넌트**: `ProjectItem` - 프로젝트/포트폴리오 공통 렌더링
- **UI 컴포넌트**: `TechChips` - 재사용 가능한 UI 요소

### 데이터 관리
- **Notion API 연동**: 모든 이력서 데이터를 Notion에서 동적으로 관리
- **타입 안정성**: TypeScript로 모든 데이터 구조 정의
- **데이터 변환**: Notion API 응답을 UI에 맞는 형태로 변환하는 함수들
- **코드 구조**: 명확하고 유지보수하기 쉬운 데이터 변환 함수들