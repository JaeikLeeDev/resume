'use client';

import { useState } from 'react';

interface ContactInfoProps {
  email: string;
  phone: string;
  blog?: {
    url: string;
    display: string;
  };
  github?: {
    url: string;
    display: string;
  };
}

export default function ContactInfo({ email, phone, blog, github }: ContactInfoProps) {
  // 프로필 사진은 repo 내 정적 파일로 관리
  // public/images/profile.jpg 파일이 있으면 표시, 없으면 표시하지 않음
  const [showPhoto, setShowPhoto] = useState(true);

  const handleImageError = () => {
    // 이미지 로드 실패 시 프로필 사진 섹션 자체를 숨김
    setShowPhoto(false);
  };

  return (
    <div className="margin-bottom-lg">
      <div className="contact-container">
        {showPhoto && (
          <div className="photo-container">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="profile-photo"
              onError={handleImageError}
            />
          </div>
        )}
        <div className="contact-details">
          {email && (
            <div className="contact-row">
              <span className="text-meta">Email.</span>
              <span className="text-contact">{email}</span>
            </div>
          )}
          {phone && (
            <div className="contact-row">
              <span className="text-meta">Phone.</span>
              <span className="text-contact">{phone}</span>
            </div>
          )}
          {blog && (
            <div className="contact-row">
              <span className="text-meta">Blog.</span>
              <a href={blog.url} className="text-contact link" target="_blank" rel="noopener noreferrer">
                {blog.display}
              </a>
            </div>
          )}
          {github && (
            <div className="contact-row">
              <span className="text-meta">Github.</span>
              <a href={github.url} className="text-contact link" target="_blank" rel="noopener noreferrer">
                {github.display}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
