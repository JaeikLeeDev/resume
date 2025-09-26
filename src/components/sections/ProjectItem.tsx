interface ProjectItemProps {
    title: string;
    description: string;
    period: string;
    skills: string[];
    details: string[];
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
                <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                    {skills.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-chip">{tech}</span>
                    ))}
                </div>
            )}

            {details.length > 0 && (
                <ul className="list">
                    {details.filter(detail => detail.trim().length > 0).map((detail, detailIndex) => (
                        <li key={detailIndex} className="list-item">{detail}</li>
                    ))}
                </ul>
            )}

            {(github || website || ios || android || post) && (
                <p className="text-meta" style={{ marginTop: 'var(--space-sm)' }}>
                    {github && (
                        <>
                            <a href={github} className="link" target="_blank" rel="noopener noreferrer">GitHub</a>
                            {(website || ios || android || post) && ' | '}
                        </>
                    )}
                    {website && (
                        <>
                            <a href={website} className="link" target="_blank" rel="noopener noreferrer">Website</a>
                            {(ios || android || post) && ' | '}
                        </>
                    )}
                    {ios && (
                        <>
                            <a href={ios} className="link" target="_blank" rel="noopener noreferrer">iOS</a>
                            {(android || post) && ' | '}
                        </>
                    )}
                    {android && (
                        <>
                            <a href={android} className="link" target="_blank" rel="noopener noreferrer">Android</a>
                            {post && ' | '}
                        </>
                    )}
                    {post && (
                        <a href={post} className="link" target="_blank" rel="noopener noreferrer">Post</a>
                    )}
                </p>
            )}
        </div>
    );
}
