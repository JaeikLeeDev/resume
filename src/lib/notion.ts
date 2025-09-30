import { Client } from '@notionhq/client';
import { ResumeData, PersonalInfoDB, SkillDB, CoreCompetencyDB, WorkSummaryDB, WorkAchievementDB, ProjectDB, PortfolioDB, ValueDB, OtherToolDB, EducationDB, CertificationDB, MilitaryServiceDB } from '@/types';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { downloadAndSaveImage, isNotionImageUrl } from './image-downloader';

// Notion API 클라이언트 초기화
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// 정렬을 위한 기본값
const DEFAULT_ORDER_VALUE = 999;

/**
 * Notion 이미지 URL을 안전하게 처리하는 함수
 * Build-time에 이미지를 다운로드하여 정적 파일로 저장
 */
async function processImageUrl(url: string | null): Promise<string | null> {
    if (!url) return null;

    // Notion 이미지 URL인지 확인
    if (isNotionImageUrl(url)) {
        console.log(`🔄 Processing Notion image: ${url}`);

        // Build-time에 이미지 다운로드하여 저장
        const staticPath = await downloadAndSaveImage(url);

        if (staticPath) {
            console.log(`✅ Image processed: ${url} → ${staticPath}`);
            return staticPath;
        } else {
            console.warn(`❌ Failed to process image: ${url}`);
            return null;
        }
    }

    return url;
}


// Notion 데이터베이스 설정을 위한 타입 정의
interface DatabaseConfig {
    id: string;
    name: string;
    required: boolean;
}

// Notion 데이터베이스 ID 설정 (환경변수에서 가져옴)
const DATABASE_CONFIGS: Record<string, DatabaseConfig> = {
    personalInfoDB: {
        id: process.env.NOTION_PERSONAL_INFO_DB_ID || '',
        name: 'Personal Info',
        required: true
    },
    skillDB: {
        id: process.env.NOTION_SKILL_DB_ID || '',
        name: 'Skill',
        required: false
    },
    coreCompetencyDB: {
        id: process.env.NOTION_CORE_COMPETENCY_DB_ID || '',
        name: 'Core Competency',
        required: false
    },
    workSummaryDB: {
        id: process.env.NOTION_WORK_SUMMARY_DB_ID || '',
        name: 'Work Summary',
        required: false
    },
    workAchievementDB: {
        id: process.env.NOTION_WORK_ACHIEVEMENT_DB_ID || '',
        name: 'Work Achievement',
        required: false
    },
    projectDB: {
        id: process.env.NOTION_PROJECT_DB_ID || '',
        name: 'Project',
        required: false
    },
    portfolioDB: {
        id: process.env.NOTION_PORTFOLIO_DB_ID || '',
        name: 'Portfolio',
        required: false
    },
    valueDB: {
        id: process.env.NOTION_VALUE_DB_ID || '',
        name: 'Value',
        required: false
    },
    otherToolDB: {
        id: process.env.NOTION_OTHER_TOOL_DB_ID || '',
        name: 'Other Tool',
        required: false
    },
    educationDB: {
        id: process.env.NOTION_EDUCATION_DB_ID || '',
        name: 'Education',
        required: false
    },
    certificationDB: {
        id: process.env.NOTION_CERTIFICATION_DB_ID || '',
        name: 'Certification',
        required: false
    },
    militaryServiceDB: {
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

// Notion Title 프로퍼티에서 텍스트 추출
function extractTitle(property: any): string {
    if (!property || !property.title) return '';
    return property.title
        .map((item: any) => item.text?.content || '')
        .join('')
        .trim();
}

// Notion Rich Text 프로퍼티에서 텍스트 추출 (대시로 구분된 bullet point 지원)
function extractRichText(property: any): string {
    if (!property || !property.rich_text) return '';

    const fullText = property.rich_text
        .map((item: any) => item.text?.content || '')
        .join('')
        .trim();

    if (fullText) {
        // 문장을 줄바꿈으로 분리하고, 각 줄을 처리
        const lines = fullText.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0);

        // 각 줄이 '- '로 시작하면 bullet point로 처리
        const processedLines = lines.map((line: string) => {
            if (line.startsWith('- ')) {
                return line.substring(2).trim(); // '- ' 제거하고 앞뒤 공백 제거
            }
            return line;
        });

        // bullet point가 있는 경우와 없는 경우를 구분
        const hasBulletPoints = lines.some((line: string) => line.startsWith('- '));

        if (hasBulletPoints) {
            // bullet point가 있는 경우: HTML 형태로 반환
            const bulletItems = lines
                .filter((line: string) => line.startsWith('- '))
                .map((line: string) => line.substring(2).trim())
                .filter((line: string) => line.length > 0);

            if (bulletItems.length > 0) {
                return `BULLET_LIST:${JSON.stringify(bulletItems)}`;
            }
        }

        // bullet point가 없는 경우: 일반 텍스트로 반환
        return fullText;
    }

    return '';
}

// Notion Multi-select 프로퍼티에서 배열 추출
function extractMultiSelect(property: any): string[] {
    if (!property || !property.multi_select) return [];
    return property.multi_select.map((item: any) => item.name);
}

// Notion Select 프로퍼티에서 텍스트 추출
function extractSelect(property: any): string {
    if (!property || !property.select) return '';
    return property.select.name || '';
}

// Notion Email 프로퍼티에서 텍스트 추출
function extractEmail(property: any): string {
    if (!property || !property.email) return '';
    return property.email || '';
}

// Notion Phone Number 프로퍼티에서 텍스트 추출
function extractPhoneNumber(property: any): string {
    if (!property || !property.phone_number) return '';
    return property.phone_number || '';
}

// Notion URL 프로퍼티에서 텍스트 추출
function extractUrl(property: any): string {
    if (!property || !property.url) return '';
    return property.url || '';
}

// Notion Number 프로퍼티에서 숫자 추출
function extractNumber(property: any): number {
    if (!property || property.number === undefined || property.number === null) return 0;
    return property.number;
}

// Notion Files 프로퍼티에서 파일 URL 추출
async function extractFiles(property: any): Promise<string> {
    if (!property || !property.files || property.files.length === 0) return '';

    const file = property.files[0];
    let url = '';

    if (file.type === 'external' && file.external?.url) {
        url = file.external.url;
    } else if (file.type === 'file' && file.file?.url) {
        url = file.file.url;
    }

    // 이미지 URL 처리 (Build-time 다운로드)
    const processedUrl = await processImageUrl(url);
    return processedUrl || '';
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
    personalInfoDB: {
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
    skillDB: {
        skills: 'skills', // 기술 스택 (Multi-select)
        title: 'title', // 카테고리 (Title)
        order: 'order', // 정렬 순서 (Number)
        show: 'show', // 표시 여부 (Select)
    },
    coreCompetencyDB: {
        title: 'title', // 제목 (Title)
        description: 'description', // 설명 (Rich Text)
        skills: 'skills', // 관련 기술 스택 (Multi-select)
        details: 'details', // 사례, bullet point 설명 (Rich Text)
        order: 'order',
        show: 'show',
    },
    // 업무 경험 요약
    workSummaryDB: {
        company: 'company', // 회사 (Title)
        position: 'position', // 직책 (Rich Text)
        period: 'period', // 근무 기간 (Rich Text)
        description: 'description', // 회사 설명 (Rich Text)
        order: 'order',
        show: 'show'
    },
    // 업무 경험 성과
    workAchievementDB: {
        title: 'title', // 성과 소제목 (Title)
        details: 'details', // 성과 디테일 (Rich Text)
        skills: 'skills', // 해당 성과 관련 기술 스택 (Multi-select)
        company: 'company', // 회사명 (Rich Text)
        order: 'order',
        show: 'show'
    },
    projectDB: {
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
    portfolioDB: {
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
    valueDB: {
        title: 'title', // 가치관 제목 (Title)
        details: 'details', // 상세 내용 (Rich Text)
        order: 'order',
        show: 'show'
    },
    otherToolDB: {
        title: 'title',         // 도구명 (Title)
        category: 'category',  // 카테고리 (Select)
        description: 'description', // 숙련도 및 경험 설명 (Rich Text)
        order: 'order',
        show: 'show'
    },
    educationDB: {
        title: 'title', // 학교명 (Title)
        degree: 'degree', // 학위/전공 (Rich Text)
        period: 'period', // 학력 기간 (Rich Text)
        location: 'location', // 위치 (Rich Text)
        order: 'order',
        show: 'show'
    },
    certificationDB: {
        title: 'title', // 자격증명 (Title)
        date: 'date', // 취득일 (Rich Text)
        number: 'number', // 자격증 번호 (Rich Text)
        issuer: 'issuer', // 발행기관 (Rich Text)
        order: 'order',
        show: 'show'
    },
    militaryServiceDB: {
        title: 'title', // 병역 정보 (Title)
        period: 'period' // 복무기간 (Rich Text)
    }
};

// 범용적인 데이터베이스 쿼리 함수
async function queryDatabase(
    databaseKey: string,
    propertyMapping: PropertyMapping,
    transformFunction?: (page: PageObjectResponse) => any | Promise<any>
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
            results = await Promise.all(validPages.map(async (page) => {
                const result = transformFunction(page);
                return await Promise.resolve(result);
            }));
        } else {
            // Notion 속성을 우리 타입에 맞게 변환 (async 처리)
            results = await Promise.all(validPages.map(async (page: PageObjectResponse) => {
                const result: any = {};
                for (const [notionProperty, outputField] of Object.entries(propertyMapping)) {
                    const property = page.properties[notionProperty];
                    if (property) {
                        const prop = property as any;
                        // Notion 프로퍼티 타입에 따라 적절한 함수 선택
                        if (prop.title) {
                            result[outputField] = extractTitle(prop);
                        } else if (prop.rich_text) {
                            result[outputField] = extractRichText(prop);
                        } else if (prop.multi_select) {
                            result[outputField] = extractMultiSelect(prop);
                        } else if (prop.select) {
                            result[outputField] = extractSelect(prop);
                        } else if (prop.email) {
                            result[outputField] = extractEmail(prop);
                        } else if (prop.phone_number) {
                            result[outputField] = extractPhoneNumber(prop);
                        } else if (prop.url) {
                            result[outputField] = extractUrl(prop);
                        } else if (prop.number !== undefined && prop.number !== null) {
                            result[outputField] = extractNumber(prop);
                        } else if (prop.files) {
                            result[outputField] = await extractFiles(prop);
                        }
                    }
                }
                return result;
            }));
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
export async function getPersonalInfoDB(): Promise<PersonalInfoDB> {
    try {
        if (!validateEnvironmentVariables()) {
            throw new Error('Missing required environment variables');
        }

        const results = await queryDatabase('personalInfoDB', PROPERTY_MAPPINGS.personalInfoDB);

        if (results.length === 0) {
            throw new Error('Personal info DB not found');
        }

        return results[0] as PersonalInfoDB;
    } catch (error) {
        console.error('Error fetching personal info DB:', error);
        throw error;
    }
}

// Notion에서 기술 스택 데이터 조회
export async function getSkillDB(): Promise<SkillDB[]> {
    try {
        return await queryDatabase('skillDB', PROPERTY_MAPPINGS.skillDB, (page) => {
            return {
                skills: extractMultiSelect(page.properties.skills),
                title: extractTitle(page.properties.title) || 'other',
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching skill DB:', error);
        return [];
    }
}

// Notion에서 핵심 역량 데이터 조회
export async function getCoreCompetencyDB(): Promise<CoreCompetencyDB[]> {
    try {
        return await queryDatabase('coreCompetencyDB', PROPERTY_MAPPINGS.coreCompetencyDB, (page) => {
            return {
                title: extractTitle(page.properties.title),
                description: extractRichText(page.properties.description),
                skills: extractMultiSelect(page.properties.skills),
                details: extractRichText(page.properties.details),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching core competency DB:', error);
        return [];
    }
}

// Notion에서 업무 경험 데이터 조회
export async function getWorkSummaryDB(): Promise<WorkSummaryDB[]> {
    try {
        return await queryDatabase('workSummaryDB', PROPERTY_MAPPINGS.workSummaryDB, (page) => {
            return {
                company: extractTitle(page.properties.company),
                position: extractRichText(page.properties.position),
                period: extractRichText(page.properties.period),
                description: extractRichText(page.properties.description),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching work summary DB:', error);
        return [];
    }
}

// Notion에서 업무 경험 성과 데이터 조회
export async function getWorkAchievementDB(): Promise<WorkAchievementDB[]> {
    try {
        return await queryDatabase('workAchievementDB', PROPERTY_MAPPINGS.workAchievementDB, (page) => {
            const skillsProperty = page.properties.skills;
            let skillsArray: string[] = [];

            // Multi-select 속성에서 skills 추출
            if (skillsProperty && 'multi_select' in skillsProperty && skillsProperty.multi_select) {
                skillsArray = skillsProperty.multi_select
                    .map((item: any) => item.name)
                    .filter((name: string) => name && name.trim().length > 0);
            }

            return {
                title: extractTitle(page.properties.title),
                details: extractRichText(page.properties.details),
                skills: skillsArray,
                company: extractRichText(page.properties.company),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching work achievement DB:', error);
        return [];
    }
}

// Notion에서 프로젝트 경험 데이터 조회
export async function getProjectDB(): Promise<ProjectDB[]> {
    try {
        return await queryDatabase('projectDB', PROPERTY_MAPPINGS.projectDB, (page) => {
            return {
                title: extractTitle(page.properties.title),
                description: extractRichText(page.properties.description),
                period: extractRichText(page.properties.period),
                skills: extractMultiSelect(page.properties.skills),
                details: extractRichText(page.properties.details),
                github: extractUrl(page.properties.github),
                website: extractUrl(page.properties.website),
                ios: extractUrl(page.properties.ios),
                android: extractUrl(page.properties.android),
                post: extractUrl(page.properties.post),
                contribution: extractRichText(page.properties.contribution),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching project DB:', error);
        return [];
    }
}

// Notion에서 포트폴리오 데이터 조회
export async function getPortfolioDB(): Promise<PortfolioDB[]> {
    try {
        return await queryDatabase('portfolioDB', PROPERTY_MAPPINGS.portfolioDB, (page) => {
            return {
                title: extractTitle(page.properties.title),
                description: extractRichText(page.properties.description),
                period: extractRichText(page.properties.period),
                skills: extractMultiSelect(page.properties.skills),
                details: extractRichText(page.properties.details),
                github: extractUrl(page.properties.github),
                website: extractUrl(page.properties.website),
                ios: extractUrl(page.properties.ios),
                android: extractUrl(page.properties.android),
                post: extractUrl(page.properties.post),
                contribution: extractRichText(page.properties.contribution),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching portfolio DB:', error);
        return [];
    }
}

// Notion에서 가치관 데이터 조회
export async function getValueDB(): Promise<ValueDB[]> {
    try {
        return await queryDatabase('valueDB', PROPERTY_MAPPINGS.valueDB, (page) => {
            return {
                title: extractTitle(page.properties.title),
                details: extractRichText(page.properties.details),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching values:', error);
        return [];
    }
}

// Notion에서 개발 외 툴 데이터 조회
export async function getOtherToolDB(): Promise<OtherToolDB[]> {
    try {
        return await queryDatabase('otherToolDB', PROPERTY_MAPPINGS.otherToolDB, (page) => {
            return {
                title: extractTitle(page.properties.title),
                category: extractSelect(page.properties.category),
                description: extractRichText(page.properties.description),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching other tool DB:', error);
        return [];
    }
}

// Notion에서 학력 데이터 조회
export async function getEducationDB(): Promise<EducationDB[]> {
    try {
        return await queryDatabase('educationDB', PROPERTY_MAPPINGS.educationDB, (page) => {
            return {
                title: extractTitle(page.properties.title),
                degree: extractRichText(page.properties.degree),
                period: extractRichText(page.properties.period),
                location: extractRichText(page.properties.location),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching education DB:', error);
        return [];
    }
}

// Notion에서 자격증 데이터 조회
export async function getCertificationDB(): Promise<CertificationDB[]> {
    try {
        return await queryDatabase('certificationDB', PROPERTY_MAPPINGS.certificationDB, (page) => {
            return {
                title: extractTitle(page.properties.title),
                date: extractRichText(page.properties.date),
                number: extractRichText(page.properties.number),
                issuer: extractRichText(page.properties.issuer),
                order: extractNumber(page.properties.order) || DEFAULT_ORDER_VALUE,
                show: extractSelect(page.properties.show) as 'show' | 'hide' || 'show',
            };
        });
    } catch (error) {
        console.error('Error fetching certification DB:', error);
        return [];
    }
}

// Notion에서 병역 데이터 조회
export async function getMilitaryServiceDB(): Promise<MilitaryServiceDB | null> {
    try {
        const results = await queryDatabase('militaryServiceDB', PROPERTY_MAPPINGS.militaryServiceDB);
        return results.length > 0 ? results[0] as MilitaryServiceDB : null;
    } catch (error) {
        console.error('Error fetching military service DB:', error);
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
            personalInfoDB,
            skillDB,
            coreCompetencyDB,
            workSummaryDB,
            workAchievementDB,
            projectDB,
            portfolioDB,
            valueDB,
            otherToolDB,
            educationDB,
            certificationDB,
            militaryServiceDB,
        ] = await Promise.all([
            getPersonalInfoDB(),
            getSkillDB(),
            getCoreCompetencyDB(),
            getWorkSummaryDB(),
            getWorkAchievementDB(),
            getProjectDB(),
            getPortfolioDB(),
            getValueDB(),
            getOtherToolDB(),
            getEducationDB(),
            getCertificationDB(),
            getMilitaryServiceDB(),
        ]);

        return {
            personalInfoDB,
            skillDB,
            coreCompetencyDB,
            workSummaryDB,
            workAchievementDB,
            projectDB,
            portfolioDB,
            valueDB,
            otherToolDB,
            educationDB,
            certificationDB,
            militaryServiceDB,
        };
    } catch (error) {
        console.error('Error fetching resume data:', error);
        throw error;
    }
}

