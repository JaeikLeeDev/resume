import { Client } from '@notionhq/client';
import { ResumeData, PersonalInfo, Skill, CoreCompetency, Experience, AchievementSection, Project, Portfolio, Value, Tool, Education, Certification, MilitaryService, NotionPage } from '@/types';
import type { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Notion 클라이언트 초기화
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// 범용적인 데이터베이스 ID 가져오기 함수
function getDatabaseId(key: string): string {
    return DATABASE_CONFIGS[key]?.id || '';
}

// 데이터베이스 설정 타입 정의
interface DatabaseConfig {
    id: string;
    name: string;
    required: boolean;
}

// 데이터베이스 설정
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
        .filter(([_, config]) => config.required && !config.id)
        .map(([key, _]) => key);

    if (missingVars.length > 0) {
        console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
        return false;
    }

    if (missingRequiredDbs.length > 0) {
        console.warn(`Missing required database IDs: ${missingRequiredDbs.join(', ')}`);
        return false;
    }

    return true;
}

// Notion 속성에서 텍스트 추출하는 헬퍼 함수
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

    return '';
}

// Notion 속성에서 배열 추출하는 헬퍼 함수
function extractArray(property: any): string[] {
    if (!property) return [];

    if (property.multi_select) {
        return property.multi_select.map((item: any) => item.name);
    }

    if (property.rich_text) {
        // Rich text의 경우 전체 텍스트를 하나로 합치고 세미콜론으로 분할
        const fullText = property.rich_text
            .map((item: any) => item.text?.content || '')
            .join('')
            .trim();

        if (fullText) {
            // 세미콜론(;)으로만 구분
            return fullText
                .split(';')
                .map((item: string) => item.trim())
                .filter((item: string) => item.length > 0);
        }
    }

    return [];
}

// Notion 페이지가 유효한 페이지 객체인지 확인하는 타입 가드
function isValidPageObject(item: any): item is PageObjectResponse {
    return item &&
        typeof item === 'object' &&
        'object' in item &&
        item.object === 'page' &&
        'properties' in item &&
        item.properties !== undefined;
}

// 속성 매핑 타입 정의
interface PropertyMapping {
    [key: string]: string; // Notion 속성명 -> 출력 필드명
}

// 데이터 타입별 속성 매핑 설정
const PROPERTY_MAPPINGS: Record<string, PropertyMapping> = {
    personalInfo: {
        name: 'name',
        title: 'title',
        email: 'email',
        phone: 'phone',
        location: 'location',
        github: 'github',
        linkedin: 'linkedin',
        website: 'website'
    },
    skills: {
        name: 'name',
        category: 'category'
    },
    coreCompetencies: {
        title: 'title',
        description: 'description',
        skills: 'skills',
        examples: 'examples'
    },
    experiences: {
        company: 'company',
        position: 'position',
        period: 'period',
        description: 'description'
    },
    achievementSections: {
        name: 'name',
        achievements: 'achievements',
        skills: 'skills'
    },
    projects: {
        name: 'name',
        description: 'description',
        period: 'period',
        skills: 'skills',
        features: 'features',
        github: 'github',
        website: 'website',
        ios: 'ios',
        android: 'android',
        post: 'post',
        contribution: 'contribution'
    },
    portfolio: {
        name: 'name',
        description: 'description',
        period: 'period',
        skills: 'skills',
        features: 'features',
        github: 'github',
        website: 'website',
        ios: 'ios',
        android: 'android',
        post: 'post',
        contribution: 'contribution'
    },
    values: {
        title: 'title',
        description: 'description'
    },
    tools: {
        name: 'name',
        category: 'category',
        description: 'description'
    },
    education: {
        institution: 'institution',
        degree: 'degree',
        period: 'period',
        location: 'location'
    },
    certifications: {
        name: 'name',
        date: 'date',
        number: 'number',
        issuer: 'issuer'
    },
    militaryService: {
        name: 'name',
        period: 'period'
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
            console.warn(`${config?.name || databaseKey} database ID not configured`);
            return [];
        }

        const response = await notion.dataSources.query({
            data_source_id: config.id,
        });

        const validPages = response.results.filter(isValidPageObject);

        if (transformFunction) {
            return validPages.map(transformFunction);
        }

        // 기본 변환 함수: 속성 매핑을 사용하여 객체 생성
        return validPages.map((page) => {
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
    } catch (error) {
        console.error(`Error fetching ${databaseKey}:`, error);
        return [];
    }
}

// 범용적인 데이터 가져오기 함수 (설정 기반)
export async function getDataByType<T>(
    dataType: string,
    customMapping?: PropertyMapping,
    customTransform?: (page: PageObjectResponse) => T
): Promise<T[]> {
    try {
        const mapping = customMapping || PROPERTY_MAPPINGS[dataType];
        if (!mapping) {
            throw new Error(`No property mapping found for data type: ${dataType}`);
        }

        return await queryDatabase(dataType, mapping, customTransform);
    } catch (error) {
        console.error(`Error fetching ${dataType} data:`, error);
        return [];
    }
}

// 모든 데이터베이스 상태 확인
export async function checkDatabaseStatus(): Promise<Record<string, { configured: boolean; name: string }>> {
    const status: Record<string, { configured: boolean; name: string }> = {};

    for (const [key, config] of Object.entries(DATABASE_CONFIGS)) {
        status[key] = {
            configured: !!config.id,
            name: config.name
        };
    }

    return status;
}

// 개인 정보 가져오기
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

// 기술 스택 가져오기 (Multi-select 전용)
export async function getSkills(): Promise<Skill[]> {
    try {
        return await queryDatabase('skills', PROPERTY_MAPPINGS.skills, (page) => {
            const nameProperty = page.properties.name;

            // Multi-select 속성에서 직접 배열 추출
            let skillsArray: string[] = [];

            if (nameProperty && 'multi_select' in nameProperty && nameProperty.multi_select) {
                // Multi-select에서 각 선택된 옵션의 이름을 추출
                skillsArray = nameProperty.multi_select
                    .map((item: any) => item.name)
                    .filter((name: string) => name && name.trim().length > 0);
            } else {
                // Multi-select가 아닌 경우 경고 로그
                console.warn('Skills name property is not multi-select. Please change to multi-select in Notion.');
                skillsArray = [];
            }

            return {
                name: skillsArray,
                category: (extractText(page.properties.category) as any) || 'other',
            };
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

// 핵심 역량 가져오기
export async function getCoreCompetencies(): Promise<CoreCompetency[]> {
    try {
        return await queryDatabase('coreCompetencies', PROPERTY_MAPPINGS.coreCompetencies, (page) => {
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
                description: extractText(page.properties.description),
                skills: skillsArray,
                examples: extractArray(page.properties.examples),
            };
        });
    } catch (error) {
        console.error('Error fetching core competencies:', error);
        return [];
    }
}

// 업무 경험 가져오기
export async function getExperiences(): Promise<Experience[]> {
    try {
        return await queryDatabase('experiences', PROPERTY_MAPPINGS.experiences);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }
}

// 성과 섹션 가져오기
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
                name: extractText(page.properties.name),
                achievements: extractArray(page.properties.achievements),
                skills: skillsArray,
            };
        });
    } catch (error) {
        console.error('Error fetching achievement sections:', error);
        return [];
    }
}

// 프로젝트 경험 가져오기
export async function getProjects(): Promise<Project[]> {
    try {
        return await queryDatabase('projects', PROPERTY_MAPPINGS.projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

// 포트폴리오 가져오기
export async function getPortfolio(): Promise<Portfolio[]> {
    try {
        return await queryDatabase('portfolio', PROPERTY_MAPPINGS.portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return [];
    }
}

// 가치관 가져오기
export async function getValues(): Promise<Value[]> {
    try {
        return await queryDatabase('values', PROPERTY_MAPPINGS.values, (page) => {
            const descriptionProperty = page.properties.description;
            const descriptionArray = descriptionProperty ? extractArray(descriptionProperty) : [];

            return {
                title: extractText(page.properties.title),
                description: descriptionArray
            };
        });
    } catch (error) {
        console.error('Error fetching values:', error);
        return [];
    }
}

// 개발 외 툴 가져오기
export async function getTools(): Promise<Tool[]> {
    try {
        return await queryDatabase('tools', PROPERTY_MAPPINGS.tools);
    } catch (error) {
        console.error('Error fetching tools:', error);
        return [];
    }
}

// 학력 가져오기
export async function getEducation(): Promise<Education[]> {
    try {
        return await queryDatabase('education', PROPERTY_MAPPINGS.education);
    } catch (error) {
        console.error('Error fetching education:', error);
        return [];
    }
}

// 자격증 가져오기
export async function getCertifications(): Promise<Certification[]> {
    try {
        return await queryDatabase('certifications', PROPERTY_MAPPINGS.certifications);
    } catch (error) {
        console.error('Error fetching certifications:', error);
        return [];
    }
}

// 병역 가져오기
export async function getMilitaryService(): Promise<MilitaryService | null> {
    try {
        const results = await queryDatabase('militaryService', PROPERTY_MAPPINGS.militaryService);
        return results.length > 0 ? results[0] as MilitaryService : null;
    } catch (error) {
        console.error('Error fetching military service:', error);
        return null;
    }
}

// 전체 이력서 데이터 가져오기
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
                name: '육군 | 병장 | 만기 전역',
                period: '2013.03 ~ 2014.12'
            },
        };
    } catch (error) {
        console.error('Error fetching resume data:', error);
        throw error;
    }
}

// Notion API 연결 테스트
export async function testNotionConnection(): Promise<boolean> {
    try {
        if (!process.env.NOTION_TOKEN) {
            throw new Error('NOTION_TOKEN 환경 변수가 설정되지 않았습니다.');
        }

        console.log('Testing Notion API connection...');
        console.log('Token format:', process.env.NOTION_TOKEN.substring(0, 10) + '...');

        const response = await fetch('https://api.notion.com/v1/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Notion API connection successful:', data);
        return true;
    } catch (error: any) {
        console.error('Notion API connection failed:', error);

        // 더 자세한 에러 정보 제공
        if (error.message?.includes('401')) {
            throw new Error('Notion API 토큰이 유효하지 않습니다. Integration Token을 확인해주세요.');
        } else if (error.message?.includes('403')) {
            throw new Error('Notion API 접근이 제한되었습니다. Integration이 올바르게 설정되었는지 확인해주세요.');
        } else if (error.message?.includes('<!DOCTYPE')) {
            throw new Error('Notion API가 HTML을 반환했습니다. 토큰이 잘못되었거나 Integration이 비활성화되었을 수 있습니다.');
        } else if (error.message?.includes('fetch')) {
            throw new Error('네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.');
        } else {
            throw new Error(`Notion API 연결 실패: ${error.message || '알 수 없는 오류'}`);
        }
    }
}
