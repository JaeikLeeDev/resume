import React from 'react';

/**
 * Bullet point 텍스트를 렌더링하는 공통 유틸리티 함수
 * Notion에서 가져온 텍스트를 HTML 리스트로 변환
 * BULLET_LIST 형태의 텍스트는 자동으로 bullet list로 변환
 */
export function renderTextWithBullets(text: string) {
    if (text.startsWith('BULLET_LIST:')) {
        try {
            const bulletItems = JSON.parse(text.substring(12));
            return (
                <ul className="list">
                    {bulletItems.map((item: string, index: number) => (
                        <li key={index} className="list-item">{item}</li>
                    ))}
                </ul>
            );
        } catch (error) {
            console.error('Error parsing bullet list:', error);
            // 파싱 실패시 원본 텍스트를 그대로 표시 (BULLET_LIST 제거)
            return <div className="text-body text-pre-line">{text.replace('BULLET_LIST:', '')}</div>;
        }
    }
    return <div className="text-body text-pre-line">{text}</div>;
}
