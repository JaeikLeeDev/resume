import { MilitaryService } from '@/types';

interface MilitaryServiceSectionProps {
    militaryService: MilitaryService;
}

export default function MilitaryServiceSection({ militaryService }: MilitaryServiceSectionProps) {
    return (
        <div className="item">
            <h3 className="text-item-title">{militaryService.title}</h3>
            <div className="text-meta">
                <p>{militaryService.period}</p>
            </div>
        </div>
    );
}
