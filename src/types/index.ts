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

export interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other';
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
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
