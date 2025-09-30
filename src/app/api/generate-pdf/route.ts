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

        if (process.env.VERCEL) {
            // Vercel 환경: @sparticuz/chromium 사용
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
            });
        } else {
            // 로컬 환경: 시스템 Chrome 자동 감지
            let executablePath;
            try {
                // macOS에서 Chrome 경로 찾기
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
        }

        const page = await browser.newPage();

        // 환경변수에서 사이트 URL 가져오기 (Vercel 배포 시 자동 설정됨)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const targetUrl = `${baseUrl}/`;

        console.log('Navigating to:', targetUrl);

        // 이력서 페이지 로드 (네트워크가 안정될 때까지 대기)
        console.log('Loading page:', targetUrl);
        await page.goto(targetUrl, {
            waitUntil: 'networkidle0',  // 모든 네트워크 요청 완료까지 대기
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