'use client';

/**
 * PDF 다운로드 버튼 컴포넌트
 * 클라이언트에서 PDF 생성 API를 호출하여 이력서를 PDF로 다운로드
 */
export default function PDFDownloadButton() {
    const handleDownloadPDF = () => {
        const button = document.querySelector('button[data-pdf-button]') as HTMLButtonElement;

        // 버튼 상태 변경 (로딩 중)
        if (button) {
            button.disabled = true;
            button.textContent = '⏳ PDF 생성 중...';
        }

        // PDF 생성 API 호출
        fetch('/api/generate-pdf/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('PDF 생성에 실패했습니다.');
                }
                return response.blob();
            })
            .then(blob => {
                // PDF 파일 다운로드
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resume.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('PDF 다운로드 실패:', error);
                alert('PDF 생성에 실패했습니다. 다시 시도해주세요.');
            })
            .finally(() => {
                // 버튼 상태 복원
                if (button) {
                    button.disabled = false;
                    button.textContent = '📄 PDF 다운로드';
                }
            });
    };

    return (
        <button
            data-pdf-button
            onClick={handleDownloadPDF}
            style={{
                background: 'var(--color-accent)',
                color: 'white',
                border: 'none',
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: 'var(--font-size-body)',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#357ABD'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-accent)'}
        >
            📄 PDF 다운로드
        </button>
    );
}
