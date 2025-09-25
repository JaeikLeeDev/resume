'use client';

import { useState, useEffect } from 'react';
import ResumeLayout from '@/components/layout/ResumeLayout';
import PDFExport from '@/components/ui/PDFExport';
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
import { addPageBreakStyles } from '@/lib/pdf';
import { ResumeData } from '@/types';

export default function NotionResumePage() {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        addPageBreakStyles();

        // 이력서 데이터 가져오기 (API 라우트를 통해)
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
                    <p className="text-lg">이력서 데이터를 불러오는 중...</p>
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

    const { personalInfo, skills, coreCompetencies, experiences, achievementSections, projects, portfolio, values, tools, education, certifications, militaryService } = resumeData;

    // 데이터 변환 함수들 (간단하고 명확하게)
    const transformContactInfo = (personalInfo: any) => ({
        email: personalInfo.email,
        phone: personalInfo.phone,
        photo: personalInfo.photo,
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

    const transformSkillsData = (skills: any[]) => {
        return skills.reduce((acc: Array<{ category: string; skills: Array<{ name: string; summary: string }> }>, skill) => {
            const category = skill.category || 'Other';
            let categoryObj = acc.find(cat => cat.category === category);

            if (!categoryObj) {
                categoryObj = { category, skills: [] };
                acc.push(categoryObj);
            }

            skill.name.forEach((techName: string) => {
                categoryObj.skills.push({
                    name: techName,
                    summary: ''
                });
            });

            return acc;
        }, []);
    };

    const transformValuesData = (values: any[]) => {
        return values.map(value => ({
            title: value.title,
            items: value.description
        }));
    };

    const transformToolsData = (tools: any[]) => {
        return tools.reduce((acc: Array<{ category: string; tools: Array<{ name: string; description: string }> }>, tool) => {
            // tool.category가 실제 카테고리 (Title), tool.name이 도구명 (Select)
            const category = tool.category || 'Other';
            let categoryObj = acc.find(cat => cat.category === category);

            if (!categoryObj) {
                categoryObj = { category, tools: [] };
                acc.push(categoryObj);
            }

            categoryObj.tools.push({
                name: tool.name,  // 도구명
                description: tool.description || ''
            });

            return acc;
        }, []);
    };

    // 변환된 데이터
    const contactInfo = transformContactInfo(personalInfo);
    const skillsData = transformSkillsData(skills);
    const valuesData = transformValuesData(values);
    const otherToolsData = transformToolsData(tools);

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            <PDFExport />
            <ResumeLayout>
                <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>

                    {/* Header Section */}
                    <div style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h1 className="text-hero">{personalInfo.name} 이력서</h1>
                        <p className="text-item-subtitle" style={{ marginBottom: 'var(--space-lg)' }}>{personalInfo.title}</p>

                        <ContactInfo {...contactInfo} />

                        {personalInfo.introduction && (
                            <div className="text-body" style={{ whiteSpace: 'pre-line' }}>
                                {personalInfo.introduction}
                            </div>
                        )}
                    </div>

                    {/* 사용한 기술 Section */}
                    <div className="section">
                        <h2 className="text-section-title">사용한 기술.</h2>
                        <SkillSection categories={skillsData} />
                    </div>

                    {/* 핵심 역량 Section */}
                    <div className="section">
                        <h2 className="text-section-title">핵심 역량.</h2>
                        <CoreCompetencySection competencies={coreCompetencies} />
                    </div>

                    {/* 업무 경험 Section */}
                    <div className="section">
                        <h2 className="text-section-title">업무 경험.</h2>

                        {experiences.map((experience: any, index: number) => (
                            <div key={index} className="item">
                                <h3 className="text-subsection-title">{experience.company} | {experience.position}</h3>
                                <p className="text-meta">{experience.period}</p>
                                <p className="text-body">{experience.description}</p>
                            </div>
                        ))}

                        {/* 성과 섹션들 */}
                        {achievementSections && achievementSections.length > 0 && (
                            <WorkAchievementSection sections={achievementSections} />
                        )}
                    </div>

                    {/* 프로젝트 경험 Section */}
                    <div className="section">
                        <h2 className="text-section-title">프로젝트 경험.</h2>

                        {projects.map((project: any, index: number) => (
                            <ProjectItem
                                key={index}
                                name={project.name}
                                description={project.description}
                                period={project.period}
                                skills={project.skills}
                                features={project.features}
                                contribution={project.contribution}
                                github={project.github}
                                website={project.website}
                                ios={project.ios}
                                android={project.android}
                                post={project.post}
                            />
                        ))}
                    </div>

                    {/* 포트폴리오 Section */}
                    <div className="section">
                        <h2 className="text-section-title">포트폴리오.</h2>

                        {portfolio.map((item: any, index: number) => (
                            <ProjectItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                period={item.period}
                                skills={item.skills}
                                features={item.features}
                                contribution={item.contribution}
                                github={item.github}
                                website={item.website}
                                ios={item.ios}
                                android={item.android}
                                post={item.post}
                            />
                        ))}
                    </div>

                    {/* 가치관 Section */}
                    <div className="section">
                        <h2 className="text-section-title">가치관.</h2>
                        <ValueSection values={valuesData} />
                    </div>

                    {/* 개발 외 툴 활용 역량 Section */}
                    <div className="section">
                        <h2 className="text-section-title">개발 외 툴 활용 역량.</h2>
                        <ToolSection categories={otherToolsData} />
                    </div>

                    {/* 학력 Section */}
                    <div className="section">
                        <h2 className="text-section-title">학력.</h2>
                        <EducationSection education={education} />
                    </div>

                    {/* 자격증 및 어학 Section */}
                    <div className="section">
                        <h2 className="text-section-title">자격증 및 어학.</h2>
                        <CertificationSection certifications={certifications} />
                    </div>

                    {/* 병역 Section */}
                    <div className="section">
                        <h2 className="text-section-title">병역.</h2>
                        <MilitaryServiceSection militaryService={militaryService} />
                    </div>

                </div>
            </ResumeLayout>
        </div>
    );
}
