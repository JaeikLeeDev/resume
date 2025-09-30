import fs from 'fs';
import path from 'path';

/**
 * Build-time 이미지 다운로드 유틸리티
 * Notion 임시 URL을 정적 파일로 다운로드하여 저장
 */

/**
 * 이미지를 다운로드하여 public 폴더에 저장
 * @param imageUrl Notion 이미지 URL
 * @param fileName 저장할 파일명 (선택사항)
 * @returns 저장된 정적 파일 경로
 */
export async function downloadAndSaveImage(
    imageUrl: string,
    fileName?: string
): Promise<string | null> {
    try {
        // 이미지 다운로드
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Image-Downloader/1.0)',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }

        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        // 파일명 생성
        const finalFileName = fileName || generateFileName(contentType);
        const filePath = path.join(process.cwd(), 'public', 'images', finalFileName);

        // images 디렉토리 생성 (존재하지 않는 경우)
        const imagesDir = path.join(process.cwd(), 'public', 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        // 파일 저장
        await fs.promises.writeFile(filePath, Buffer.from(imageBuffer));

        // 정적 파일 경로 반환
        const staticPath = `/images/${finalFileName}`;
        console.log(`✅ Image saved: ${imageUrl} → ${staticPath}`);

        return staticPath;

    } catch (error) {
        console.error(`❌ Failed to download image: ${imageUrl}`, error);
        return null;
    }
}

/**
 * 파일명 생성
 * @param contentType MIME 타입
 * @returns 고유한 파일명
 */
function generateFileName(contentType: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const extension = getFileExtension(contentType);

    return `notion-${timestamp}-${random}.${extension}`;
}

/**
 * MIME 타입에서 파일 확장자 추출
 * @param contentType MIME 타입
 * @returns 파일 확장자
 */
function getFileExtension(contentType: string): string {
    const extensions: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
        'image/svg+xml': 'svg',
    };
    return extensions[contentType] || 'jpg';
}

/**
 * Notion 이미지 URL인지 확인
 * @param url 이미지 URL
 * @returns Notion 이미지 URL 여부
 */
export function isNotionImageUrl(url: string): boolean {
    return url.includes('notion-static.com') || url.includes('notion.so');
}
