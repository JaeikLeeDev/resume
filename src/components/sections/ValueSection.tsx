import { ValueDB } from '@/types';
import { renderTextWithBullets } from '@/lib/textUtils';

interface ValueSectionProps {
  values: ValueDB[];
}

export default function ValueSection({ values }: ValueSectionProps) {
  return (
    <div>
      {values.map((value, index) => (
        <div key={index} className="details-section">
          <h3 className="text-details-title">{value.title}</h3>
          {value.details && (
            renderTextWithBullets(value.details)
          )}
        </div>
      ))}
    </div>
  );
}
