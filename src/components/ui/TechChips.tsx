interface TechChipsProps {
  technologies: string[];
}

export default function TechChips({ technologies }: TechChipsProps) {
  return (
    <div className="tech-container">
      {technologies.map((tech, index) => (
        <span key={index} className="tech-chip">
          {tech}
        </span>
      ))}
    </div>
  );
}
