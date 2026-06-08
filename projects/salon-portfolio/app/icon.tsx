import { ImageResponse } from 'next/og';

// Make 브랜드 파비콘 — 그라데이션 사각형 위 흰 'M'
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)',
          color: 'white',
          fontSize: 46,
          fontWeight: 900,
          borderRadius: 12,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
