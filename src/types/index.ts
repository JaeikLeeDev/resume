// Notion API에서 가져올 데이터 타입 정의
export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    photo?: string;
    introduction?: string;
    github?: string;
    linkedin?: string;
    website?: string;
}

// Notion API 응답 타입들
export interface NotionPage {
    id: string;
    properties: Record<string, any>;
}

export interface NotionDatabaseResponse {
    results: NotionPage[];
    has_more: boolean;
    next_cursor?: string;
}

export interface Skill {
    name: string[]; // 쉼표로 구분된 기술들을 배열로 저장
    category: string; // Notion에서 자유롭게 설정 가능
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface CoreCompetency {
    title: string;
    description: string;
    skills: string[]; // Multi-select로 추가될 기술 스택
    examples?: string[];
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface Experience {
    company: string;
    position: string;
    period: string;
    description: string;
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface AchievementSection {
    name: string; // 소제목
    achievements: string[]; // 성과 목록
    skills: string[]; // 기술 스택 (Multi-select)
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface Project {
    name: string;
    description: string;
    period: string;
    skills: string[];
    features: string[];
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string; // 블로그 글 링크
    contribution?: string; // 기여도
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface Portfolio {
    name: string;
    description: string;
    period: string;
    skills: string[];
    features: string[];
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string; // 블로그 글 링크
    contribution?: string; // 기여도
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface Value {
    title: string;
    description: string[];
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface Tool {
    name: string; // 단일 텍스트로 변경
    category: string; // Select로 유지
    description: string; // 설명 추가
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
    location: string;
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface Certification {
    name: string;
    date: string;
    number: string;
    issuer: string;
    order: number; // 정렬 순서
    show: 'show' | 'hide'; // 표시 여부
}

export interface MilitaryService {
    name: string;
    period: string;
}

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
