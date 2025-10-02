import { ValueDB } from '@/types';

// Bullet point 텍스트를 렌더링하는 헬퍼 함수
function renderTextWithBullets(text: string) {
  if (text.startsWith('BULLET_LIST:')) {
    try {
      const bulletItems = JSON.parse(text.substring(12));
      return (
        <ul className="list">
          {bulletItems.map((item: string, index: number) => (
            <li key={index} className="list-item">{item}</li>
          ))}
        </ul>
      );
    } catch (error) {
      console.error('Error parsing bullet list:', error);
      return <div className="text-body text-pre-line">{text}</div>;
    }
  }
  return <div className="text-body text-pre-line">{text}</div>;
}

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
