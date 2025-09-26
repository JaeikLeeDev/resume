interface Tool {
    title: string;
    description: string;
}

interface ToolCategory {
    category: string;
    tools: Tool[];
}

interface ToolSectionProps {
    categories: ToolCategory[];
}

export default function ToolSection({ categories }: ToolSectionProps) {
    return (
        <div>
            {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="item">
                    <h3 className="text-item-title">{category.category}</h3>

                    {category.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="skill-item">
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