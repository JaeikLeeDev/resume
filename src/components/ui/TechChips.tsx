interface TechChipsProps {
  technologies: string[];
  marginBottom?: string;
}

export default function TechChips({ technologies, marginBottom = 'var(--space-md)' }: TechChipsProps) {
  return (
    <div className="tech-container" style={{ marginBottom }}>
      {technologies.map((tech, index) => (
        <span key={index} className="tech-chip">
          {tech}
        </span>
      ))}
    </div>
  );
}
