# Notion DB 연동 개발자 이력서 사이트

React와 Next.js로 구축된 공개 이력서 사이트입 템플릿입니다. 연동된 Notion 데이터베이스를 수정하면 이력서 페이지에 반영되도록 구현했습니다.

### Notion DB 및 이력서 사이트 예시

- [이재익 이력서 페이지](https://jaeikleedev.github.io/jaeiklee-resume/)
- [이재익 이력서 Notion 데이터베이스](https://fluorescent-airplane-153.notion.site/Jaeik-Lee-Resume-Database-278b61feddfe80628aadf4982bcb492a)

## ✨ 주요 기능

- 🔄 **Notion API 연동**: Notion에서 이력서 내용을 수정하면 페이지에 반영
- 📱 **반응형 디자인**: 모바일과 데스크톱 최적화
- 👨‍💻 **개발자 최적화**: 기술 스택, 포트폴리오 등 개발자 이력에 최적화된 구성
- 👁️ **show/hide**: 원하는 섹션/프로퍼티만 show/hide 할 수 있는 기능

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Fonts**: Pretendard (주요 폰트), JetBrains Mono (코드/기술 스택)
- **API Integration**: Notion API (@notionhq/client)
- **Deployment**: Vercel

## 📋 이력서 섹션 구성

1. 개인 정보
2. 사용한 기술
3. 핵심 역량
4. 업무 경험
5. 프로젝트 경험
6. 포트폴리오
7. 가치관
8. 개발 외 툴 활용 역량
9. 학력
10. 자격증 및 어학
11. 병역

<br>

---

<br>

## 📋 Notion DB 구성하기

### DB별 필드

각 필드(Notion의 property)를 '프로퍼티명 (프로퍼티 타입)'으로 표시.

> [!NOTE] 프로퍼티 타입 종류 (Notion 앱에서 설정하는 방법)
> - **Title**: 데이터베이스 생성 시 기본으로 제공되는 "Name" 필드 (이름 변경 가능)
> - **Rich Text**: 프로퍼티 추가 → "Text" 선택 (앱에서는 "Text"로 표시)
> - **Multi-select**: 프로퍼티 추가 → "Multi-select" 선택 → 옵션 추가
> - **Select**: 프로퍼티 추가 → "Select" 선택 → 옵션 추가
> - **Number**: 프로퍼티 추가 → "Number" 선택
> - **URL**: 프로퍼티 추가 → "URL" 선택
> - **Email**: 프로퍼티 추가 → "Email" 선택
> - **Phone**: 프로퍼티 추가 → "Phone" 선택
> - **Files & media**: 프로퍼티 추가 → "Files & media" 선택 

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
- **title** (Title) - 카테고리 분류를 위한 필드. 화면에는 나타나지 않음.
- **skills** (Multi-select) - 기술 스택
- **order** (Number) - 정렬 순서 (1이 맨 위로)
- **show** (Select) - 표시 여부

#### Core Competency 데이터베이스
- **title** (Title) - 제목
- **description** (Rich Text) - 설명
- **skills** (Multi-select) - 관련 기술 스택
- **details** (Rich Text) - 사례, bullet point 설명
- **order** (Number)
- **show** (Select)

#### Work Summary 데이터베이스
- **company** (Title) - 회사
- **position** (Rich Text) - 직책
- **period** (Rich Text) - 근무 기간
- **description** (Rich Text) - 회사 설명
- **order** (Number)
- **show** (Select)

#### Work Achievement 데이터베이스
- **title** (Title) - 성과 소제목
- **details** (Rich Text) - 성과 디테일
- **skills** (Multi-select) - 해당 성과 관련 기술 스택
- **company** (Rich Text) - Work Summary DB > 'company'와 같은 값
- **order** (Number)
- **show** (Select)

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
- **order** (Number)
- **show** (Select)

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
- **order** (Number)
- **show** (Select)

#### Value 데이터베이스
- **title** (Title) - 가치관 제목
- **details** (Rich Text) - 상세 내용
- **order** (Number)
- **show** (Select)

#### Other Tool 데이터베이스
- **title** (Title) - 도구명
- **category** (Select) - 카테고리
- **description** (Rich Text) - 숙련도 및 경험 설명
- **order** (Number)
- **show** (Select)

#### Education 데이터베이스
- **title** (Title) - 학교명
- **degree** (Rich Text) - 학위/전공
- **period** (Rich Text) - 학력 기간
- **location** (Rich Text) - 위치
- **order** (Number)
- **show** (Select)

#### Certification 데이터베이스
- **title** (Title) - 자격증명
- **date** (Rich Text) - 취득일
- **number** (Rich Text) - 자격증 번호
- **issuer** (Rich Text) - 발행기관
- **order** (Number)
- **show** (Select)

#### Military Service 데이터베이스
- **title** (Title) - 병역 정보
- **period** (Rich Text) - 복무기간

### 1. Notion Integration 생성하기

1. [Notion Developers](https://www.notion.so/my-integrations)에서 새 Integration 생성
   - Integration 이름 설정 (예: "Resume API")
   - Associated workspace: 본인 workspace
   - Type: Internal
2. Internal Integration Secret 복사해두기 - Notion 연동에 사용

### 2. Notion 데이터베이스 생성하기

[이재익 이력서 Notion Database](https://fluorescent-airplane-153.notion.site/Jaeik-Lee-Resume-Database-278b61feddfe80628aadf4982bcb492a)를 Duplicate 합니다.

![Screenshot](template_guide/img/Screenshot_notion-template-duplicate.png)

duplicate as template 실패하는 경우가 많습니다. 다양한 브라우저, 시크릿 모드, 모바일에서 캐시 삭제 후 시도해보시길 바랍니다.

그래도 안 되는 경우, [이재익 이력서 Notion Database](https://fluorescent-airplane-153.notion.site/Jaeik-Lee-Resume-Database-278b61feddfe80628aadf4982bcb492a)와 위의 'Notion DB 구성' 참고해서 직접 구성해주시면 됩니다. 

> [!IMPORTANT]
> **각 property 이름은 소문자**로 해주세요. **notion.ts의 interface와 정확히 동일**해야 합니다.

### 3. Rich Text, Multi-select 필드의 데이터 입력 및 파싱 규칙

- **[Rich Text]** Bullet point: 줄 맨 앞에 '- ' (대시 + 공백) 입력
- **[Rich Text]** 줄바꿈: Notion에서 입력한 그대로 줄바꿈이 유지되어 표시
- **[Multi-select]** 각 항목을 개별 옵션으로 인식

#### 예시: skills 필드는 Multi-select, details필드는 Rich Text

**Notion DB 예시:**

![Screenshot](template_guide/img/Screenshot_text_parsing_rule_1.png)

**이력서 결과 페이지:**

![Screenshot](template_guide/img/Screenshot_text_parsing_rule_2.png)

### 4. 업무 경험 성과 나열하기

**여러 회사에서 근무한 경험이 있고, 각 회사별로 여러 성과를 보여주고 싶다면** 이렇게 구성하세요:

#### 회사별 기본 정보 입력 (Work Summary DB)
- 각 회사마다 하나의 레코드 생성
- 회사명, 직책, 근무기간, 회사 설명 등 입력

#### 성과별 상세 정보 입력 (Work Achievement DB)
- 각 성과마다 개별 레코드 생성
- **`company` 필드에 해당 성과가 속하는 회사명 입력(Work Summary DB의 `company` 필드와 동일)**

#### 예시

DB 구성

![Screenshot](template_guide/img/Screenshot_work_DB_1.png)

이력서 페이지

![Screenshot](template_guide/img/Screenshot_work_DB_2.png)

### 5. 사용하지 않는 섹션(DB)/프로퍼티

내용이 없는 데이터베이스/프로퍼티는 페이지에 표시하지 않도록 설계

#### 예시:

데이터베이스: 학력 DB 내용 X, 정보처리기사 'number' 프로퍼티 없음

![Screenshot](template_guide/img/Screenshot_empty_data.png)

페이지 결과: 학력 섹션 표시 안 됨. 정보처리기사 자격번호 표시하지 않음

![Screenshot](template_guide/img/Screenshot_empty_data_result.png)

### 6. DB의 각 row를 원하는 순서로 정렬하기

Notion Database API는 순서를 보장하지 않습니다. 모든 데이터베이스(Personal Info, Military Service 제외)에서 **order** 프로퍼티를 사용하여 표시 순서를 제어합니다:

- **order 1** → 맨 위에 표시
- **order 2** → 두 번째에 표시
- **order 3** → 세 번째에 표시
- **order 값이 없거나 잘못된 경우** → 맨 아래에 표시

**정렬 예시:**

Skill 데이터베이스:

![Screenshot](template_guide/img/Screenshot_sorting_system_1.png)

웹사이트 화면

![Screenshot](template_guide/img/Screenshot_sorting_system_2.png)







## 🚀 템플릿 사용하기

### 사용 방법

- **Fork** 본 리포지토리를 fork (또는 클론) 후 깃헙 리포지토리에 푸시
- **의존성 설치**: `npm install`
- 클론한 리포지토리의 루트에 `.env.local` 파일을 생성하고 다음 환경변수들을 설정:
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
각 ID는 다음과 같이 복사해옵니다.

#### NOTION_TOKEN

위의 '1. Notion Integration 생성 > 2.' 에서 복사한 Internal Integration Secret 입니다.

#### Notion Database IDs

각 데이터베이스의 세팅 > 'Manage data sources'

![Screenshot](template_guide/img/Screenshot_notion-db-id_1.png)

점 세개 메뉴 > 'Copy data source ID'

![Screenshot](template_guide/img/Screenshot_notion-db-id_2.png)

- **개발 서버**: `npm run dev`로 로컬 개발 서버 실행
- **이력서 페이지**: `http://localhost:3000`
- **빌드**: `npm run build`로 정적 사이트 생성

## 🌐 Vercel 배포 가이드

### Vercel 배포 특징

- 🔄 **실시간 반영**: Notion에서 수정하면 웹사이트 새로고침만으로 즉시 반영
- 🚀 **자동 배포**: GitHub push 시 자동으로 배포 (2-3분 소요)
- 💰 **무료 사용**: 무료 플랜(월 4시간 CPU, 360GB-시간 메모리)으로 충분
- 🌍 **빠른 속도**: 글로벌 CDN으로 전 세계 어디서나 빠른 로딩

### 1. Vercel 프로젝트 생성

1. [Vercel](https://vercel.com)에 접속하여 계정 생성
2. Add New Project
3. Continue with Github
4. Import Git Repository > Install > 내 계정 선택
5. Only select repositories > fork/클론한 리포지토리 선택
6. Import

### 3. 환경 변수 설정

'Environment Variables'를 열어 로컬의 .env.local 과 동일한 환경변수를 등록합니다. 또는 Deploy 후 Vercel 프로젝트 설정에서 **"Environment Variables"** 섹션에서도 추가할 수 있습니다.

> [!TIP]
> variable을 한번에 추가할 수 있습니다.
> 1. 아래와 같이 추가할 ID 전체를 선택, Copy합니다.
> 2. 'Key' 부분에 커서를 놓고 Paste합니다.

![Screenshot](template_guide/img/Screenshot_notion_key_env_var_tip_2.png)
![Screenshot](template_guide/img/Screenshot_notion_key_env_var_tip_3.png)


### 4. 배포 설정

1. **Framework Preset**: Next.js (자동 감지)
2. **Root Directory**: `./` (기본값)
3. **Build Command**: `npm run build` (기본값)
4. **Output Directory**: `.next` (기본값)

### 5. 배포 실행

1. **"Deploy"** 버튼 클릭
2. 배포 완료까지 2-3분 대기
3. 제공된 URL로 접속하여 확인

### 6. 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트 설정에서 **"Domains"** 섹션으로 이동
2. 원하는 도메인 입력
3. DNS 설정에 따라 도메인 연결

### 7. 자동 배포 확인

1. GitHub에서 코드 수정 후 push
2. Vercel에서 자동으로 재배포 실행
3. Notion에서 데이터 수정 후 웹사이트 새로고침하여 실시간 반영 확인

## 🔧 GitHub Pages 배포 (대안)

GitHub Pages를 사용하려면:

```bash
# 정적 사이트 생성
npm run build
npm run export

# GitHub Pages에 배포
npm run deploy
```

**주의**: GitHub Pages는 정적 사이트이므로 Notion 데이터 변경 시 수동으로 재배포해야 합니다.

## 🔧 트러블슈팅

### Vercel 배포 관련

#### 1. 환경 변수 설정 오류
- **문제**: 배포 후 "Missing required environment variables" 에러
- **해결**: Vercel 프로젝트 설정에서 모든 환경 변수가 올바르게 설정되었는지 확인
- **확인 방법**: Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

#### 2. Notion API 연결 오류
- **문제**: "Personal info DB not found" 에러
- **해결**: 
  1. Notion Integration이 올바른 데이터베이스에 연결되었는지 확인
  2. 데이터베이스 ID가 정확한지 확인
  3. Notion Integration 권한 설정 확인

#### 3. 빌드 실패
- **문제**: Vercel에서 빌드 실패
- **해결**:
  1. `package.json`의 의존성 버전 확인
  2. Node.js 버전 호환성 확인 (권장: 18.x)
  3. 빌드 로그에서 구체적인 에러 메시지 확인

### 로컬 개발 관련

#### 1. 폰트 로딩 문제
- **문제**: Pretendard 폰트가 로드되지 않음
- **해결**: 
  1. 인터넷 연결 확인
  2. CDN 링크가 올바른지 확인
  3. 브라우저 개발자 도구에서 네트워크 탭 확인

#### 2. Notion 데이터 로딩 실패
- **문제**: 로컬에서 Notion 데이터를 가져오지 못함
- **해결**:
  1. `.env.local` 파일이 올바른 위치에 있는지 확인
  2. 환경 변수 이름과 값이 정확한지 확인
  3. Notion Integration 권한 설정 확인

### 일반적인 문제

#### 1. 이미지가 표시되지 않음
- **문제**: Notion에서 업로드한 이미지가 웹사이트에 표시되지 않음
- **해결**: Notion에서 이미지를 공개 링크로 설정하거나 외부 이미지 호스팅 서비스 사용

#### 2. PDF 다운로드 기능 오류
- **문제**: PDF 다운로드 버튼이 작동하지 않음
- **해결**:
  1. Vercel에서 Puppeteer가 올바르게 설치되었는지 확인
  2. 메모리 제한 확인 (Vercel 무료 플랜: 1024MB)
  3. PDF 생성 API 엔드포인트가 올바르게 작동하는지 확인

#### 3. 반응형 디자인 문제
- **문제**: 모바일에서 레이아웃이 깨짐
- **해결**:
  1. CSS 미디어 쿼리 확인
  2. Tailwind CSS 클래스가 올바르게 적용되었는지 확인
  3. 브라우저 개발자 도구에서 모바일 뷰 확인

### 성능 최적화

#### 1. 페이지 로딩 속도 개선
- **방법**:
  1. 이미지 최적화 (WebP 형식 사용)
  2. 폰트 preload 설정
  3. 불필요한 의존성 제거

#### 2. Notion API 호출 최적화
- **방법**:
  1. ISR (Incremental Static Regeneration) 사용 고려
  2. 적절한 캐싱 전략 적용
  3. 불필요한 데이터 필드 제거

### 지원 및 문의

문제가 지속되면 다음을 확인해주세요:

1. **GitHub Issues**: [이 저장소의 Issues](https://github.com/jaeikleedev/jaeiklee-resume/issues)에서 유사한 문제 검색
2. **Notion API 문서**: [Notion API 공식 문서](https://developers.notion.com/) 참조
3. **Vercel 문서**: [Vercel 공식 문서](https://vercel.com/docs) 참조

