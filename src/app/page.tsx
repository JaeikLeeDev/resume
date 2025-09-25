'use client';

import { useState, useEffect } from 'react';
import ResumeLayout from '@/components/layout/ResumeLayout';
import PDFExport from '@/components/ui/PDFExport';
import ContactInfo from '@/components/sections/ContactInfo';
import TechChips from '@/components/ui/TechChips';
import ExperienceItem from '@/components/sections/ExperienceItem';
import SkillSection from '@/components/sections/SkillSection';
import ValueSection from '@/components/sections/ValueSection';
import ToolSection from '@/components/sections/ToolSection';
import CoreCompetencySection from '@/components/sections/CoreCompetencySection';
import AchievementSection from '@/components/sections/AchievementSection';
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

    const { personalInfo, skills, coreCompetencies, experiences, achievementSections, projects, portfolio, values, tools } = resumeData;

    // Contact information 변환
    const contactInfo = {
        email: personalInfo.email,
        phone: personalInfo.phone,
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
    };

    // Skills 데이터 변환 (Notion에서 직접 카테고리 사용)
    const skillsData = skills.reduce((acc: Array<{ category: string; skills: Array<{ name: string; summary: string }> }>, skill) => {
        // Notion에서 설정한 카테고리를 그대로 사용
        const category = skill.category || 'Other';

        let categoryObj = acc.find((cat: { category: string; skills: Array<{ name: string; summary: string }> }) => cat.category === category);
        if (!categoryObj) {
            categoryObj = { category, skills: [] };
            acc.push(categoryObj);
        }

        // skill.name이 이제 배열이므로 각 기술을 개별 skill로 추가
        skill.name.forEach((techName: string) => {
            categoryObj.skills.push({
                name: techName,
                summary: '' // level이 제거되었으므로 빈 문자열
            });
        });

        return acc;
    }, []);

    // Core competencies는 직접 사용 (새로운 CoreCompetencySection 컴포넌트 사용)

    // Values 변환
    const valuesData = values.map((value: any) => ({
        title: value.title,
        items: value.description
    }));

    // Other tools 변환 (category별로 그룹화)
    const otherToolsData = tools.reduce((acc: Array<{ category: string; tools: Array<{ name: string; description: string }> }>, tool: any) => {
        // Notion에서 설정한 카테고리를 그대로 사용
        const category = tool.category || 'Other';

        let categoryObj = acc.find((cat: { category: string; tools: Array<{ name: string; description: string }> }) => cat.category === category);
        if (!categoryObj) {
            categoryObj = { category, tools: [] };
            acc.push(categoryObj);
        }

        categoryObj.tools.push({
            name: tool.name,
            description: tool.description || ''
        });

        return acc;
    }, []);

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            <PDFExport />
            <ResumeLayout>
                <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>

                    {/* Header Section */}
                    <div style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h1 className="text-hero">{personalInfo.name} 이력서</h1>
                        <p className="text-item-subtitle">{personalInfo.title}</p>

                        <ContactInfo {...contactInfo} />

                        <p className="text-body">
                            스타트업 개발자로 4년간 다양한 기술 스택을 경험했습니다. 임베디드에서 웹, 앱, 머신러닝까지 폭넓은 영역을 다루며 **새로운 기술을 빠르게 습득하고 제품화하는 역량**을 키웠습니다.
                            <br />
                            SI 개발 2년간 Flutter, Unity, 머신러닝 등 **서로 다른 기술스택의 제품 4건을 성공적으로 개발**했습니다. 처음 접하는 기술로도 정확한 견적과 일정 예측이 가능합니다.
                            <br />
                            업무 능력 향상을 위한 자기 계발을 좋아합니다. 어제 배운 지식이 오늘 회사 제품을 더 낫게 만들 때 짜릿함을 느낍니다.
                            <br />
                            대화만큼이나 글을 통한 소통을 중요하게 생각합니다. **Notion으로 문서화하고, 협업**하기를 좋아합니다. 목표 결과물에 대해 팀원 모두가 같은 이해를 갖도록 하는 데 집중합니다.
                            <br />
                            UI 및 그래픽디자인 경험이 있습니다. 간단한 디자인 작업이 가능하며 디자이너와 협업시 소통이 원활합니다.
                        </p>
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
                            <AchievementSection sections={achievementSections} />
                        )}
                    </div>

                    {/* 프로젝트 경험 Section */}
                    <div className="section">
                        <h2 className="text-section-title">프로젝트 경험.</h2>

                        {projects.map((project: any, index: number) => (
                            <div key={index} className="item">
                                <h3 className="text-subsection-title">{project.name}</h3>
                                <p className="text-meta">{project.period}</p>

                                <p className="text-body">{project.description}</p>

                                {project.contribution && (
                                    <p className="text-meta" style={{ marginTop: '0.125rem', marginBottom: '0.5rem' }}>{project.contribution}</p>
                                )}

                                {project.skills.length > 0 && (
                                    <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                                        {project.skills.map((tech: any, techIndex: number) => (
                                            <span key={techIndex} className="tech-chip">{tech}</span>
                                        ))}
                                    </div>
                                )}

                                {project.features.length > 0 && (
                                    <ul className="list">
                                        {project.features.map((feature: any, featureIndex: number) => (
                                            <li key={featureIndex} className="list-item">{feature}</li>
                                        ))}
                                    </ul>
                                )}

                                {(project.github || project.website || project.ios || project.android || project.post) && (
                                    <p className="text-meta" style={{ marginTop: 'var(--space-sm)' }}>
                                        {project.github && (
                                            <>
                                                <a href={project.github} className="link" target="_blank" rel="noopener noreferrer">GitHub</a>
                                                {(project.website || project.ios || project.android || project.post) && ' | '}
                                            </>
                                        )}
                                        {project.website && (
                                            <>
                                                <a href={project.website} className="link" target="_blank" rel="noopener noreferrer">Website</a>
                                                {(project.ios || project.android || project.post) && ' | '}
                                            </>
                                        )}
                                        {project.ios && (
                                            <>
                                                <a href={project.ios} className="link" target="_blank" rel="noopener noreferrer">iOS</a>
                                                {(project.android || project.post) && ' | '}
                                            </>
                                        )}
                                        {project.android && (
                                            <>
                                                <a href={project.android} className="link" target="_blank" rel="noopener noreferrer">Android</a>
                                                {project.post && ' | '}
                                            </>
                                        )}
                                        {project.post && (
                                            <a href={project.post} className="link" target="_blank" rel="noopener noreferrer">Post</a>
                                        )}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 포트폴리오 Section */}
                    <div className="section">
                        <h2 className="text-section-title">포트폴리오.</h2>

                        {portfolio.map((item: any, index: number) => (
                            <div key={index} className="item">
                                <h3 className="text-subsection-title">{item.name}</h3>
                                <p className="text-meta">{item.period}</p>

                                <p className="text-body">{item.description}</p>

                                {item.contribution && (
                                    <p className="text-meta" style={{ marginTop: '0.125rem', marginBottom: '0.5rem' }}>{item.contribution}</p>
                                )}

                                {item.skills.length > 0 && (
                                    <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                                        {item.skills.map((tech: any, techIndex: number) => (
                                            <span key={techIndex} className="tech-chip">{tech}</span>
                                        ))}
                                    </div>
                                )}

                                {item.features.length > 0 && (
                                    <ul className="list">
                                        {item.features.map((feature: any, featureIndex: number) => (
                                            <li key={featureIndex} className="list-item">{feature}</li>
                                        ))}
                                    </ul>
                                )}

                                {(item.github || item.website || item.ios || item.android || item.post) && (
                                    <p className="text-meta" style={{ marginTop: 'var(--space-sm)' }}>
                                        {item.github && (
                                            <>
                                                <a href={item.github} className="link" target="_blank" rel="noopener noreferrer">GitHub</a>
                                                {(item.website || item.ios || item.android || item.post) && ' | '}
                                            </>
                                        )}
                                        {item.website && (
                                            <>
                                                <a href={item.website} className="link" target="_blank" rel="noopener noreferrer">Website</a>
                                                {(item.ios || item.android || item.post) && ' | '}
                                            </>
                                        )}
                                        {item.ios && (
                                            <>
                                                <a href={item.ios} className="link" target="_blank" rel="noopener noreferrer">iOS</a>
                                                {(item.android || item.post) && ' | '}
                                            </>
                                        )}
                                        {item.android && (
                                            <>
                                                <a href={item.android} className="link" target="_blank" rel="noopener noreferrer">Android</a>
                                                {item.post && ' | '}
                                            </>
                                        )}
                                        {item.post && (
                                            <a href={item.post} className="link" target="_blank" rel="noopener noreferrer">Post</a>
                                        )}
                                    </p>
                                )}
                            </div>
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

                </div>
            </ResumeLayout>
        </div>
    );
}
