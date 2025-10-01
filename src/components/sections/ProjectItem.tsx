import TechChips from '@/components/ui/TechChips';

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
            return <div className="text-body" style={{ whiteSpace: 'pre-line' }}>{text}</div>;
        }
    }
    return <div className="text-body" style={{ whiteSpace: 'pre-line' }}>{text}</div>;
}

interface ProjectItemProps {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string;
    contribution?: string;
    github?: string;
    website?: string;
    ios?: string;
    android?: string;
    post?: string;
}

export default function ProjectItem({
    title,
    description,
    period,
    skills,
    details,
    contribution,
    github,
    website,
    ios,
    android,
    post
}: ProjectItemProps) {
    return (
        <div className="item">
            <h3 className="text-subsection-title">{title}</h3>
            <p className="text-meta">{period}</p>

            <p className="text-body">{description}</p>

            {contribution && (
                <p className="text-meta contribution-text">
                    {contribution}
                </p>
            )}

            {skills.length > 0 && (
                <TechChips
                    technologies={skills}
                    marginBottom="var(--space-md)"
                />
            )}

            {details && (
                renderTextWithBullets(details)
            )}

            {(github || website || ios || android || post) && (
                <p className="text-meta" style={{ marginTop: 'var(--space-sm)' }}>
                    {github && (
                        <>
                            <a href={github} className="text-meta" target="_blank" rel="noopener noreferrer">GitHub</a>
                            {(website || ios || android || post) && ' | '}
                        </>
                    )}
                    {website && (
                        <>
                            <a href={website} className="text-meta" target="_blank" rel="noopener noreferrer">Website</a>
                            {(ios || android || post) && ' | '}
                        </>
                    )}
                    {ios && (
                        <>
                            <a href={ios} className="text-meta" target="_blank" rel="noopener noreferrer">iOS</a>
                            {(android || post) && ' | '}
                        </>
                    )}
                    {android && (
                        <>
                            <a href={android} className="text-meta" target="_blank" rel="noopener noreferrer">Android</a>
                            {post && ' | '}
                        </>
                    )}
                    {post && (
                        <a href={post} className="text-meta" target="_blank" rel="noopener noreferrer">Post</a>
                    )}
                </p>
            )}
        </div>
    );
}
