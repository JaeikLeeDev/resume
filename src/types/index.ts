// 개인정보 타입
export interface PersonalInfoDB {
    name: string;
    position: string;
    email: string;
    phone: string;
    location: string;
    introduction?: string;
    github?: string;
    linkedin?: string;
    website?: string;
}

// Notion API 응답 타입
export interface NotionPage {
    id: string;
    properties: Record<string, any>;
}

export interface NotionDatabaseResponse {
    results: NotionPage[];
    has_more: boolean;
    next_cursor?: string;
}

// 기술 스택 타입
export interface SkillDB {
    skills: string[];
    title: string;
    order: number;
    show: 'show' | 'hide';
}

// 핵심 역량 타입
export interface CoreCompetencyDB {
    title: string;
    description: string;
    skills: string[];
    details?: string;
    order: number;
    show: 'show' | 'hide';
}

// 업무 경험 요약 타입
export interface WorkSummaryDB {
    company: string;
    position: string;
    period: string;
    description: string;
    order: number;
    show: 'show' | 'hide';
}

// 업무 경험 성과 타입 (회사별 그룹화 지원)
export interface WorkAchievementDB {
    title: string;
    details: string;
    skills: string[];
    company: string; // 어떤 회사의 성과인지 연결
    order: number;
    show: 'show' | 'hide';
}

// 프로젝트 타입
export interface ProjectDB {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string;
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
    remark?: string;
    order: number;
    show: 'show' | 'hide';
}

// 포트폴리오 타입
export interface PortfolioDB {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string;
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
    remark?: string;
    order: number;
    show: 'show' | 'hide';
}

// 가치관 타입
export interface ValueDB {
    title: string;
    details: string;
    order: number;
    show: 'show' | 'hide';
}

// 도구 타입
export interface OtherToolDB {
    title: string;
    category: string;
    description: string;
    order: number;
    show: 'show' | 'hide';
}

// 학력 타입
export interface EducationDB {
    title: string;
    degree: string;
    period: string;
    location: string;
    order: number;
    show: 'show' | 'hide';
}

// 자격증 타입
export interface CertificationDB {
    title: string;
    date: string;
    number: string;
    issuer: string;
    order: number;
    show: 'show' | 'hide';
}

// 병역 타입
export interface MilitaryServiceDB {
    title: string;
    period: string;
}

// 수상 경력 타입
export interface AwardDB {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string;
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
    remark?: string;
    order: number;
    show: 'show' | 'hide';
}

// 활동 경험 타입
export interface ActivityDB {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string;
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
    remark?: string;
    order: number;
    show: 'show' | 'hide';
}

// 기타 경험 타입
export interface OtherExperienceDB {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string;
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
    remark?: string;
    order: number;
    show: 'show' | 'hide';
}

// 전체 이력서 데이터 타입
export interface ResumeData {
    personalInfoDB: PersonalInfoDB;
    skillDB: SkillDB[];
    coreCompetencyDB: CoreCompetencyDB[];
    workSummaryDB: WorkSummaryDB[];
    workAchievementDB: WorkAchievementDB[];
    projectDB: ProjectDB[];
    portfolioDB: PortfolioDB[];
    awardDB: AwardDB[];
    activityDB: ActivityDB[];
    otherExperienceDB: OtherExperienceDB[];
    valueDB: ValueDB[];
    otherToolDB: OtherToolDB[];
    educationDB: EducationDB[];
    certificationDB: CertificationDB[];
    militaryServiceDB: MilitaryServiceDB | null;
}
