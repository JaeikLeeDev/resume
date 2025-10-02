'use client';

import { useState, useRef } from 'react';

/**
 * PDF 다운로드 버튼 컴포넌트
 * 클라이언트에서 PDF 생성 API를 호출하여 이력서를 PDF로 다운로드
 */
export default function PDFDownloadButton() {
    const [isLoading, setIsLoading] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleDownloadPDF = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            // Puppeteer-core + @sparticuz/chromium를 사용하는 API 엔드포인트
            const response = await fetch('/api/generate-pdf/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `PDF 생성에 실패했습니다. (${response.status})`);
            }

            const blob = await response.blob();

            // PDF 파일 다운로드
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('PDF 다운로드 실패:', error);
            const errorMessage = error instanceof Error ? error.message : 'PDF 생성에 실패했습니다. 다시 시도해주세요.';
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '12px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            className="pdf-download-container"
        >
            <button
                ref={buttonRef}
                className="pdf-download-button"
                onClick={handleDownloadPDF}
                disabled={isLoading}
                style={{
                    background: 'var(--color-accent)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: isLoading ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(0)',
                    width: '100%',
                    justifyContent: 'center'
                }}
                onMouseOver={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.background = 'var(--color-accent-dark, #4a90e2)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--color-accent)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
                title="2열 이력서 포맷으로 PDF 다운로드"
            >
                {isLoading ? (
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
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" values="0 12 12;360 12 12" />
                        </path>
                    </svg>
                ) : (
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
                )}
                <span>{isLoading ? '생성 중...' : '2열 이력서 PDF 출력'}</span>
            </button>
        </div>
    );
}
