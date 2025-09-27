import { EducationDB } from '@/types';

interface EducationSectionProps {
    education: EducationDB[];
}

export default function EducationSection({ education }: EducationSectionProps) {
    return (
        <div>
            {education.map((edu, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{edu.title} {edu.degree}</h3>
                    <div className="text-meta">
                        <p>{edu.period} | {edu.location}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
