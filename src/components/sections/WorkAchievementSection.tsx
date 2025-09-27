import { AchievementSection } from '@/types';

interface WorkAchievementSectionProps {
    sections: AchievementSection[];
}

export default function WorkAchievementSection({ sections }: WorkAchievementSectionProps) {
    return (
        <div>
            {sections.map((section, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{section.title}</h3>

                    {/* Achievements */}
                    {section.detail && (
                        <ul className="list">
                            {Array.isArray(section.detail)
                                ? section.detail.filter(achievement => achievement.trim().length > 0).map((achievement, achievementIndex) => (
                                    <li key={achievementIndex} className="list-item">{achievement}</li>
                                ))
                                : section.detail.split(';').filter(achievement => achievement.trim().length > 0).map((achievement, achievementIndex) => (
                                    <li key={achievementIndex} className="list-item">{achievement.trim()}</li>
                                ))
                            }
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
