'use client';

import { useState } from 'react';

/**
 * PDF 출력 페이지로 이동하는 링크 버튼 컴포넌트
 * 클라이언트 컴포넌트로 이벤트 핸들러 사용 가능
 */
export default function PDFLinkButton() {
    const [isHovered, setIsHovered] = useState(false);

    // 환경변수에서 PDF URL 가져오기, 없으면 현재 도메인 기반으로 생성
    const getPdfUrl = () => {
        // 환경변수가 있으면 사용
        if (process.env.NEXT_PUBLIC_PDF_URL) {
            return process.env.NEXT_PUBLIC_PDF_URL;
        }

        // 클라이언트 사이드에서 현재 도메인 기반으로 생성
        if (typeof window !== 'undefined') {
            const origin = window.location.origin;
            const pathname = window.location.pathname;

            // GitHub Pages인지 확인 (basePath가 /resume인 경우)
            if (pathname.startsWith('/resume')) {
                return `${origin}/resume/`;
            }

            return `${origin}/`;
        }

        // 서버 사이드에서는 GitHub Pages 환경변수 확인
        if (process.env.GITHUB_PAGES === 'true') {
            return 'https://jaeiklee.github.io/resume/';
        }

        // 기본값 (Vercel)
        return 'https://jaeiklee-resume.vercel.app/';
    };

    const pdfUrl = getPdfUrl();

    // 디버깅용 로그
    console.log('PDF URL Debug:', {
        env: process.env.NEXT_PUBLIC_PDF_URL,
        currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'server',
        finalUrl: pdfUrl
    });

    return (
        <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-link-button"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: isHovered ? 'var(--color-accent-dark, #4a90e2)' : 'var(--color-accent)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                transform: isHovered ? 'translateY(-1px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            PDF로 출력하기
        </a>
    );
}
