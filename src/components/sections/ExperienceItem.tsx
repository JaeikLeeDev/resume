import TechChips from '@/components/ui/TechChips';

interface ExperienceItemProps {
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  metadata?: string;
  technologies: string[];
  responsibilities?: {
    title: string;
    items: string[];
  }[];
  links?: {
    label: string;
    url: string;
  }[];
  className?: string;
}

export default function ExperienceItem({
  title,
  subtitle,
  date,
  description,
  metadata,
  technologies,
  responsibilities = [],
  links = [],
  className = 'item'
}: ExperienceItemProps) {
  return (
    <div className={className}>
      <h3 className="text-subsection-title">{title}</h3>
      {subtitle && <p className="text-meta">{subtitle}</p>}
      <p className="text-meta">{date}</p>
      
      <p className="text-body">{description}</p>
      
      {metadata && <p className="text-meta">{metadata}</p>}
      
      <TechChips technologies={technologies} />
      
      {responsibilities.map((section, index) => (
        <div key={index} style={{ marginTop: 'var(--space-lg)' }}>
          <h4 className="text-item-title">{section.title}</h4>
          <ul className="list">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className="list-item">{item}</li>
            ))}
          </ul>
        </div>
      ))}
      
      {links.length > 0 && (
        <p className="text-meta" style={{ marginTop: 'var(--space-sm)' }}>
          {links.map((link, index) => (
            <span key={index}>
              <a href={link.url} className="link" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
              {index < links.length - 1 && ' | '}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
