import TechChips from '@/components/ui/TechChips';

interface WorkAchievementSection {
    name: string;
    achievements: string[];
    skills: string[];
}

interface WorkAchievementSectionProps {
    sections: WorkAchievementSection[];
}

export default function WorkAchievementSection({ sections }: WorkAchievementSectionProps) {
    return (
        <div>
            {sections.map((section, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{section.name}</h3>


                    {/* Achievements */}
                    {section.achievements && section.achievements.length > 0 && (
                        <ul className="list">
                            {section.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="list-item">{achievement}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
