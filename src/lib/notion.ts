import { Client } from '@notionhq/client';
import { ResumeData, PersonalInfo, Skill, CoreCompetency, Experience, AchievementSection, Project, Portfolio, Value, Tool, Education, Certification, MilitaryService } from '@/types';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Notion API 클라이언트 초기화
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// 정렬을 위한 기본값
const DEFAULT_ORDER_VALUE = 999;


// Notion 데이터베이스 설정을 위한 타입 정의
interface DatabaseConfig {
    id: string;
    name: string;
    required: boolean;
}

// Notion 데이터베이스 ID 설정 (환경변수에서 가져옴)
const DATABASE_CONFIGS: Record<string, DatabaseConfig> = {
    personalInfo: {
        id: process.env.NOTION_PERSONAL_INFO_DB_ID || '',
        name: 'Personal Info',
        required: true
    },
    skills: {
        id: process.env.NOTION_SKILLS_DB_ID || '',
        name: 'Skills',
        required: false
    },
    coreCompetencies: {
        id: process.env.NOTION_CORE_COMPETENCIES_DB_ID || '',
        name: 'Core Competencies',
        required: false
    },
    experiences: {
        id: process.env.NOTION_EXPERIENCES_DB_ID || '',
        name: 'Experiences',
        required: false
    },
    achievementSections: {
        id: process.env.NOTION_ACHIEVEMENT_SECTIONS_DB_ID || '',
        name: 'Achievement Sections',
        required: false
    },
    projects: {
        id: process.env.NOTION_PROJECTS_DB_ID || '',
        name: 'Projects',
        required: false
    },
    portfolio: {
        id: process.env.NOTION_PORTFOLIO_DB_ID || '',
        name: 'Portfolio',
        required: false
    },
    values: {
        id: process.env.NOTION_VALUES_DB_ID || '',
        name: 'Values',
        required: false
    },
    tools: {
        id: process.env.NOTION_TOOLS_DB_ID || '',
        name: 'Tools',
        required: false
    },
    education: {
        id: process.env.NOTION_EDUCATION_DB_ID || '',
        name: 'Education',
        required: false
    },
    certifications: {
        id: process.env.NOTION_CERTIFICATIONS_DB_ID || '',
        name: 'Certifications',
        required: false
    },
    militaryService: {
        id: process.env.NOTION_MILITARY_SERVICE_DB_ID || '',
        name: 'Military Service',
        required: false
    }
};

// 환경 변수 검증
function validateEnvironmentVariables() {
    const requiredVars = ['NOTION_TOKEN'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    // 필수 데이터베이스 ID 검증
    const missingRequiredDbs = Object.entries(DATABASE_CONFIGS)
        .filter(([, config]) => config.required && !config.id)
        .map(([key]) => key);

    if (missingVars.length > 0) {
        return false;
    }

    if (missingRequiredDbs.length > 0) {
        return false;
    }

    return true;
}

// Notion 속성에서 텍스트 추출
function extractText(property: any): string {
    if (!property) return '';

    if (property.title) {
        return property.title
            .map((item: any) => item.text?.content || '')
            .join('')
            .trim();
    }

    if (property.rich_text) {
        return property.rich_text
            .map((item: any) => item.text?.content || '')
            .join('')
            .trim();
    }

    if (property.select) {
        return property.select.name || '';
    }

    if (property.email) {
        return property.email || '';
    }

    if (property.phone_number) {
        return property.phone_number || '';
    }

    if (property.url) {
        return property.url || '';
    }

    if (property.number !== undefined && property.number !== null) {
        return property.number.toString();
    }

    // Notion 파일 속성에서 이미지 URL 추출
    if (property.files && property.files.length > 0) {
        const file = property.files[0];
        if (file.type === 'external' && file.external?.url) {
            return file.external.url;
        }
        if (file.type === 'file' && file.file?.url) {
            return file.file.url;
        }
    }

    return '';
}

// Notion 속성에서 배열 추출
function extractArray(property: any): string[] {
    if (!property) return [];

    if (property.multi_select) {
        return property.multi_select.map((item: any) => item.name);
    }

    if (property.rich_text) {
        const fullText = property.rich_text
            .map((item: any) => item.text?.content || '')
            .join('')
            .trim();

        if (fullText) {
            return fullText
                .split(';')
                .map((item: string) => item.trim())
                .filter((item: string) => item.length > 0);
        }
    }

    return [];
}

// Notion 페이지 유효성 검사
function isValidPageObject(item: any): item is PageObjectResponse {
    return item &&
        typeof item === 'object' &&
        'object' in item &&
        item.object === 'page' &&
        'properties' in item &&
        item.properties !== undefined;
}

// 속성 매핑 타입
interface PropertyMapping {
    [key: string]: string;
}

// 데이터 타입별 속성 매핑
// 주석은 <설명>(<Notion property 타입>) 형식으로 작성했습니다.
//
const PROPERTY_MAPPINGS: Record<string, PropertyMapping> = {
    personalInfo: {
        name: 'name', // 이름 (Title)
        position: 'position', // 직책/포지션 (Rich Text)
        email: 'email', // 이메일 (Email)
        phone: 'phone', // 전화번호 (Phone Number)
        location: 'location', // 위치 (Rich Text)
        photo: 'photo', // 프로필 사진 (Files & media)
        introduction: 'introduction', // 짧은 소개 (Rich Text)
        github: 'github', // 깃허브 (URL)
        linkedin: 'linkedin', // 링크드인 (URL)
        website: 'website', // 웹사이트 (URL)
    },
    skills: {
        skills: 'skills', // 기술 스택 (Multi-select)
        title: 'title', // 카테고리 (Title)
        order: 'order', // 정렬 순서 (Number)
        show: 'show', // 표시 여부 (Select)
    },
    coreCompetencies: {
        title: 'title', // 제목 (Title)
        description: 'description', // 설명 (Rich Text)
        skills: 'skills', // 관련 기술 스택 (Multi-select)
        details: 'details', // 사례, bullet point 설명 (Rich Text)
        order: 'order',
        show: 'show',
    },
    // 업무 경험 - intro
    experiences: {
        company: 'company', // 회사 (Title)
        position: 'position', // 직책 (Rich Text)
        period: 'period', // 근무 기간 (Rich Text)
        description: 'description', // 회사 설명 (Rich Text)
        order: 'order',
        show: 'show'
    },
    // 업무 경험 - 성과 나열
    achievementSections: {
        title: 'title', // 성과 소제목 (Title)
        details: 'details', // 성과 디테일 (Rich Text)
        skills: 'skills', // 해당 성과 관련 기술 스택 (Multi-select)
        order: 'order',
        show: 'show'
    },
    projects: {
        title: 'title', // 프로젝트 제목 (Title)
        description: 'description', // 프로젝트 설명 (Rich Text)
        period: 'period', // 개발 기간 (Rich Text)
        skills: 'skills', // 사용한 기술 스택 (Multi-select)
        details: 'details', // 성과 상세 (Rich Text)
        contribution: 'contribution', // 기여도 정보 (Rich Text)
        github: 'github',   // GitHub 저장소 링크 (URL)
        website: 'website',
        ios: 'ios', // iOS 앱스토어 링크 (URL)
        android: 'android', // Android 플레이스토어 링크 (URL)
        post: 'post', // 블로그 글 링크 (URL)
        order: 'order',
        show: 'show'
    },
    portfolio: {
        title: 'title', // 포트폴리오 제목 (Title)
        description: 'description', // 포트폴리오 설명 (Rich Text)
        period: 'period', // 개발 기간 (Rich Text)
        skills: 'skills', // 사용한 기술 스택 (Multi-select)
        details: 'details', // 주요 기능들 (Rich Text)
        github: 'github', // GitHub 저장소 링크 (URL)
        website: 'website', // 웹사이트 링크 (URL)
        ios: 'ios', // iOS 앱스토어 링크 (URL)
        android: 'android', // Android 플레이스토어 링크 (URL)
        post: 'post', // 블로그 글 링크 (URL)
        contribution: 'contribution', // 기여도 정보 (Rich Text)
        order: 'order',
        show: 'show'
    },
    values: {
        title: 'title', // 가치관 제목 (Title)
        detail: 'detail', // 상세 내용 (Rich Text)
        order: 'order',
        show: 'show'
    },
    tools: {
        title: 'title',         // 도구명 (Select)
        category: 'category',  // 카테고리 (Title)
        description: 'description', // 숙련도 및 경험 설명 (Rich Text)
        order: 'order',
        show: 'show'
    },
    education: {
        title: 'title', // 학교명 (Title)
        degree: 'degree', // 학위/전공 (Rich Text)
        period: 'period', // 학력 기간 (Rich Text)
        location: 'location', // 위치 (Rich Text)
        order: 'order',
        show: 'show'
    },
    certifications: {
        title: 'title', // 자격증명 (Title)
        date: 'date', // 취득일 (Rich Text)
        number: 'number', // 자격증 번호 (Rich Text)
        issuer: 'issuer', // 발행기관 (Rich Text)
        order: 'order',
        show: 'show'
    },
    militaryService: {
        title: 'title', // 병역 정보 (Rich Text)
        period: 'period' // 복무기간 (Rich Text)
    }
};

// 범용적인 데이터베이스 쿼리 함수
async function queryDatabase(
    databaseKey: string,
    propertyMapping: PropertyMapping,
    transformFunction?: (page: PageObjectResponse) => any
): Promise<any[]> {
    try {
        const config = DATABASE_CONFIGS[databaseKey];
        if (!config?.id) {
            return [];
        }

        const response = await notion.dataSources.query({
            data_source_id: config.id,
        });

        const validPages = response.results.filter(isValidPageObject);

        let results: any[];

        if (transformFunction) {
            results = validPages.map(transformFunction);
        } else {
            // Notion 속성을 우리 타입에 맞게 변환
            results = validPages.map((page) => {
                const result: any = {};
                for (const [notionProperty, outputField] of Object.entries(propertyMapping)) {
                    const property = page.properties[notionProperty];
                    if (property) {
                        // 배열 속성인지 동적으로 확인
                        if ('multi_select' in property || 'rich_text' in property) {
                            result[outputField] = extractArray(property);
                        } else {
                            result[outputField] = extractText(property);
                        }
                    }
                }
                return result;
            });
        }

        // order 프로퍼티가 있으면 정렬
        if (propertyMapping.order) {
            return results.sort((a, b) => {
                const orderA = typeof a.order === 'number' ? a.order : (parseInt(a.order) || DEFAULT_ORDER_VALUE);
                const orderB = typeof b.order === 'number' ? b.order : (parseInt(b.order) || DEFAULT_ORDER_VALUE);
                return orderA - orderB;
            });
        }

        return results;
    } catch (error) {
        console.error(`Error fetching ${databaseKey}:`, error);
        return [];
    }
}


// Notion에서 개인정보 데이터 조회
export async function getPersonalInfo(): Promise<PersonalInfo> {
    try {
        if (!validateEnvironmentVariables()) {
            throw new Error('Missing required environment variables');
        }

        const results = await queryDatabase('personalInfo', PROPERTY_MAPPINGS.personalInfo);

        if (results.length === 0) {
            throw new Error('Personal info not found');
        }

        return results[0] as PersonalInfo;
    } catch (error) {
        console.error('Error fetching personal info:', error);
        throw error;
    }
}

// Notion에서 기술 스택 데이터 조회
export async function getSkills(): Promise<Skill[]> {
    try {
        return await queryDatabase('skills', PROPERTY_MAPPINGS.skills, (page) => {
            return {
                skills: extractArray(page.properties.skills),
                title: extractText(page.properties.title) || 'other',
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

// Notion에서 핵심 역량 데이터 조회
export async function getCoreCompetencies(): Promise<CoreCompetency[]> {
    try {
        return await queryDatabase('coreCompetencies', PROPERTY_MAPPINGS.coreCompetencies, (page) => {
            return {
                title: extractText(page.properties.title),
                description: extractText(page.properties.description),
                skills: extractArray(page.properties.skills),
                details: extractArray(page.properties.details),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching core competencies:', error);
        return [];
    }
}

// Notion에서 업무 경험 데이터 조회
export async function getExperiences(): Promise<Experience[]> {
    try {
        return await queryDatabase('experiences', PROPERTY_MAPPINGS.experiences, (page) => {
            return {
                company: extractText(page.properties.company),
                position: extractText(page.properties.position),
                period: extractText(page.properties.period),
                description: extractText(page.properties.description),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }
}

// Notion에서 성과 섹션 데이터 조회
export async function getAchievementSections(): Promise<AchievementSection[]> {
    try {
        return await queryDatabase('achievementSections', PROPERTY_MAPPINGS.achievementSections, (page) => {
            const skillsProperty = page.properties.skills;
            let skillsArray: string[] = [];

            // Multi-select 속성에서 skills 추출
            if (skillsProperty && 'multi_select' in skillsProperty && skillsProperty.multi_select) {
                skillsArray = skillsProperty.multi_select
                    .map((item: any) => item.name)
                    .filter((name: string) => name && name.trim().length > 0);
            }

            return {
                title: extractText(page.properties.title),
                detail: extractText(page.properties.details),
                skills: skillsArray,
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching achievement sections:', error);
        return [];
    }
}

// Notion에서 프로젝트 경험 데이터 조회
export async function getProjects(): Promise<Project[]> {
    try {
        return await queryDatabase('projects', PROPERTY_MAPPINGS.projects, (page) => {
            return {
                title: extractText(page.properties.title),
                description: extractText(page.properties.description),
                period: extractText(page.properties.period),
                skills: extractArray(page.properties.skills),
                details: extractArray(page.properties.details),
                github: extractText(page.properties.github),
                website: extractText(page.properties.website),
                ios: extractText(page.properties.ios),
                android: extractText(page.properties.android),
                post: extractText(page.properties.post),
                contribution: extractText(page.properties.contribution),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

// Notion에서 포트폴리오 데이터 조회
export async function getPortfolio(): Promise<Portfolio[]> {
    try {
        return await queryDatabase('portfolio', PROPERTY_MAPPINGS.portfolio, (page) => {
            return {
                title: extractText(page.properties.title),
                description: extractText(page.properties.description),
                period: extractText(page.properties.period),
                skills: extractArray(page.properties.skills),
                details: extractArray(page.properties.details),
                github: extractText(page.properties.github),
                website: extractText(page.properties.website),
                ios: extractText(page.properties.ios),
                android: extractText(page.properties.android),
                post: extractText(page.properties.post),
                contribution: extractText(page.properties.contribution),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return [];
    }
}

// Notion에서 가치관 데이터 조회
export async function getValues(): Promise<Value[]> {
    try {
        return await queryDatabase('values', PROPERTY_MAPPINGS.values, (page) => {
            return {
                title: extractText(page.properties.title),
                detail: extractText(page.properties.detail),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching values:', error);
        return [];
    }
}

// Notion에서 개발 외 툴 데이터 조회
export async function getTools(): Promise<Tool[]> {
    try {
        return await queryDatabase('tools', PROPERTY_MAPPINGS.tools, (page) => {
            return {
                title: extractText(page.properties.title),
                category: extractText(page.properties.category),
                description: extractText(page.properties.description),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching tools:', error);
        return [];
    }
}

// Notion에서 학력 데이터 조회
export async function getEducation(): Promise<Education[]> {
    try {
        return await queryDatabase('education', PROPERTY_MAPPINGS.education, (page) => {
            return {
                title: extractText(page.properties.title),
                degree: extractText(page.properties.degree),
                period: extractText(page.properties.period),
                location: extractText(page.properties.location),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching education:', error);
        return [];
    }
}

// Notion에서 자격증 데이터 조회
export async function getCertifications(): Promise<Certification[]> {
    try {
        return await queryDatabase('certifications', PROPERTY_MAPPINGS.certifications, (page) => {
            return {
                title: extractText(page.properties.title),
                date: extractText(page.properties.date),
                number: extractText(page.properties.number),
                issuer: extractText(page.properties.issuer),
                order: parseInt(extractText(page.properties.order)) || DEFAULT_ORDER_VALUE,
                show: extractText(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching certifications:', error);
        return [];
    }
}

// Notion에서 병역 데이터 조회
export async function getMilitaryService(): Promise<MilitaryService | null> {
    try {
        const results = await queryDatabase('militaryService', PROPERTY_MAPPINGS.militaryService);
        return results.length > 0 ? results[0] as MilitaryService : null;
    } catch (error) {
        console.error('Error fetching military service:', error);
        return null;
    }
}

// Notion에서 모든 이력서 데이터를 통합 조회
export async function getResumeData(): Promise<ResumeData> {
    try {
        if (!validateEnvironmentVariables()) {
            throw new Error('Missing required environment variables for Notion integration');
        }

        const [
            personalInfo,
            skills,
            coreCompetencies,
            experiences,
            achievementSections,
            projects,
            portfolio,
            values,
            tools,
            education,
            certifications,
            militaryService,
        ] = await Promise.all([
            getPersonalInfo(),
            getSkills(),
            getCoreCompetencies(),
            getExperiences(),
            getAchievementSections(),
            getProjects(),
            getPortfolio(),
            getValues(),
            getTools(),
            getEducation(),
            getCertifications(),
            getMilitaryService(),
        ]);

        return {
            personalInfo,
            skills,
            coreCompetencies,
            experiences,
            achievementSections,
            projects,
            portfolio,
            values,
            tools,
            education,
            certifications,
            militaryService: militaryService || {
                title: '병역 정보 없음',
                period: '정보 없음'
            },
        };
    } catch (error) {
        console.error('Error fetching resume data:', error);
        throw error;
    }
}

