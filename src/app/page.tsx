'use client';

import { useState, useEffect } from 'react';
import ResumeLayout from '@/components/layout/ResumeLayout';
import ContactInfo from '@/components/sections/ContactInfo';
import SkillSection from '@/components/sections/SkillSection';
import ValueSection from '@/components/sections/ValueSection';
import ToolSection from '@/components/sections/ToolSection';
import CoreCompetencySection from '@/components/sections/CoreCompetencySection';
import WorkAchievementSection from '@/components/sections/WorkAchievementSection';
import ProjectItem from '@/components/sections/ProjectItem';
import EducationSection from '@/components/sections/EducationSection';
import CertificationSection from '@/components/sections/CertificationSection';
import MilitaryServiceSection from '@/components/sections/MilitaryServiceSection';
import { ResumeData } from '@/types';

export default function NotionResumePage() {
    // 이력서 데이터 로딩을 위한 상태 관리
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // 컴포넌트 마운트 시 이력서 데이터 로드
    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/resume');
                const result = await response.json();

                if (result.success) {
                    setResumeData(result.data);
                    setError(null);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                console.error('Failed to fetch resume data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch resume data');
            } finally {
                setLoading(false);
            }
        };

        fetchResumeData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-lg">이력서를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold mb-4">데이터 로딩 실패</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="text-sm text-gray-500">
                        <p className="mt-2">환경 변수가 올바르게 설정되었는지 확인해주세요.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg">데이터를 찾을 수 없습니다.</p>
                </div>
            </div>
        );
    }

    // 이력서 데이터 구조분해할당
    const { personalInfo, skills, coreCompetencies, experiences, achievementSections, projects, portfolio, values, tools, education, certifications, militaryService } = resumeData;

    // 개인정보를 ContactInfo 컴포넌트 형식으로 변환
    const transformContactInfo = (personalInfo: any) => ({
        email: personalInfo.email,
        phone: personalInfo.phone,
        photo: personalInfo.photo,
        // 웹사이트/깃허브 링크를 URL과 표시용 텍스트로 분리
        ...(personalInfo.website && {
            blog: {
                url: personalInfo.website,
                display: personalInfo.website.replace('https://', '')
            }
        }),
        ...(personalInfo.github && {
            github: {
                url: personalInfo.github,
                display: personalInfo.github.replace('https://', '')
            }
        })
    });

    // 기술 스택을 카테고리별로 그룹화
    const transformSkillsData = (skills: any[]) => {
        return skills
            .filter(skill => skill.show === 'show')
            .reduce((acc: Array<{ category: string; skills: Array<{ name: string[]; summary: string }> }>, skill) => {
                const category = skill.title || 'Other';
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
    const transformToolsData = (tools: any[]) => {
        return tools
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
    const contactInfo = transformContactInfo(personalInfo);
    const skillsData = transformSkillsData(skills);
    const otherToolsData = transformToolsData(tools);

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            <ResumeLayout>
                <div className="container" style={{ paddingTop: 'var(--space-lg)', paddingBottom: 'var(--space-3xl)' }}>

                    {/* 개인정보 섹션 */}
                    <div style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h1 className="text-hero">{personalInfo.name} 이력서</h1>
                        <p className="text-item-subtitle" style={{ marginBottom: 'var(--space-lg)' }}>{personalInfo.position}</p>

                        <ContactInfo {...contactInfo} />

                        {personalInfo.introduction && (
                            <div className="text-body" style={{ whiteSpace: 'pre-line' }}>
                                {personalInfo.introduction}
                            </div>
                        )}
                    </div>

                    {/* 사용한 기술 섹션 */}
                    {skills.some(skill => skill.show === 'show') && (
                        <div className="section page-break-before">
                            <h2 className="text-section-title">사용한 기술.</h2>
                            <SkillSection categories={skillsData} />
                        </div>
                    )}

                    {/* 핵심 역량 섹션 */}
                    {coreCompetencies.some(competency => competency.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">핵심 역량.</h2>
                            <CoreCompetencySection competencies={coreCompetencies.filter(comp => comp.show === 'show')} />
                        </div>
                    )}

                    {/* 업무 경험 섹션 */}
                    {(experiences.some(exp => exp.show === 'show') || achievementSections.some(ach => ach.show === 'show')) && (
                        <div className="section">
                            <h2 className="text-section-title">업무 경험.</h2>

                            {experiences.filter(experience => experience.show === 'show').map((experience: any, index: number) => (
                                <div key={index} className="item">
                                    <h3 className="text-subsection-title">{experience.company} | {experience.position}</h3>
                                    <p className="text-meta">{experience.period}</p>
                                    <p className="text-body">{experience.description}</p>
                                </div>
                            ))}

                            {achievementSections && achievementSections.filter(ach => ach.show === 'show').length > 0 && (
                                <WorkAchievementSection sections={achievementSections.filter(ach => ach.show === 'show')} />
                            )}
                        </div>
                    )}

                    {/* 프로젝트 경험 섹션 */}
                    {projects.some(project => project.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">프로젝트 경험.</h2>

                            {projects.filter(project => project.show === 'show').map((project: any, index: number) => (
                                <ProjectItem
                                    key={index}
                                    title={project.title}
                                    description={project.description}
                                    period={project.period}
                                    skills={project.skills}
                                    details={project.details}
                                    contribution={project.contribution}
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
                    {portfolio.some(item => item.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">포트폴리오.</h2>

                            {portfolio.filter(item => item.show === 'show').map((item: any, index: number) => (
                                <ProjectItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    period={item.period}
                                    skills={item.skills}
                                    details={item.details}
                                    contribution={item.contribution}
                                    github={item.github}
                                    website={item.website}
                                    ios={item.ios}
                                    android={item.android}
                                    post={item.post}
                                />
                            ))}
                        </div>
                    )}

                    {/* 학력 섹션 */}
                    {education.some(edu => edu.show === 'show') && (
                        <div className="section page-break-before">
                            <h2 className="text-section-title">학력.</h2>
                            <EducationSection education={education.filter(edu => edu.show === 'show')} />
                        </div>
                    )}

                    {/* 가치관 섹션 */}
                    {values.some(value => value.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">가치관.</h2>
                            <ValueSection values={values.filter(value => value.show === 'show')} />
                        </div>
                    )}

                    {/* 개발 외 툴 활용 역량 섹션 */}
                    {tools.some(tool => tool.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">개발 외 툴 활용 역량.</h2>
                            <ToolSection categories={otherToolsData} />
                        </div>
                    )}

                    {/* 자격증 및 어학 섹션 */}
                    {certifications.some(cert => cert.show === 'show') && (
                        <div className="section">
                            <h2 className="text-section-title">자격증 및 어학.</h2>
                            <CertificationSection certifications={certifications.filter(cert => cert.show === 'show')} />
                        </div>
                    )}

                    {/* 병역 섹션 */}
                    <div className="section">
                        <h2 className="text-section-title">병역.</h2>
                        <MilitaryServiceSection militaryService={militaryService} />
                    </div>

                </div>
            </ResumeLayout>
        </div>
    );
}
