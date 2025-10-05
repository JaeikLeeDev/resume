# 🗃️ Notion DB 구성

## Notion property

> [!NOTE] Notion 프로퍼티 타입은 프로퍼티 이름 앞 아이콘으로 구별할 수 있습니다.

![Screenshot](/DOCS/img/Screenshot_property_types.png)

## Notion 이력서 데이터베이스 구성

### Personal Info 데이터베이스

| 프로퍼티명   | 프로퍼티 타입 | 타이포그래피 클래스     | 설명              |
| ------------ | ------------- | ----------------------- | ----------------- |
| name         | Title         | `.text-hero`            | 이름 (메인 제목)  |
| position     | Rich Text     | `.text-secondary-title` | 직책/포지션       |
| email        | Email         | `.text-contact`         | 이메일 (연락처)   |
| phone        | Phone Number  | `.text-contact`         | 전화번호 (연락처) |
| location     | Rich Text     | `.text-meta`            | 위치 (메타 정보)  |
| introduction | Rich Text     | `.text-body`            | 짧은 소개 (본문)  |
| website      | URL           | `.text-contact`         | 웹사이트 (링크)   |
| github       | URL           | `.text-contact`         | 깃허브 (링크)     |
| linkedin     | URL           | `.text-contact`         | 링크드인 (링크)   |

### Skill 데이터베이스

| 프로퍼티명 | 프로퍼티 타입 | 타이포그래피 클래스 | 설명                             |
| ---------- | ------------- | ------------------- | -------------------------------- |
| title      | Title         | -                   | 카테고리 분류 (화면에 표시되지 않음) |
| skills     | Multi-select  | `.tech-chip`        | 기술 스택 (칩 형태)              |
| order      | Number        | -                   | 정렬 순서 (1이 맨 위)            |
| show       | Select        | -                   | 표시 여부                        |

### Core Competency 데이터베이스

| 프로퍼티명  | 프로퍼티 타입 | 타이포그래피 클래스         | 설명                             |
| ----------- | ------------- | --------------------------- | -------------------------------- |
| title       | Title         | `.text-details-title`       | 제목                             |
| description | Rich Text     | `.text-body`                | 설명                             |
| skills      | Multi-select  | `.tech-chip`                | 관련 기술 스택                   |
| details     | Rich Text     | `.text-body` / `.list-item` | 사례, bullet point 설명 (조건부) |
| order       | Number        | -                           | 정렬 순서                        |
| show        | Select        | -                           | 표시 여부                        |

### Work Summary 데이터베이스

| 프로퍼티명  | 프로퍼티 타입 | 타이포그래피 클래스      | 설명      |
| ----------- | ------------- | ------------------------ | --------- |
| company     | Title         | `.text-subsection-title` | 회사명    |
| position    | Rich Text     | `.text-subsection-title` | 직책      |
| period      | Rich Text     | `.text-meta`             | 근무 기간 |
| description | Rich Text     | `.text-body`             | 회사 설명 |
| order       | Number        | -                        | 정렬 순서 |
| show        | Select        | -                        | 표시 여부 |

### Work Achievement 데이터베이스

| 프로퍼티명 | 프로퍼티 타입 | 타이포그래피 클래스         | 설명                                  |
| ---------- | ------------- | --------------------------- | ------------------------------------- |
| title      | Title         | `.text-details-title`       | 성과 소제목                           |
| details    | Rich Text     | `.text-body` / `.list-item` | 성과 디테일 (조건부)                  |
| skills     | Multi-select  | `.tech-chip`                | 해당 성과 관련 기술 스택              |
| company    | Rich Text     | -                           | Work Summary DB > 'company'와 연결    |
| order      | Number        | -                           | 정렬 순서                             |
| show       | Select        | -                           | 표시 여부                             |

### Project 데이터베이스

| 프로퍼티명   | 프로퍼티 타입 | 타이포그래피 클래스         | 설명                      |
| ------------ | ------------- | --------------------------- | ------------------------- |
| title        | Title         | `.text-subsection-title`    | 프로젝트 제목             |
| description  | Rich Text     | `.text-body`                | 프로젝트 설명             |
| period       | Rich Text     | `.text-meta`                | 개발 기간                 |
| skills       | Multi-select  | `.tech-chip`                | 사용한 기술 스택          |
| details      | Rich Text     | `.text-body` / `.list-item` | 성과 상세 (조건부)        |
| contribution | Rich Text     | `.text-meta`                | 기여도 정보               |
| github       | URL           | `.link`                     | GitHub 저장소 링크        |
| website      | URL           | `.link`                     | 웹사이트 링크             |
| ios          | URL           | `.link`                     | iOS 앱스토어 링크         |
| android      | URL           | `.link`                     | Android 플레이스토어 링크 |
| post         | URL           | `.link`                     | 블로그 글 링크            |
| order        | Number        | -                           | 정렬 순서                 |
| show         | Select        | -                           | 표시 여부                 |

### Portfolio 데이터베이스

| 프로퍼티명   | 프로퍼티 타입 | 타이포그래피 클래스         | 설명                      |
| ------------ | ------------- | --------------------------- | ------------------------- |
| title        | Title         | `.text-subsection-title`    | 포트폴리오 제목           |
| description  | Rich Text     | `.text-body`                | 포트폴리오 설명           |
| period       | Rich Text     | `.text-meta`                | 개발 기간                 |
| skills       | Multi-select  | `.tech-chip`                | 사용한 기술 스택          |
| details      | Rich Text     | `.text-body` / `.list-item` | 주요 기능들 (조건부)      |
| github       | URL           | `.link`                     | GitHub 저장소 링크        |
| website      | URL           | `.link`                     | 웹사이트 링크             |
| ios          | URL           | `.link`                     | iOS 앱스토어 링크         |
| android      | URL           | `.link`                     | Android 플레이스토어 링크 |
| post         | URL           | `.link`                     | 블로그 글 링크            |
| contribution | Rich Text     | `.text-meta`                | 기여도 정보               |
| order        | Number        | -                           | 정렬 순서                 |
| show         | Select        | -                           | 표시 여부                 |

### Value 데이터베이스

| 프로퍼티명 | 프로퍼티 타입 | 타이포그래피 클래스         | 설명               |
| ---------- | ------------- | --------------------------- | ------------------ |
| title      | Title         | `.text-details-title`       | 가치관 제목        |
| details    | Rich Text     | `.text-body` / `.list-item` | 상세 내용 (조건부) |
| order      | Number        | -                           | 정렬 순서          |
| show       | Select        | -                           | 표시 여부          |

### Other Tool 데이터베이스

| 프로퍼티명  | 프로퍼티 타입 | 타이포그래피 클래스     | 설명                           |
| ----------- | ------------- | ----------------------- | ------------------------------ |
| title       | Title         | `.text-secondary-title` | 도구명 (카테고리 내 개별 도구) |
| category    | Select        | `.text-details-title`   | 카테고리 (섹션 제목)           |
| description | Rich Text     | `.text-body`            | 숙련도 및 경험 설명            |
| order       | Number        | -                       | 정렬 순서                      |
| show        | Select        | -                       | 표시 여부                      |

### Education 데이터베이스

| 프로퍼티명 | 프로퍼티 타입 | 타이포그래피 클래스   | 설명                                      |
| ---------- | ------------- | --------------------- | ----------------------------------------- |
| title      | Title         | `.text-details-title` | 학교명 (학위/전공과 함께 표시)         |
| degree     | Rich Text     | -                     | title과 함께 표시됨                   |
| period     | Rich Text     | `.text-meta`          | 학력 기간                                 |
| location   | Rich Text     | `.text-meta`          | 위치                                      |
| order      | Number        | -                     | 정렬 순서                                 |
| show       | Select        | -                     | 표시 여부                                 |

### Certification 데이터베이스

| 프로퍼티명 | 프로퍼티 타입 | 타이포그래피 클래스   | 설명               |
| ---------- | ------------- | --------------------- | ------------------ |
| title      | Title         | `.text-details-title` | 자격증명           |
| date       | Rich Text     | `.text-meta`          | 취득일 (자격증 번호, 발행기관과 함께 표시) |
| number     | Rich Text     | -                     | date와 함께 표시됨                       |
| issuer     | Rich Text     | -                     | date와 함께 표시됨                       |
| order      | Number        | -                     | 정렬 순서          |
| show       | Select        | -                     | 표시 여부          |

### Military Service 데이터베이스

| 프로퍼티명 | 프로퍼티 타입 | 타이포그래피 클래스   | 설명      |
| ---------- | ------------- | --------------------- | --------- |
| title      | Title         | `.text-details-title` | 병역 정보 |
| period     | Rich Text     | `.text-meta`          | 복무기간  |