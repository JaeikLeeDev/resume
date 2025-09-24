import { Client } from '@notionhq/client';
import { ResumeData, PersonalInfo, Skill, CoreCompetency, Experience, Project, Value, Tool } from '@/types';

// Notion 클라이언트 초기화
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// 데이터베이스 ID들 (환경변수에서 가져올 예정)
const DATABASE_IDS = {
    personalInfo: process.env.NOTION_PERSONAL_INFO_DB_ID || '',
    skills: process.env.NOTION_SKILLS_DB_ID || '',
    coreCompetencies: process.env.NOTION_CORE_COMPETENCIES_DB_ID || '',
    experiences: process.env.NOTION_EXPERIENCES_DB_ID || '',
    projects: process.env.NOTION_PROJECTS_DB_ID || '',
    values: process.env.NOTION_VALUES_DB_ID || '',
    tools: process.env.NOTION_TOOLS_DB_ID || '',
};

// 개인 정보 가져오기
export async function getPersonalInfo(): Promise<PersonalInfo> {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_IDS.personalInfo,
        });

        if (response.results.length === 0) {
            throw new Error('Personal info not found');
        }

        const page = response.results[0] as any;
        const properties = page.properties;

        return {
            name: properties.name?.title?.[0]?.text?.content || '',
            title: properties.title?.rich_text?.[0]?.text?.content || '',
            email: properties.email?.email || '',
            phone: properties.phone?.phone_number || '',
            location: properties.location?.rich_text?.[0]?.text?.content || '',
            github: properties.github?.url || '',
            linkedin: properties.linkedin?.url || '',
            website: properties.website?.url || '',
        };
    } catch (error) {
        console.error('Error fetching personal info:', error);
        throw error;
    }
}

// 기술 스택 가져오기
export async function getSkills(): Promise<Skill[]> {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_IDS.skills,
        });

        return response.results.map((page: any) => ({
            name: page.properties.name?.title?.[0]?.text?.content || '',
            category: page.properties.category?.select?.name || 'other',
            level: page.properties.level?.select?.name || 'intermediate',
        }));
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

// 핵심 역량 가져오기
export async function getCoreCompetencies(): Promise<CoreCompetency[]> {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_IDS.coreCompetencies,
        });

        return response.results.map((page: any) => ({
            title: page.properties.title?.title?.[0]?.text?.content || '',
            description: page.properties.description?.rich_text?.[0]?.text?.content || '',
            technologies: page.properties.technologies?.multi_select?.map((item: any) => item.name) || [],
            examples: page.properties.examples?.rich_text?.map((item: any) => item.text.content) || [],
        }));
    } catch (error) {
        console.error('Error fetching core competencies:', error);
        return [];
    }
}

// 업무 경험 가져오기
export async function getExperiences(): Promise<Experience[]> {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_IDS.experiences,
        });

        return response.results.map((page: any) => ({
            company: page.properties.company?.title?.[0]?.text?.content || '',
            position: page.properties.position?.rich_text?.[0]?.text?.content || '',
            period: page.properties.period?.rich_text?.[0]?.text?.content || '',
            description: page.properties.description?.rich_text?.[0]?.text?.content || '',
            achievements: page.properties.achievements?.rich_text?.map((item: any) => item.text.content) || [],
            technologies: page.properties.technologies?.multi_select?.map((item: any) => item.name) || [],
        }));
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }
}

// 프로젝트 경험 가져오기
export async function getProjects(): Promise<Project[]> {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_IDS.projects,
        });

        return response.results.map((page: any) => ({
            name: page.properties.name?.title?.[0]?.text?.content || '',
            description: page.properties.description?.rich_text?.[0]?.text?.content || '',
            period: page.properties.period?.rich_text?.[0]?.text?.content || '',
            technologies: page.properties.technologies?.multi_select?.map((item: any) => item.name) || [],
            features: page.properties.features?.rich_text?.map((item: any) => item.text.content) || [],
            github: page.properties.github?.url || '',
            demo: page.properties.demo?.url || '',
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

// 가치관 가져오기
export async function getValues(): Promise<Value[]> {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_IDS.values,
        });

        return response.results.map((page: any) => ({
            title: page.properties.title?.title?.[0]?.text?.content || '',
            description: page.properties.description?.rich_text?.[0]?.text?.content || '',
        }));
    } catch (error) {
        console.error('Error fetching values:', error);
        return [];
    }
}

// 개발 외 툴 가져오기
export async function getTools(): Promise<Tool[]> {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_IDS.tools,
        });

        return response.results.map((page: any) => ({
            name: page.properties.name?.title?.[0]?.text?.content || '',
            category: page.properties.category?.select?.name || '',
            description: page.properties.description?.rich_text?.[0]?.text?.content || '',
        }));
    } catch (error) {
        console.error('Error fetching tools:', error);
        return [];
    }
}

// 전체 이력서 데이터 가져오기
export async function getResumeData(): Promise<ResumeData> {
    try {
        const [
            personalInfo,
            skills,
            coreCompetencies,
            experiences,
            projects,
            values,
            tools,
        ] = await Promise.all([
            getPersonalInfo(),
            getSkills(),
            getCoreCompetencies(),
            getExperiences(),
            getProjects(),
            getValues(),
            getTools(),
        ]);

        return {
            personalInfo,
            skills,
            coreCompetencies,
            experiences,
            projects,
            values,
            tools,
        };
    } catch (error) {
        console.error('Error fetching resume data:', error);
        throw error;
    }
}
