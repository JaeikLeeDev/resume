import { CertificationDB } from '@/types';

interface CertificationSectionProps {
    certifications: CertificationDB[];
}

export default function CertificationSection({ certifications }: CertificationSectionProps) {
    return (
        <div>
            {certifications.map((cert, index) => (
                <div key={index} className="item">
                    <h3 className="text-item-title">{cert.title}</h3>
                    <div className="text-meta">
                        <p>{cert.date} | {cert.number} | {cert.issuer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
