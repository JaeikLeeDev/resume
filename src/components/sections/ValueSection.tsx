interface ValueItem {
  title: string;
  items: string[];
}

interface ValueSectionProps {
  values: ValueItem[];
}

export default function ValueSection({ values }: ValueSectionProps) {
  return (
    <div>
      {values.map((value, index) => (
        <div key={index} className="item">
          <h3 className="text-item-title">{value.title}</h3>
          <ul className="list">
            {value.items.map((item, itemIndex) => (
              <li key={itemIndex} className="list-item">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
