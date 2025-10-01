'use client';

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
  // photo는 이미 Notion API에서 처리된 정적 파일 경로
  // 추가 URL 변환 불필요

  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      <div className="contact-container">
        {photo && (
          <div className="photo-container">
            <img
              src={photo}
              alt="Profile"
              className="profile-photo"
              onError={(e) => {
                console.error('Image load error:', photo);
                console.error('Error details:', e);
                // 이미지 로딩 실패 시 기본 이미지로 대체
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik00MCAxMjBDNDAgMTAwIDU4IDEwMCA4MCAxMDBDMTIyIDEwMCAxNDAgMTAwIDE0MCAxMjBIMTQwVjE2MEg0MFYxMjBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo=';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', photo);
              }}
            />
          </div>
        )}
        <div className="contact-details">
          {email && (
            <div className="contact-row">
              <span className="text-meta">Email.</span>
              <span className="text-body">{email}</span>
            </div>
          )}
          {phone && (
            <div className="contact-row">
              <span className="text-meta">Phone.</span>
              <span className="text-body">{phone}</span>
            </div>
          )}
          {blog && (
            <div className="contact-row">
              <span className="text-meta">Blog.</span>
              <a href={blog.url} className="text-body link" target="_blank" rel="noopener noreferrer">
                {blog.display}
              </a>
            </div>
          )}
          {github && (
            <div className="contact-row">
              <span className="text-meta">Github.</span>
              <a href={github.url} className="text-body link" target="_blank" rel="noopener noreferrer">
                {github.display}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
