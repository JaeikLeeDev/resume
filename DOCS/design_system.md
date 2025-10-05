# 🎨 디자인 시스템

## 타이포그래피 클래스 목록

| 클래스명                 | 폰트 크기       | 폰트 웨이트 | 라인 높이 | 마진 하단 | 주 사용처                                                                                                   |
| ------------------------ | --------------- | ----------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `.text-hero`             | 2.5rem (40px)   | 800         | 1.2       | 2rem      | Personal Info > name                                                                                        |
| `.text-section-title`    | 2.25rem (36px)  | 700         | 1.2       | 2rem      | 모든 섹션 제목                                                                                              |
| `.text-subsection-title` | 1.625rem (26px) | 600         | 1.4       | 1rem      | • Project/Portfolio > title<br>• Work Summary > company/position                                            |
| `.text-details-title`    | 1.25rem (20px)  | 600         | 1.3       | 0.5rem    | • details-section의 제목<br>• 모든 DB의 title 필드<br>• Education > title+degree<br>• Other Tool > category |
| `.text-secondary-title`  | 1.125rem (18px) | 500         | 1.4       | 0.5rem    | • Personal Info > position<br>• Other Tool > title                                                          |
| `.text-body`             | 1rem (16px)     | 400         | 1.6       | 1rem      | • 모든 DB의 description 필드<br>• Personal Info > introduction<br>• 모든 details 필드                       |
| `.text-meta`             | 0.875rem (14px) | 400         | 1.4       | 1rem      | • 모든 DB의 period 필드<br>• Project > contribution<br>• Personal Info의 라벨 (Email., Phone. 등)           |
| `.text-contact`          | 0.9rem (14.4px) | 400         | 1.6       | 0         | • Personal Info > email/phone/blog/github (contact-row 내부)                                                |
| `.list-item`             | 1rem (16px)     | 400         | 1.6       | 0.375rem  | • 모든 details 필드 (bullet point)                                                                           |
| `.tech-chip`             | 0.75rem (12px)  | 400         | 1.4       | 0         | • 모든 DB의 skills 필드                                                                                     |

## 컴포넌트 시스템

| 클래스명          | 스타일 속성     | 주 사용처                                            |
| ----------------- | --------------- | ---------------------------------------------------- |
| `.link`           | 링크 스타일     | 모든 외부 링크 (GitHub, Website, iOS, Android, Post) |
| `.list`           | 리스트 컨테이너 | bullet point 리스트 컨테이너                         |
| `.tech-container` | 플렉스 컨테이너 | 기술 스택 칩들을 감싸는 컨테이너                     |

## 유틸리티 클래스

| 클래스명             | 스타일 속성                                   | 주 사용처                      |
| -------------------- | --------------------------------------------- | ------------------------------ |
| `.text-pre-line`     | white-space: pre-line                         | 줄바꿈이 포함된 텍스트         |
| `.margin-top-xxs`    | margin-top: 0.375rem                          | 최소 상단 마진                 |
| `.margin-top-sm`     | margin-top: 1rem                              | 중간 상단 마진                 |
| `.margin-bottom-xxs` | margin-bottom: 0.375rem                       | 최소 하단 마진                 |
| `.margin-bottom-lg`  | margin-bottom: 2rem                           | 큰 하단 마진                   |
| `.flex-between`      | display: flex, justify-content: space-between | 양쪽 정렬 플렉스 레이아웃      |
| `.center-section`    | text-align: center, border-top                | 중앙 정렬된 섹션 (PDF 링크 등) |
| `.page-break-before` | page-break-before: always                     | PDF에서 페이지 브레이크        |
| `.resume-container`  | box-shadow: none                              | 이력서 컨테이너 (그림자 제거)  |

## 레이아웃 시스템

| 클래스명                | 마진 하단 | 주 사용처                                     |
| ----------------------- | --------- | --------------------------------------------- |
| `.section`              | 6rem      | 모든 섹션 (Skill, Work Summary, Project 등)   |
| `.personal-info-section`| -         | 개인정보 섹션 (이름, 연락처, 소개)            |
| `.details-section`      | 1rem      | 섹션 내 개별 항목 (프로젝트, 학력, 자격증 등) |
| `.contact-container`    | -         | 연락처 정보 컨테이너 (프로필 사진 + 연락처)   |
| `.contact-details`      | -         | 연락처 세부 정보 (이메일, 전화번호, 링크)     |
| `.contact-row`          | -         | 연락처 개별 행 (라벨 + 값)                    |
| `.photo-container`      | -         | 프로필 사진 컨테이너                          |
| `.work-experience-item` | -         | 업무 경험 항목 (회사명 + 직책 + 설명)         |
| `.work-experience-left` | -         | 업무 경험 좌측 (회사명, 기간)                 |
| `.work-experience-right`| -         | 업무 경험 우측 (직책, 설명, 성과)             |
| `.work-period-desktop`  | -         | 데스크톱용 업무 기간 표시                     |
| `.work-position-period-mobile` | -    | 모바일용 직책+기간 표시                       |
| `.tech-container`       | -         | 기술 스택 칩들을 감싸는 플렉스 컨테이너       |
| `.skill-separator`      | -         | 기술 스택 구분자 (쉼표, 슬래시 등)           |

## 폰트 패밀리

- **주요 폰트**: Pretendard (한글 최적화)
- **코드/기술 스택**: JetBrains Mono, SF Mono, Monaco, Cascadia Code, Roboto Mono, Consolas, Courier New
- **폴백**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif
- **전체 폰트 스택**: 'Pretendard', var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif

## 색상 시스템

- **Primary**: #000000 (주요 텍스트)
- **Secondary**: #666666 (보조 텍스트)
- **Tertiary**: #999999 (메타 정보)
- **Accent**: #4A90E2 (섹션 제목)

## 간격 시스템

- **XXS**: 0.375rem (6px) - 최소 간격
- **XS**: 0.5rem (8px) - 작은 간격
- **SM**: 1rem (16px) - 중간 간격
- **MD**: 1.5rem (24px) - 큰 간격
- **LG**: 2rem (32px) - 매우 큰 간격
- **XL**: 3rem (48px) - 섹션 간격
- **2XL**: 4rem (64px) - 주요 섹션 간격
- **3XL**: 6rem (96px) - 페이지 섹션 간격

## 특별한 스타일링

- **Letter Spacing**: -0.01em ~ -0.03em (폰트 크기에 따라 조정)
- **Font Smoothing**: antialiased (macOS), grayscale (Windows)
- **Bullet Points**: CSS `::before` 가상 요소로 구현
- **Links**: 밑줄 스타일, hover 시 색상 변경 (`.link` 클래스)
- **Tech Chips**: 둥근 모서리, 배경색, 패딩 적용
- **Contact Links**: 밑줄 없음, hover 시 색상 변경 (`.text-contact.link`)
- **Pre-line Text**: 줄바꿈 보존 (`.text-pre-line` 클래스)
- **Responsive Design**: 모바일에서 Work Experience position 중복 방지

## CSS 구조 개선

- **논리적 그룹화**: CSS Variables → Base Styles → Typography → Layout → Components → Utility Classes → Responsive → PDF Mode
- **위계순 정렬**: 타이포그래피 클래스들을 위계에 따라 정렬 (Hero → Section → Subsection → Details → Body → Meta)
- **인라인 스타일 최소화**: 자주 사용되는 스타일을 CSS 클래스로 추출
- **유틸리티 클래스**: 마진, 플렉스 레이아웃, 텍스트 처리 등 재사용 가능한 유틸리티 제공
- **반응형 디자인**: 모바일(768px), 소형 모바일(480px) 브레이크포인트 지원
- **PDF 모드**: 2열 레이아웃과 페이지 브레이크 최적화