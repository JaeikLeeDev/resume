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
            {typeof value.detail === 'string'
              ? value.detail.split(';').filter(item => item.trim().length > 0).map((item, itemIndex) => (
                <li key={itemIndex} className="list-item">{item.trim()}</li>
              ))
              : Array.isArray(value.detail)
                ? value.detail.filter(item => item.trim().length > 0).map((item, itemIndex) => (
                  <li key={itemIndex} className="list-item">{item}</li>
                ))
                : <li className="list-item">{String(value.detail)}</li>
            }
          </ul>
        </div>
      ))}
    </div>
  );
}
