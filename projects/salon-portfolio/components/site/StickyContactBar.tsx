import { SITE } from '@/lib/site-config';

// 전 페이지 하단에 상주하는 판매 전환 바. 데모(다크/라이트) 위에서도 잘 보이게 고대비 다크.
export default function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-zinc-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
        <div className="min-w-0 text-white">
          <span className="text-sm font-bold sm:text-base">
            미용실 홈페이지 {SITE.price.base}
          </span>
          <span className="ml-2 hidden text-xs text-white/55 sm:inline">
            3일 제작 · 디자인 2옵션 · 모바일 기본 포함
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${SITE.contact.phone.replace(/-/g, '')}`}
            className="hidden rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:inline-block"
          >
            전화
          </a>
          <a
            href={SITE.contact.kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FEE500] px-5 py-2 text-sm font-bold text-[#3C1E1E] transition-transform hover:scale-[0.97]"
          >
            카톡으로 1분 문의
          </a>
        </div>
      </div>
    </div>
  );
}
