# 미용실 포트폴리오 디자인 시스템

## Brand Philosophy

**Voice**: Clean, Modern, Approachable
**Reference**: Apple Design System (https://oh-my-design.kr/design-systems)

### Core Principles
1. **Mobile-First Always** - 모바일 우선 디자인
2. **Minimalism** - Less is More (미니멀리즘)
3. **Photography-Driven** - 비주얼 중심 스토리텔링
4. **Performance Matters** - 빠른 로딩과 최적화

---

## Design Tokens

### Color Palette (Apple Style)

#### Primary Colors
```css
--color-almost-black: #1D1D1F;      /* Apple 시그니처 다크 그레이 */
--color-light-gray: #F5F5F7;        /* Apple 배경 컬러 */
--color-apple-blue: #0071E3;        /* CTA 버튼용 */
```

#### Text Colors
```css
--color-text-primary: #1D1D1F;      /* 본문 텍스트 */
--color-text-secondary: #86868B;    /* 보조 텍스트 */
--color-text-tertiary: #D2D2D7;     /* 비활성 텍스트 */
```

#### Semantic Colors
```css
--color-success: #30D158;           /* 성공 메시지 */
--color-warning: #FFD60A;           /* 경고 */
--color-error: #FF453A;             /* 에러 */
```

---

### Typography

#### Font Family
- **Heading**: Pretendard Bold (SF Pro Display 대체)
- **Body**: Pretendard Regular (SF Pro Text 대체)
- **Accent**: Pretendard SemiBold

#### Font Scale (Desktop → Mobile)
```css
--font-h1: 48px → 32px;             /* Hero 타이틀 */
--font-h2: 36px → 28px;             /* 섹션 제목 */
--font-h3: 24px → 20px;             /* 서브 제목 */
--font-body: 17px → 15px;           /* 본문 */
--font-caption: 13px → 12px;        /* 캡션 */
```

#### Line Height
```css
--line-height-tight: 1.2;           /* 제목 */
--line-height-normal: 1.5;          /* 본문 */
--line-height-relaxed: 1.8;         /* 긴 텍스트 */
```

#### Letter Spacing
```css
--letter-spacing-tight: -0.02em;    /* 큰 제목 */
--letter-spacing-normal: 0;         /* 본문 */
--letter-spacing-wide: 0.05em;      /* 버튼 텍스트 */
```

---

### Spacing (8px System)

```css
--space-xs: 8px;                    /* 최소 간격 */
--space-sm: 16px;                   /* 작은 간격 */
--space-md: 24px;                   /* 중간 간격 */
--space-lg: 32px;                   /* 큰 간격 */
--space-xl: 48px;                   /* 매우 큰 간격 */
--space-2xl: 64px;                  /* 섹션 간격 */
--space-3xl: 96px;                  /* 대형 섹션 간격 */
```

#### Section Padding
- **Desktop**: 80px (top/bottom)
- **Mobile**: 40px (top/bottom)

#### Container
- **Max Width**: 1200px
- **Padding**: 24px (좌우)

---

### Border Radius (Apple Style)

```css
--radius-sm: 8px;                   /* 카드 */
--radius-md: 12px;                  /* 버튼 */
--radius-lg: 16px;                  /* 큰 카드 */
--radius-xl: 20px;                  /* Hero 이미지 */
--radius-full: 9999px;              /* 원형 */
```

---

### Shadows (Subtle & Soft)

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.12);
```

---

## Component Library

### 1. Button

#### Variants
- **Primary**: Apple Blue, 흰색 텍스트
- **Secondary**: 투명 배경, Apple Blue 테두리
- **Ghost**: 투명 배경, 호버 시 배경색 변경

#### Sizes
- **Small**: 36px height, 14px font
- **Medium**: 44px height, 16px font
- **Large**: 52px height, 18px font

#### States
- **Default**: 기본 상태
- **Hover**: 살짝 어두워짐 (opacity: 0.9)
- **Active**: 더 어두워짐 (opacity: 0.8)
- **Disabled**: 회색 (opacity: 0.5)

---

### 2. Card

#### Variants
- **Default**: 흰색 배경, 작은 그림자
- **Elevated**: 큰 그림자, 호버 효과
- **Flat**: 그림자 없음, 테두리만

#### Properties
- **Border Radius**: 16px
- **Padding**: 24px
- **Shadow**: shadow-md

---

### 3. Image Gallery

#### Layout
- **Grid**: 3열 (Desktop), 2열 (Tablet), 1열 (Mobile)
- **Gap**: 16px
- **Aspect Ratio**: 1:1 (정사각형)

#### Features
- Lightbox 모달 (클릭 시 확대)
- 카테고리 필터 (컷, 펌, 염색, 전체)
- Lazy Loading (스크롤 시 로드)

---

### 4. Hero Section

#### Layout
- **Height**: 100vh (전체 화면)
- **Background**: 큰 이미지 또는 비디오
- **Content**: 중앙 정렬, 흰색 텍스트
- **Overlay**: rgba(0,0,0,0.3) 어두운 오버레이

#### Elements
- 매장명 (H1)
- 태그라인 (Body Large)
- CTA 버튼 2개 (예약하기, 위치 보기)
- 스크롤 인디케이터 (아래 화살표)

---

## Motion & Animation

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

### Hover Effects
- **Button**: Transform scale(1.02)
- **Card**: Shadow elevation
- **Image**: Zoom in (scale: 1.05)

### Scroll Animations
- **Fade In**: Opacity 0 → 1
- **Slide Up**: Transform translateY(20px) → 0
- **Stagger**: 자식 요소 순차 애니메이션

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px;             /* Mobile */
--breakpoint-md: 768px;             /* Tablet */
--breakpoint-lg: 1024px;            /* Desktop */
--breakpoint-xl: 1280px;            /* Large Desktop */
```

---

## Accessibility

### Color Contrast
- **Text on Light Background**: 4.5:1 이상
- **Text on Dark Background**: 4.5:1 이상
- **Interactive Elements**: 3:1 이상

### Focus States
- **Outline**: 2px solid Apple Blue
- **Offset**: 2px

### Keyboard Navigation
- **Tab Order**: 논리적 순서
- **Skip Links**: 메인 콘텐츠로 건너뛰기

---

## Performance

### Image Optimization
- **Format**: WebP (fallback: JPEG)
- **Sizes**: Multiple sizes (responsive)
- **Lazy Loading**: Intersection Observer

### Font Loading
- **Strategy**: font-display: swap
- **Subset**: 한글 + 영문 + 숫자

### Code Splitting
- **Dynamic Import**: 필요한 컴포넌트만 로드
- **Route-based**: 페이지별 번들 분리

---

## References

- **Apple Design**: https://oh-my-design.kr/design-systems
- **Pretendard Font**: https://github.com/orioncactus/pretendard
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **Next.js 16**: https://nextjs.org/docs
