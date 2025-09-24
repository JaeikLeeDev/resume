'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { generatePDF } from '@/lib/pdf';

interface PDFExportProps {
  elementId?: string;
  filename?: string;
  className?: string;
}

export default function PDFExport({ 
  elementId = 'resume-content', 
  filename = 'jaeik-lee-resume.pdf',
  className = ''
}: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(elementId, { filename });
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isGenerating}
      className={`
        fixed top-4 right-4 z-50
        bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
        text-white px-4 py-2 rounded-lg shadow-lg
        flex items-center gap-2 transition-colors
        ${className}
      `}
    >
      <Download size={16} />
      {isGenerating ? '생성 중...' : 'PDF 다운로드'}
    </button>
  );
}
