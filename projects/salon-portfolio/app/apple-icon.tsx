import { ImageResponse } from 'next/og';

// 애플 터치 아이콘 (홈 화면 추가 시)
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 120,
          fontWeight: 900,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
