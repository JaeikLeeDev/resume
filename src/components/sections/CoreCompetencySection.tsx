import TechChips from '@/components/ui/TechChips';

import { CoreCompetencyDB } from '@/types';

// Bullet point 텍스트를 렌더링하는 헬퍼 함수
function renderTextWithBullets(text: string) {
    if (text.startsWith('BULLET_LIST:')) {
        try {
            const bulletItems = JSON.parse(text.substring(12));
            return (
                <ul className="list">
                    {bulletItems.map((item: string, index: number) => (
                        <li key={index} className="list-item">{item}</li>
                    ))}
                </ul>
            );
        } catch (error) {
            console.error('Error parsing bullet list:', error);
            return <div className="text-body text-pre-line">{text}</div>;
        }
    }
    return <div className="text-body text-pre-line">{text}</div>;
}

interface CoreCompetencySectionProps {
    competencies: CoreCompetencyDB[];
}

export default function CoreCompetencySection({ competencies }: CoreCompetencySectionProps) {
    return (
        <div>
            {competencies.map((competency, index) => (
                <div key={index} className="details-section">
                    <h3 className="text-details-title">{competency.title}</h3>

                    {/* Skills를 Tech Chips로 표시 */}
                    {competency.skills && competency.skills.length > 0 && (
                        <TechChips
                            technologies={competency.skills}
                        />
                    )}

                    {/* Description */}
                    <p className="text-body">{competency.description}</p>

                    {/* Details */}
                    {competency.details && (
                        renderTextWithBullets(competency.details)
                    )}
                </div>
            ))}
        </div>
    );
}
