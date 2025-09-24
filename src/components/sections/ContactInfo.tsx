interface ContactInfoProps {
  email: string;
  phone: string;
  blog: {
    url: string;
    display: string;
  };
  github: {
    url: string;
    display: string;
  };
}

export default function ContactInfo({ email, phone, blog, github }: ContactInfoProps) {
  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      <div className="contact-row">
        <span className="text-meta">Email.</span>
        <span className="text-body">{email}</span>
      </div>
      <div className="contact-row">
        <span className="text-meta">Phone.</span>
        <span className="text-body">{phone}</span>
      </div>
      <div className="contact-row">
        <span className="text-meta">Blog.</span>
        <a href={blog.url} className="link" target="_blank" rel="noopener noreferrer">
          {blog.display}
        </a>
      </div>
      <div className="contact-row">
        <span className="text-meta">Github.</span>
        <a href={github.url} className="link" target="_blank" rel="noopener noreferrer">
          {github.display}
        </a>
      </div>
    </div>
  );
}
