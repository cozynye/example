# money-1: 코딩 수익화 리서치 & 마케팅

> 코딩으로 주 10만원 벌기 프로젝트 - 아이디어 조사 & 실행 허브

## 목표
- **단기**: 주 10만원(월 40만원) 수익 달성
- **방법**: 특정 사용자에게 특정 서비스를 만들어 제공
- **이 프로젝트**: 조사 → 평가 → 개발 → 마케팅 전 과정을 한곳에서

## 현재 아이디어 평가

| 아이디어 | 점수 | 상태 |
|---------|------|------|
| 카페 예약 관리 시스템 | 4.15 | 즉시 실행 |
| 크몽 자동화 봇 서비스 | 3.65 | 보류 |
| AI 콘텐츠 재활용 도구 | 3.50 | 보류 |

## 대시보드

정적 대시보드 페이지에서 리서치/아이디어를 한눈에 확인:

```bash
# 빌드 (마크다운 → data.json)
node scripts/build.js

# 로컬에서 보기
npx serve site
# 또는 site/index.html을 브라우저에서 열기
```

## 재조사 (GitHub Actions)

- **수동 트리거**: GitHub > Actions > "재조사 & 빌드" > Run workflow
- **자동 실행**: 매주 월요일 오전 9시 (KST)
- GitHub Pages로 자동 배포

## 구조
```
site/             → 정적 대시보드 페이지
scripts/          → 빌드 & 자동화 스크립트
research/         → 시장조사, 트렌드, 채널 분석
ideas/            → 아이디어 평가 (스코어링)
marketing/        → 전략, 런칭 계획
dashboard/        → 수익 트래킹
logs/             → 주간 로그
resources/        → 참고 링크, 도구
projects/         → 실제 개발 프로젝트들
.github/workflows → GitHub Actions
```
