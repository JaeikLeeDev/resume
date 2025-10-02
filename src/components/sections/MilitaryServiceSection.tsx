import { MilitaryServiceDB } from '@/types';

interface MilitaryServiceSectionProps {
    militaryService: MilitaryServiceDB;
}

export default function MilitaryServiceSection({ militaryService }: MilitaryServiceSectionProps) {
    return (
        <div className="details-section">
            <h3 className="text-details-title">{militaryService.title}</h3>
            <div className="text-meta">
                <p>{militaryService.period}</p>
            </div>
        </div>
    );
}
