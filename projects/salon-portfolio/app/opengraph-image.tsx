import { ImageResponse } from 'next/og';

// 카톡/SNS 공유 시 미리보기 카드 이미지
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Make — 미용실 홈페이지 제작 50만원 · 3일';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            width: 700,
            height: 400,
            borderRadius: 9999,
            background: 'radial-gradient(closest-side, rgba(236,72,153,0.5), transparent)',
          }}
        />
        <div
          style={{
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: '-0.05em',
            backgroundImage: 'linear-gradient(90deg, #f472b6, #a78bfa, #818cf8)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Make
        </div>
        <div style={{ marginTop: 16, fontSize: 46, color: '#e4e4e7', fontWeight: 700 }}>
          미용실 홈페이지 제작 · 50만원 · 3일
        </div>
        <div style={{ marginTop: 12, fontSize: 30, color: '#a1a1aa' }}>
          15가지 디자인 · 네이버·카카오·예약·인스타 연동
        </div>
      </div>
    ),
    { ...size }
  );
}
