'use client';

import { useState } from 'react';

// 모바일은 네이티브 공유 시트, 데스크탑은 링크 복사로 폴백
export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* 사용자가 취소한 경우 무시 */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard 불가 환경 무시 */
    }
  };

  return (
    <button onClick={onShare} className="font-semibold text-white/60 transition-colors hover:text-white">
      {copied ? '링크 복사됨 ✓' : '공유하기'}
    </button>
  );
}
