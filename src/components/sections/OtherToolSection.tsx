interface OtherTool {
    title: string;
    description: string;
}

interface OtherToolCategory {
    category: string;
    tools: OtherTool[];
}

interface OtherToolSectionProps {
    categories: OtherToolCategory[];
}

export default function OtherToolSection({ categories }: OtherToolSectionProps) {
    return (
        <div>
            {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="item">
                    <h3 className="text-item-title">{category.category}</h3>

                    {category.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="skill-item text-body">
                            <span className="text-item-subtitle">{tool.title}</span>
                            <span className="skill-separator">|</span>
                            <span className="text-body" style={{ marginBottom: 0 }}>{tool.description}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}