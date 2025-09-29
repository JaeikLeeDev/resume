import { ValueDB } from '@/types';

interface ValueSectionProps {
  values: ValueDB[];
}

export default function ValueSection({ values }: ValueSectionProps) {
  return (
    <div>
      {values.map((value, index) => (
        <div key={index} className="item">
          <h3 className="text-item-title">{value.title}</h3>
          <ul className="list">
            {value.details.split(';').filter(item => item.trim().length > 0).map((item, itemIndex) => (
              <li key={itemIndex} className="list-item">{item.trim()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
