// 개인정보 타입
export interface PersonalInfo {
    name: string;
    position: string;
    email: string;
    phone: string;
    location: string;
    photo?: string;
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
export interface Skill {
    skills: string[];
    title: string;
    order: number;
    show: 'show' | 'hide';
}

// 핵심 역량 타입
export interface CoreCompetency {
    title: string;
    description: string;
    skills: string[];
    details?: string[];
    order: number;
    show: 'show' | 'hide';
}

// 업무 경험 타입
export interface Experience {
    company: string;
    position: string;
    period: string;
    description: string;
    order: number;
    show: 'show' | 'hide';
}

// 성과 섹션 타입
export interface AchievementSection {
    title: string;
    achievements: string;
    skills: string[];
    order: number;
    show: 'show' | 'hide';
}

// 프로젝트 타입
export interface Project {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string[];
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
    contribution?: string;
    order: number;
    show: 'show' | 'hide';
}

// 포트폴리오 타입
export interface Portfolio {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string[];
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
    contribution?: string;
    order: number;
    show: 'show' | 'hide';
}

// 가치관 타입
export interface Value {
    title: string;
    detail: string;
    order: number;
    show: 'show' | 'hide';
}

// 도구 타입
export interface Tool {
    title: string;
    category: string;
    description: string;
    order: number;
    show: 'show' | 'hide';
}

// 학력 타입
export interface Education {
    title: string;
    degree: string;
    period: string;
    location: string;
    order: number;
    show: 'show' | 'hide';
}

// 자격증 타입
export interface Certification {
    title: string;
    date: string;
    number: string;
    issuer: string;
    order: number;
    show: 'show' | 'hide';
}

// 병역 타입
export interface MilitaryService {
    title: string;
    period: string;
}

// 전체 이력서 데이터 타입
export interface ResumeData {
    personalInfo: PersonalInfo;
    skills: Skill[];
    coreCompetencies: CoreCompetency[];
    experiences: Experience[];
    achievementSections: AchievementSection[];
    projects: Project[];
    portfolio: Portfolio[];
    values: Value[];
    tools: Tool[];
    education: Education[];
    certifications: Certification[];
    militaryService: MilitaryService;
}
