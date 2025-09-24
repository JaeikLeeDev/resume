interface Skill {
  name: string;
  summary: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillSectionProps {
  categories: SkillCategory[];
}

export default function SkillSection({ categories }: SkillSectionProps) {
  return (
    <div>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="item">
          <h3 className="text-item-title">{category.category}</h3>
          
          {category.skills.map((skill, skillIndex) => (
            <div key={skillIndex} className="skill-item">
              <span className="text-item-subtitle">{skill.name}</span>
              <span className="skill-separator">|</span>
              <span className="text-body" style={{ marginBottom: 0 }}>{skill.summary}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
