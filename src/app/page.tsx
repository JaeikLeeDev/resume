import ResumeLayout from '@/components/layout/ResumeLayout';
import ContactInfo from '@/components/sections/ContactInfo';
import SkillSection from '@/components/sections/SkillSection';
import ValueSection from '@/components/sections/ValueSection';
import OtherToolSection from '@/components/sections/OtherToolSection';
import CoreCompetencySection from '@/components/sections/CoreCompetencySection';
import ProjectItem from '@/components/sections/ProjectItem';
import EducationSection from '@/components/sections/EducationSection';
import CertificationSection from '@/components/sections/CertificationSection';
import MilitaryServiceSection from '@/components/sections/MilitaryServiceSection';
import PDFLinkButton from '@/components/ui/PDFLinkButton';
import PDFDownloadButton from '@/components/ui/PDFDownloadButton';
import { ResumeData } from '@/types';
import { getResumeData } from '@/lib/notion';
import { renderTextWithBullets } from '@/lib/textUtils';

/**
 * 메인 이력서 페이지 컴포넌트
 * Notion API에서 데이터를 가져와 이력서를 렌더링
 */
export default async function NotionResumePage() {
    // 환경변수 확인
    const isGitHubPages = process.env.GITHUB_PAGES === 'true';
    console.log('Environment check:', { GITHUB_PAGES: process.env.GITHUB_PAGES, isGitHubPages });

    let resumeData: ResumeData;

    try {
        // Notion API에서 이력서 데이터 가져오기
        resumeData = await getResumeData();
    } catch (error) {
        console.error('Failed to fetch resume data:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold mb-4">데이터 로딩 실패</h2>
                    <p className="text-gray-600 mb-4">
                        {error instanceof Error ? error.message : 'Failed to fetch resume data'}
                    </p>
                    <div className="text-sm text-gray-500">
                        <p className="mt-2">환경 변수가 올바르게 설정되었는지 확인해주세요.</p>
                    </div>
                </div>
            </div>
        );
    }

    // 이력서 데이터 구조분해할당
    const { personalInfoDB, skillDB, coreCompetencyDB, workSummaryDB, workAchievementDB, projectDB, portfolioDB, awardDB, activityDB, otherExperienceDB, valueDB, otherToolDB, educationDB, certificationDB, militaryServiceDB } = resumeData;

    // 개인정보를 ContactInfo 컴포넌트 형식으로 변환
    const transformContactInfo = (personalInfoDB: any) => ({
        email: personalInfoDB.email,
        phone: personalInfoDB.phone,
        // 웹사이트/깃허브 링크를 URL과 표시용 텍스트로 분리
        ...(personalInfoDB.website && {
            blog: {
                url: personalInfoDB.website,
                display: personalInfoDB.website.replace('https://', '')
            }
        }),
        ...(personalInfoDB.github && {
            github: {
                url: personalInfoDB.github,
                display: personalInfoDB.github.replace('https://', '')
            }
        })
    });

    // 기술 스택을 카테고리별로 그룹화
    const transformSkillData = (skillDB: any[]) => {
        return skillDB
            .filter(skill => skill.show === 'show')
            .reduce((acc: Array<{ category: string; skills: Array<{ name: string[]; summary: string }> }>, skill, index) => {
                // title이 없으면 고유한 식별자로 설정 (각 row별로 그룹핑 유지)
                const category = skill.title || `no-title-${index}`;
                let categoryObj = acc.find(cat => cat.category === category);

                if (!categoryObj) {
                    categoryObj = { category, skills: [] };
                    acc.push(categoryObj);
                }

                categoryObj.skills.push({
                    name: skill.skills,
                    summary: ''
                });

                return acc;
            }, []);
    };


    // 도구 데이터를 카테고리별로 그룹화
    const transformOtherToolData = (otherToolDB: any[]) => {
        return otherToolDB
            .filter(tool => tool.show === 'show')
            .reduce((acc: Array<{ category: string; tools: Array<{ title: string; description: string }> }>, tool) => {
                const category = tool.category || 'Other';
                let categoryObj = acc.find(cat => cat.category === category);

                if (!categoryObj) {
                    categoryObj = { category, tools: [] };
                    acc.push(categoryObj);
                }

                categoryObj.tools.push({
                    title: tool.title,
                    description: tool.description || ''
                });

                return acc;
            }, []);
    };

    // 데이터 변환 실행
    const contactInfo = transformContactInfo(personalInfoDB);
    const skillsData = transformSkillData(skillDB);
    const otherToolsData = transformOtherToolData(otherToolDB);

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            <ResumeLayout>
                <div className="container" style={{ paddingTop: 'var(--space-lg)', paddingBottom: 'var(--space-3xl)' }}>

                    {/* 개인정보 섹션 */}
                    <div className="section personal-info-section">
                        <div className="flex-between margin-bottom-lg">
                            <div>
                                <h1 className="text-hero">{personalInfoDB.name} 이력서</h1>
                                <p className="text-secondary-title">{personalInfoDB.position}</p>
                            </div>
                            {/* Vercel 모드에서만 PDF 다운로드 버튼 표시 */}
                            {!isGitHubPages && <PDFDownloadButton />}
                        </div>

                        <ContactInfo {...contactInfo} />

                        {personalInfoDB.introduction && (
                            <div className="text-body text-pre-line">{personalInfoDB.introduction}</div>
                        )}
                    </div>

                    {/* 사용한 기술 섹션 */}
                    {skillDB.some(skill => skill.show === 'show') && (
                        <div className="section page-break-before">
                            <h2 className="text-section-title">사용한 기술.</h2>
                            <SkillSection categories={skillsData} />
                        </div>
                    )}

                    {/* 핵심 역량 섹션 */}
                    {coreCompetencyDB.some(competency => competency.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">핵심 역량.</h2>
                            <CoreCompetencySection competencies={coreCompetencyDB.filter(comp => comp.show === 'show')} />
                        </div>
                    )}

                    {/* 업무 경험 섹션 */}
                    {(workSummaryDB.some(experience => experience.show === 'show') || workAchievementDB.some(ach => ach.show === 'show')) && (
                        <div className="section">
                            <h2 className="text-section-title">업무 경험.</h2>

                            {workSummaryDB.filter(experience => experience.show === 'show').map((experience: any, index: number) => (
                                <div key={index} className="work-experience-item">
                                    <div className="work-experience-left">
                                        <div className="text-subsection-title">{experience.company}</div>
                                        <div className="work-period-desktop text-meta">{experience.period}</div>
                                        <div className="work-position-period-mobile text-meta">
                                            {experience.position} | {experience.period}
                                        </div>
                                    </div>
                                    <div className="work-experience-right">
                                        <div className="text-subsection-title">{experience.position}</div>
                                        <div className="text-body">{experience.description}</div>

                                        {/* Work Achievements - Show achievements for this specific company */}
                                        {workAchievementDB.filter(ach => ach.show === 'show' && ach.company === experience.company).length > 0 && (
                                            <div className="text-body">
                                                {workAchievementDB
                                                    .filter(ach => ach.show === 'show' && ach.company === experience.company)
                                                    .map((achievement: any, achIndex: number) => (
                                                        <div key={achIndex} className="details-section">
                                                            <h4 className="text-details-title">{achievement.title}</h4>
                                                            {achievement.details && (
                                                                renderTextWithBullets(achievement.details)
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 프로젝트 경험 섹션 */}
                    {projectDB.some(project => project.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">프로젝트 경험.</h2>

                            {projectDB.filter(project => project.show === 'show').map((project: any, index: number) => (
                                <ProjectItem
                                    key={index}
                                    title={project.title}
                                    description={project.description}
                                    period={project.period}
                                    skills={project.skills}
                                    details={project.details}
                                    remark={project.remark}
                                    github={project.github}
                                    website={project.website}
                                    ios={project.ios}
                                    android={project.android}
                                    post={project.post}
                                />
                            ))}
                        </div>
                    )}

                    {/* 포트폴리오 섹션 */}
                    {portfolioDB.some(item => item.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">포트폴리오.</h2>

                            {portfolioDB.filter(item => item.show === 'show').map((item: any, index: number) => (
                                <ProjectItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    period={item.period}
                                    skills={item.skills}
                                    details={item.details}
                                    remark={item.remark}
                                    github={item.github}
                                    website={item.website}
                                    ios={item.ios}
                                    android={item.android}
                                    post={item.post}
                                />
                            ))}
                        </div>
                    )}

                    {/* 수상 섹션 */}
                    {awardDB.some(item => item.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">수상.</h2>

                            {awardDB.filter(item => item.show === 'show').map((item: any, index: number) => (
                                <ProjectItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    period={item.period}
                                    skills={item.skills}
                                    details={item.details}
                                    remark={item.remark}
                                    github={item.github}
                                    website={item.website}
                                    ios={item.ios}
                                    android={item.android}
                                    post={item.post}
                                />
                            ))}
                        </div>
                    )}

                    {/* 활동 섹션 */}
                    {activityDB.some(item => item.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">활동.</h2>

                            {activityDB.filter(item => item.show === 'show').map((item: any, index: number) => (
                                <ProjectItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    period={item.period}
                                    skills={item.skills}
                                    details={item.details}
                                    remark={item.remark}
                                    github={item.github}
                                    website={item.website}
                                    ios={item.ios}
                                    android={item.android}
                                    post={item.post}
                                />
                            ))}
                        </div>
                    )}

                    {/* 기타 경험 섹션 */}
                    {otherExperienceDB.some(item => item.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">기타 경험.</h2>

                            {otherExperienceDB.filter(item => item.show === 'show').map((item: any, index: number) => (
                                <ProjectItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    period={item.period}
                                    skills={item.skills}
                                    details={item.details}
                                    remark={item.remark}
                                    github={item.github}
                                    website={item.website}
                                    ios={item.ios}
                                    android={item.android}
                                    post={item.post}
                                />
                            ))}
                        </div>
                    )}

                    {/* 가치관 섹션 */}
                    {valueDB.some(value => value.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">가치관.</h2>
                            <ValueSection values={valueDB.filter(value => value.show === 'show')} />
                        </div>
                    )}

                    {/* 개발 외 툴 활용 역량 섹션 */}
                    {otherToolDB.some(tool => tool.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">개발 외 툴 활용 역량.</h2>
                            <OtherToolSection categories={otherToolsData} />
                        </div>
                    )}

                    {/* 학력 섹션 */}
                    {educationDB.some(edu => edu.show === 'show') && (
                        <div className="section page-break-before">
                            <h2 className="text-section-title">학력.</h2>
                            <EducationSection education={educationDB.filter(edu => edu.show === 'show')} />
                        </div>
                    )}

                    {/* 자격증 및 어학 섹션 */}
                    {certificationDB.some(cert => cert.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">자격증 및 어학.</h2>
                            <CertificationSection certifications={certificationDB.filter(cert => cert.show === 'show')} />
                        </div>
                    )}

                    {/* 병역 섹션 */}
                    {militaryServiceDB && militaryServiceDB.title && militaryServiceDB.title.trim() !== '' && (
                        <div className="section">
                            <h2 className="text-section-title">병역.</h2>
                            <MilitaryServiceSection militaryService={militaryServiceDB} />
                        </div>
                    )}

                    {/* PDF 출력 버튼 섹션 - 깃헙 페이지에서만 표시 (NEXT_PUBLIC_PDF_URL이 정의된 경우만) */}
                    {isGitHubPages && process.env.NEXT_PUBLIC_PDF_URL && (
                        <div className="section center-section">
                            <PDFLinkButton />
                            <p style={{
                                marginTop: '12px',
                                fontSize: '14px',
                                color: 'var(--color-text-secondary, #666)',
                                marginBottom: 0
                            }}>
                                PDF 버전으로 이력서를 다운로드하세요
                            </p>
                        </div>
                    )}

                </div>
            </ResumeLayout>
        </div>
    );
}
