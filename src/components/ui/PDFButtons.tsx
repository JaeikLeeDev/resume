'use client';

import { useState } from 'react';

/**
 * 플롯 출력 버튼들 컴포넌트
 * 1. 보이는 화면 그대로 (단일 열)
 * 2. 2열 레이아웃
 */
export default function PDFButtons() {
    const [isGenerating, setIsGenerating] = useState<'single' | 'two-column' | null>(null);

    // 환경변수에서 PDF URL 가져오기, 없으면 현재 도메인 기반으로 생성
    const getPdfUrl = (type: 'single' | 'two-column') => {
        // 클라이언트 사이드에서 현재 도메인 기반으로 생성
        if (typeof window !== 'undefined') {
            const origin = window.location.origin;
            const pathname = window.location.pathname;

            // GitHub Pages인지 확인 (basePath가 /resume인 경우)
            if (pathname.startsWith('/resume')) {
                const baseUrl = `${origin}/resume`;
                return type === 'single'
                    ? `${baseUrl}/api/generate-pdf-single`
                    : `${baseUrl}/api/generate-pdf`;
            }

            return type === 'single'
                ? `${origin}/api/generate-pdf-single`
                : `${origin}/api/generate-pdf`;
        }

        // 환경변수가 있으면 사용
        if (process.env.NEXT_PUBLIC_PDF_URL) {
            const baseUrl = process.env.NEXT_PUBLIC_PDF_URL;
            return type === 'single'
                ? `${baseUrl}api/generate-pdf-single`
                : `${baseUrl}api/generate-pdf`;
        }

        // 서버 사이드에서는 GitHub Pages 환경변수 확인
        if (process.env.GITHUB_PAGES === 'true') {
            const baseUrl = 'https://jaeiklee.github.io/resume';
            return type === 'single'
                ? `${baseUrl}/api/generate-pdf-single`
                : `${baseUrl}/api/generate-pdf`;
        }

        // 기본값 (로컬 개발 환경)
        return type === 'single'
            ? '/api/generate-pdf-single'
            : '/api/generate-pdf';
    };

    const handlePlotGeneration = async (type: 'single' | 'two-column') => {
        setIsGenerating(type);

        try {
            // 플롯 생성 시뮬레이션 (실제로는 PDF 생성하지 않음)
            console.log(`Generating ${type} plot...`);

            // 2초 대기 (로딩 효과)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 성공 메시지 표시
            alert(`${type === 'single' ? '단일 열' : '2열'} 플롯이 생성되었습니다! (실제로는 PDF가 생성되지 않습니다)`);

        } catch (error) {
            console.error('Plot generation error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`플롯 생성 중 오류가 발생했습니다: ${errorMessage}`);
        } finally {
            setIsGenerating(null);
        }
    };

    const buttonStyle = (isActive: boolean) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        backgroundColor: isActive ? 'var(--color-accent-dark, #4a90e2)' : 'var(--color-accent)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        boxShadow: isActive ? '0 4px 8px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
        cursor: isActive ? 'pointer' : 'pointer',
        border: 'none',
        opacity: isGenerating ? 0.7 : 1
    });

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '12px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            className="pdf-buttons-container"
        >
            {/* 단일 열 플롯 버튼 */}
            <button
                onClick={() => handlePlotGeneration('single')}
                disabled={isGenerating !== null}
                style={buttonStyle(isGenerating === 'single')}
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
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                </svg>
                {isGenerating === 'single' ? '생성 중...' : '단일 열 이력서 출력'}
            </button>

            {/* 2열 플롯 버튼 */}
            <button
                onClick={() => handlePlotGeneration('two-column')}
                disabled={isGenerating !== null}
                style={buttonStyle(isGenerating === 'two-column')}
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
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                </svg>
                {isGenerating === 'two-column' ? '생성 중...' : '2열 이력서 포맷 출력'}
            </button>
        </div>
    );
}
