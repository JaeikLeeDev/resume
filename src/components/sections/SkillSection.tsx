import TechChips from '@/components/ui/TechChips';

interface Skill {
  name: string[];
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
        <div key={categoryIndex} className="details-section">
          <h3 className="text-details-title">{category.category}</h3>

          {/* 기술들을 TechChips로 표시 */}
          <TechChips
            technologies={category.skills.flatMap(skill => skill.name)}
            marginBottom="var(--space-sm)"
          />
        </div>
      ))}
    </div>
  );
}
