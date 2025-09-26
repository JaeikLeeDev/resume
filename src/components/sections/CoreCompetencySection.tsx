import TechChips from '@/components/ui/TechChips';

import { CoreCompetency } from '@/types';

interface CoreCompetencySectionProps {
    competencies: CoreCompetency[];
}

export default function CoreCompetencySection({ competencies }: CoreCompetencySectionProps) {
    return (
        <div>
            {competencies.map((competency, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{competency.title}</h3>

                    {/* Skills를 Tech Chips로 표시 */}
                    {competency.skills && competency.skills.length > 0 && (
                        <TechChips
                            technologies={competency.skills}
                            marginBottom="var(--space-sm)"
                        />
                    )}

                    {/* Description */}
                    <p className="text-body">{competency.description}</p>

                    {/* Details */}
                    {competency.details && competency.details.length > 0 && (
                        <ul className="list">
                            {competency.details.filter(detail => detail.trim().length > 0).map((detail, detailIndex) => (
                                <li key={detailIndex} className="list-item">{detail}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
