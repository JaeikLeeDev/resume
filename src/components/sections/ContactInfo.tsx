interface ContactInfoProps {
  email: string;
  phone: string;
  photo?: string;
  blog?: {
    url: string;
    display: string;
  };
  github?: {
    url: string;
    display: string;
  };
}

export default function ContactInfo({ email, phone, photo, blog, github }: ContactInfoProps) {
  // 디버깅을 위한 로그
  console.log('ContactInfo photo prop:', photo);

  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-lg)' }}>
        {photo && (
          <div style={{ flexShrink: 0 }}>
            <img
              src={photo}
              alt="Profile"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover'
              }}
            />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div className="contact-row">
            <span className="text-meta">Email.</span>
            <span className="text-body">{email}</span>
          </div>
          <div className="contact-row">
            <span className="text-meta">Phone.</span>
            <span className="text-body">{phone}</span>
          </div>
          {blog && (
            <div className="contact-row">
              <span className="text-meta">Blog.</span>
              <a href={blog.url} className="link" target="_blank" rel="noopener noreferrer">
                {blog.display}
              </a>
            </div>
          )}
          {github && (
            <div className="contact-row">
              <span className="text-meta">Github.</span>
              <a href={github.url} className="link" target="_blank" rel="noopener noreferrer">
                {github.display}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
