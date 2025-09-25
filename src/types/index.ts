// Notion API에서 가져올 데이터 타입 정의
export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
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
    name: string;
    category: string; // Notion에서 자유롭게 설정 가능
    level: string; // Notion에서 자유롭게 설명 입력 가능
}

export interface CoreCompetency {
    title: string;
    description: string;
    technologies: string[];
    examples?: string[];
}

export interface Experience {
    company: string;
    position: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

export interface Project {
    name: string;
    description: string;
    period: string;
    technologies: string[];
    features: string[];
    github?: string;
    demo?: string;
}

export interface Value {
    title: string;
    description: string;
}

export interface Tool {
    name: string;
    category: string;
    description?: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    skills: Skill[];
    coreCompetencies: CoreCompetency[];
    experiences: Experience[];
    projects: Project[];
    values: Value[];
    tools: Tool[];
}
