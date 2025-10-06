import { WorkAchievementDB } from '@/types';
import TechChips from '@/components/ui/TechChips';
import { renderTextWithBullets } from '@/lib/textUtils';

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
