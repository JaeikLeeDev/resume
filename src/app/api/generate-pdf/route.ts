import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

/**
 * PDF 생성 API 엔드포인트
 * Playwright를 사용하여 현재 이력서 페이지를 PDF로 변환
 */
export async function POST(request: NextRequest) {
    console.log('PDF generation started');

    try {
        // Playwright 브라우저 실행 (로컬과 Vercel 모두에서 동일하게 작동)
        const browser = await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--single-process',
                '--no-zygote',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-extensions',
                '--disable-plugins',
                '--disable-images',
                '--disable-javascript',
                '--memory-pressure-off',
                '--disable-background-networking',
                '--disable-default-apps',
                '--disable-sync',
                '--disable-translate',
                '--hide-scrollbars',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-first-run',
                '--safebrowsing-disable-auto-update',
                '--disable-ipc-flooding-protection'
            ]
        });

        const page = await browser.newPage();

        // 환경변수에서 사이트 URL 가져오기 (Vercel 배포 시 자동 설정됨)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const targetUrl = `${baseUrl}/`;

        console.log('Navigating to:', targetUrl);

        // 이력서 페이지 로드 (네트워크가 안정될 때까지 대기)
        console.log('Loading page:', targetUrl);
        await page.goto(targetUrl, {
            waitUntil: 'networkidle',  // 모든 네트워크 요청 완료까지 대기
            timeout: 30000              // 30초 타임아웃
        });
        console.log('Page loaded successfully');

        // PDF 생성 설정 (A4 크기, 배경색 포함)
        console.log('Generating PDF...');
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,      // CSS 배경색 포함
            margin: {
                top: '1cm',
                bottom: '1cm',
                left: '1cm',
                right: '1cm'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: true     // CSS page-break 속성 사용
        });
        console.log('PDF generated successfully, size:', pdf.length, 'bytes');

        await browser.close();
        console.log('Browser closed, PDF generation completed');

        // PDF 파일로 응답
        return new Response(Buffer.from(pdf), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"'
            }
        });

    } catch (error) {
        console.error('PDF generation failed:', error);
        console.error('Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        return NextResponse.json(
            {
                error: 'PDF generation failed',
                message: error instanceof Error ? error.message : 'Unknown error',
                details: process.env.NODE_ENV === 'development' ? 
                    (error instanceof Error ? error.stack : undefined) : undefined
            },
            { status: 500 }
        );
    }
}

// CORS preflight 요청 처리
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}