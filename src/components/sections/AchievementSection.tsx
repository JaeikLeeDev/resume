import TechChips from '@/components/ui/TechChips';

interface AchievementSection {
    name: string;
    achievements: string[];
    skills: string[];
}

interface AchievementSectionProps {
    sections: AchievementSection[];
}

export default function AchievementSection({ sections }: AchievementSectionProps) {
    return (
        <div>
            {sections.map((section, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{section.name}</h3>

                    {/* Skills를 Tech Chips로 표시 */}
                    {/* {section.skills && section.skills.length > 0 && (
                        <TechChips
                            technologies={section.skills}
                            marginBottom="var(--space-sm)"
                        />
                    )} */}

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
