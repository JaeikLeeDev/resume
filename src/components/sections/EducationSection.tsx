interface Education {
    institution: string;
    degree: string;
    period: string;
    location: string;
}

interface EducationSectionProps {
    education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
    return (
        <div>
            {education.map((edu, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{edu.institution} {edu.degree}</h3>
                    <div className="text-meta">
                        <p>{edu.period} | {edu.location}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
