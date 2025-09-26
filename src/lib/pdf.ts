import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// A4 페이지 크기 (mm)
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const MARGIN = 20;

// PDF 생성 시 사용할 옵션 설정
export interface PDFOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

// HTML 요소를 PDF로 변환
export async function generatePDF(
  elementId: string,
  options: PDFOptions = {}
): Promise<void> {
  const {
    filename = 'resume.pdf',
    quality = 0.98,
    scale = 2,
  } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    // HTML을 캔버스로 변환
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png', quality);
    const imgWidth = A4_WIDTH;
    const pageHeight = A4_HEIGHT;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // jsPDF로 PDF 문서 생성
    const pdf = new jsPDF('p', 'mm', 'a4');

    // 첫 번째 페이지 추가
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 추가 페이지가 필요한 경우
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // PDF 다운로드
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// PDF 출력 시 페이지 나누기를 위한 CSS 스타일 동적 추가
export function addPageBreakStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      .page-break {
        page-break-before: always;
      }
      
      .page-break-after {
        page-break-after: always;
      }
      
      .no-break {
        page-break-inside: avoid;
      }
      
      .resume-page {
        width: 210mm;
        min-height: 297mm;
        margin: 0;
        padding: 20mm;
        box-sizing: border-box;
        background: white;
      }
    }
    
    .resume-container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
      box-shadow: none;
      overflow: hidden;
    }
    
    .resume-page {
      width: 100%;
      min-height: 297mm;
      padding: 20mm;
      box-sizing: border-box;
      background: white;
    }
    
    /* Enhanced Hierarchy for PDF */
    .text-hero {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 2rem;
      color: #000000;
    }
    
    .text-section-title {
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 2.5rem;
      color: #4A90E2;
    }
    
    .text-subsection-title {
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.3;
      margin-bottom: 1rem;
      color: #000000;
    }
    
    .text-item-title {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.3;
      margin-bottom: 0.5rem;
      color: #000000;
    }
    
    .text-item-subtitle {
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 0.5rem;
      color: #666666;
    }
    
    .text-body {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.6;
      color: #000000;
      margin-bottom: 1rem;
    }
    
    .text-meta {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.4;
      color: #999999;
      margin-bottom: 0.75rem;
    }
    
    .text-tech {
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.4;
      color: #666666;
      font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    }
    
    .section {
      margin-bottom: 4rem;
    }
    
    .section:not(:first-child) {
      margin-top: 2.5rem;
    }
    
    .section:last-child {
      margin-bottom: 0;
    }
    
    .item {
      margin-bottom: 2rem;
    }
    
    .item:last-child {
      margin-bottom: 0;
    }
    
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .list-item {
      margin-bottom: 0.25rem;
      position: relative;
      padding-left: 1rem;
    }
    
    .list-item::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #999999;
    }
    
    .link {
      color: #000000;
      text-decoration: none;
      border-bottom: 1px solid #999999;
    }
  `;
  document.head.appendChild(style);
}
