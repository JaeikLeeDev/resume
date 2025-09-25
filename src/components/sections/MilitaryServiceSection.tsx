interface MilitaryService {
    name: string;
    period: string;
}

interface MilitaryServiceSectionProps {
    militaryService: MilitaryService;
}

export default function MilitaryServiceSection({ militaryService }: MilitaryServiceSectionProps) {
    return (
        <div className="item">
            <h3 className="text-item-title">{militaryService.name}</h3>
            <div className="text-meta">
                <p>{militaryService.period}</p>
            </div>
        </div>
    );
}
