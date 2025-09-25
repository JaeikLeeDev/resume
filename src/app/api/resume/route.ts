import { NextResponse } from 'next/server';
import { getResumeData } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const resumeData = await getResumeData();

        // 디버깅을 위한 로그
        console.log('PersonalInfo photo:', resumeData.personalInfo.photo);

        return NextResponse.json({
            success: true,
            data: resumeData
        });
    } catch (error) {
        console.error('Failed to fetch resume data:', error);

        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Failed to fetch resume data'
        }, { status: 500 });
    }
}
