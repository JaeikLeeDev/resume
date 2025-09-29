import { WorkAchievementDB } from '@/types';

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
            return <div className="text-body" style={{ whiteSpace: 'pre-line' }}>{text}</div>;
        }
    }
    return <div className="text-body" style={{ whiteSpace: 'pre-line' }}>{text}</div>;
}

interface WorkAchievementSectionProps {
    sections: WorkAchievementDB[];
}

export default function WorkAchievementSection({ sections }: WorkAchievementSectionProps) {
    return (
        <div>
            {sections.map((section, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{section.title}</h3>

                    {/* Achievements */}
                    {section.details && (
                        renderTextWithBullets(section.details)
                    )}
                </div>
            ))}
        </div>
    );
}
