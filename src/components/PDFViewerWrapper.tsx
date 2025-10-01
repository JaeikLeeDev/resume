'use client';

import React from 'react';

interface PDFViewerWrapperProps {
    children: React.ReactNode;
    isPDFMode: boolean;
}

export default function PDFViewerWrapper({ children, isPDFMode }: PDFViewerWrapperProps) {
    if (!isPDFMode) {
        return <>{children}</>;
    }

    // PDF 모드에서는 2열 레이아웃 적용
    return (
        <div className="pdf-layout pdf-mobile-layout">
            <div className="pdf-column">
                {/* 왼쪽 열: 개인정보, 핵심역량, 기술스택, 교육, 기타도구 */}
                {children}
            </div>
        </div>
    );
}
