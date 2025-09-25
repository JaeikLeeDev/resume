import TechChips from '@/components/ui/TechChips';

interface CoreCompetency {
    title: string;
    description: string;
    skills: string[];
    examples?: string[];
}

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

                    {/* Examples */}
                    {competency.examples && competency.examples.length > 0 && (
                        <ul className="list">
                            {competency.examples.map((example, exampleIndex) => (
                                <li key={exampleIndex} className="list-item">{example}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
