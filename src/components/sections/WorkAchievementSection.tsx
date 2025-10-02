import { WorkAchievementDB } from '@/types';
import TechChips from '@/components/ui/TechChips';

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

interface WorkAchievementSectionProps {
    sections: WorkAchievementDB[];
}

export default function WorkAchievementSection({ sections }: WorkAchievementSectionProps) {
    return (
        <div>
            {sections.map((section, index) => (
                <div key={index} className="details-section">
                    <h3 className="text-details-title">{section.title}</h3>

                    {/* Skills */}
                    {section.skills && section.skills.length > 0 && (
                        <TechChips
                            technologies={section.skills}
                        />
                    )}

                    {/* Achievements */}
                    {section.details && (
                        renderTextWithBullets(section.details)
                    )}
                </div>
            ))}
        </div>
    );
}
