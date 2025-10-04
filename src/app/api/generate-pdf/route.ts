import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { execSync } from 'child_process';

/**
 * PDF 생성 API 엔드포인트
 * Puppeteer-core + @sparticuz/chromium를 사용하여 현재 이력서 페이지를 PDF로 변환
 * Vercel 환경에 최적화됨
 */
export async function POST(request: NextRequest) {
    console.log('PDF generation started');

    try {
        let browser;

        // 먼저 @sparticuz/chromium 시도 (Vercel 환경에서 최적화됨)
        try {
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
            });
            console.log('Using @sparticuz/chromium');
        } catch (chromiumError) {
            console.log('@sparticuz/chromium failed, falling back to system Chrome:', chromiumError instanceof Error ? chromiumError.message : String(chromiumError));

            // Fallback: 시스템 Chrome 사용
            let executablePath;

            if (process.platform === 'win32') {
                // Windows 환경에서 Chrome 경로 찾기
                const possiblePaths = [
                    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
                    'C:\\Users\\' + process.env.USERNAME + '\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
                    'C:\\Users\\' + process.env.USERNAME + '\\AppData\\Local\\Chromium\\Application\\chrome.exe',
                    'C:\\Program Files\\Chromium\\Application\\chrome.exe',
                    'C:\\Program Files (x86)\\Chromium\\Application\\chrome.exe'
                ];

                for (const path of possiblePaths) {
                    try {
                        execSync(`if exist "${path}" echo found`, { encoding: 'utf8', shell: 'cmd' });
                        executablePath = path;
                        break;
                    } catch (e) {
                        // 다음 경로 시도
                    }
                }
            } else {
                // macOS/Linux 환경에서 Chrome 경로 찾기
                try {
                    executablePath = execSync('which google-chrome-stable || which google-chrome || which chromium || which chromium-browser || which chrome', { encoding: 'utf8' }).trim();
                } catch (error) {
                    // 기본 경로들 시도
                    const possiblePaths = [
                        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                        '/Applications/Chromium.app/Contents/MacOS/Chromium',
                        '/usr/bin/google-chrome',
                        '/usr/bin/chromium-browser',
                        '/usr/bin/chromium'
                    ];

                    for (const path of possiblePaths) {
                        try {
                            execSync(`test -f "${path}"`, { encoding: 'utf8' });
                            executablePath = path;
                            break;
                        } catch (e) {
                            // 다음 경로 시도
                        }
                    }
                }
            }

            if (!executablePath) {
                throw new Error('Chrome executable not found. Please install Google Chrome or Chromium.');
            }

            browser = await puppeteer.launch({
                executablePath,
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor',
                ]
            });
            console.log('Using system Chrome at:', executablePath);
        }

        const page = await browser.newPage();

        // Vercel 환경에서는 VERCEL_URL 자동 사용, 로컬에서는 현재 포트 사용
        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : `http://localhost:${process.env.PORT || 3000}`;
        const targetUrl = `${baseUrl}/`;

        console.log('Navigating to:', targetUrl);

        // 이력서 페이지 로드 (네트워크가 안정될 때까지 대기)
        console.log('Loading page:', targetUrl);
        await page.goto(targetUrl, {
            waitUntil: 'networkidle0',  // 모든 네트워크 요청 완료까지 대기
            timeout: 30000              // 30초 타임아웃
        });
        console.log('Page loaded successfully');

        // PDF 모드 활성화 및 2열 배치 구현
        await page.evaluate(() => {
            // PDF 모드 클래스 추가
            document.body.classList.add('pdf-mode');

            // PDF 레이아웃 적용
            const container = document.querySelector('.container') as HTMLElement;
            if (container) {
                container.classList.add('pdf-mobile-layout');

                // 성경책처럼 2열 텍스트 흐름 적용
                container.style.cssText = 'column-count: 2; column-gap: 3rem; column-fill: auto;';
            }

            // 개인정보 헤더에 PDF 모드 클래스 추가
            const personalHeader = document.querySelector('[style*="display: flex"][style*="justify-content: space-between"]') as HTMLElement;
            if (personalHeader) {
                personalHeader.classList.add('personal-info-header');
            }

            // PDF 출력 시 GitHub Pages 전용 버튼들 숨김 처리
            const pdfButtons = document.querySelectorAll('.pdf-download-button, .pdf-link-button');
            pdfButtons.forEach(button => {
                const htmlButton = button as HTMLElement;
                htmlButton.style.display = 'none';
            });

            // PDF 출력 버튼 섹션 전체 숨김 처리
            const pdfButtonSection = document.querySelector('.center-section') as HTMLElement;
            if (pdfButtonSection) {
                const sectionText = pdfButtonSection.querySelector('p');
                if (sectionText && sectionText.textContent?.includes('PDF 버전으로 이력서를 다운로드하세요')) {
                    pdfButtonSection.style.display = 'none';
                }
            }

            console.log('PDF mode activated with manual 2-column layout and button hiding');
        });

        // PDF 생성 설정 (A4 크기, 배경색 포함)
        console.log('Generating PDF...');
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,      // CSS 배경색 포함
            margin: {
                top: '2cm',
                bottom: '2cm',
                left: '1cm',
                right: '1cm'
            },
            displayHeaderFooter: false
            // preferCSSPageSize 제거 - 웹 화면과 동일하게 렌더링
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