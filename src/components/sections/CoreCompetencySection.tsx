import TechChips from '@/components/ui/TechChips';
import { CoreCompetencyDB } from '@/types';
import { renderTextWithBullets } from '@/lib/textUtils';

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
