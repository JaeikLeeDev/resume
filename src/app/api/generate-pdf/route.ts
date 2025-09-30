import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

/**
 * PDF 생성 API 엔드포인트
 * Puppeteer를 사용하여 현재 이력서 페이지를 PDF로 변환
 */
export async function POST(request: NextRequest) {
    console.log('PDF generation started');

    try {
        // Puppeteer 브라우저 실행 (Vercel 환경에 최적화된 설정)
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',                    // Vercel 서버리스 환경용
                '--disable-setuid-sandbox',        // 보안 설정
                '--disable-dev-shm-usage',         // 메모리 절약
                '--disable-gpu',                   // GPU 비활성화
                '--memory-pressure-off'            // 메모리 압박 해제
            ]
        });

        const page = await browser.newPage();

        // 환경변수에서 사이트 URL 가져오기 (Vercel 배포 시 자동 설정됨)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const targetUrl = `${baseUrl}/`;

        console.log('Navigating to:', targetUrl);

        // 이력서 페이지 로드 (네트워크가 안정될 때까지 대기)
        await page.goto(targetUrl, {
            waitUntil: 'networkidle0',  // 모든 네트워크 요청 완료까지 대기
            timeout: 30000              // 30초 타임아웃
        });

        // PDF 생성 설정 (A4 크기, 배경색 포함)
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

        await browser.close();
        console.log('PDF generation completed');

        // PDF 파일로 응답
        return new NextResponse(pdf as BodyInit, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"'
            }
        });

    } catch (error) {
        console.error('PDF generation failed:', error);

        return NextResponse.json(
            {
                error: 'PDF generation failed',
                message: error instanceof Error ? error.message : 'Unknown error'
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
