import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

const principles = [
  {
    title: '판단 주권은 사람에게 남긴다',
    body: 'AI는 수집·정리·비교·초안을 맡고, 정책 판단과 공개 여부, 최종 책임은 사람이 가진다.',
  },
  {
    title: '큰 일을 패킷으로 쪼갠다',
    body: '문제정의 → 자료수집 → 구조화 → 초안 → 검증 → 배포 → 기록으로 나눠, 각 단계의 검토 경계를 분명히 한다.',
  },
  {
    title: '상태파일과 검증 루프를 중시한다',
    body: '좋은 공공 AX는 답변보다 상태기록, source trace, 검증 상태 표기가 남는다.',
  },
];

const usecases = [
  {
    title: '기구·정원 변화 리포트',
    body: '부처별 조직 개편, 정원 증감, 기능 조정을 한눈에 추적하는 실무형 리포트.',
  },
  {
    title: '정책지도 / 지역 비교 탐색기',
    body: '인구·교육·고용·주거 지표를 지도와 비교표로 엮어, 지역 맥락을 읽는 판단도구로 바꾼다.',
  },
  {
    title: '고위공무원 바이브코딩 체험',
    body: '국장급이 직접 AI에게 지시해 업무용 도구를 만들며, 교육보다 빠르게 효능감을 체험하게 한다.',
  },
];

export default function WikiPage() {
  return (
    <div className="bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Wiki</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              공픈클로는 제품이면서,
              <br />
              동시에 작업 방식입니다.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
              공픈클로는 공무원과 현업이 AI를 직접 써서 공공데이터·법령·업무지식을 바탕으로
              자기 업무용 도구를 스스로 만드는 공공 AX 작업환경입니다. 이 페이지는 그 철학과 원리,
              대표 장면을 한눈에 보여주는 위키 허브의 첫 버전입니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#real-usecases"
                className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                실제 사례 보기
              </Link>
              <Link
                href="/#usecases"
                className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                100선 보기
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-5xl gap-14 px-6 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <FadeIn>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Definition</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">공픈클로는 무엇인가</h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                공픈클로는 단순 챗봇도, 전통적 SI의 축소판도 아닙니다. 공공데이터와 업무지식 위에 얹힌
                AI 작업환경으로서, 현업이 직접 지시하고 수정하며 결과물을 만드는 제작형 AX 체계입니다.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="space-y-6 border-l border-slate-200 pl-6">
              <div>
                <div className="text-lg font-semibold">시스템 납품보다 역량 축적</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">외부가 만들어주는 도구보다, 현업이 직접 만들고 고칠 수 있는 역량을 남긴다.</p>
              </div>
              <div>
                <div className="text-lg font-semibold">AI 대체보다 판단 증강</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">AI는 반복과 정리를 맡고, 판단 주권은 사람에게 남긴다.</p>
              </div>
              <div>
                <div className="text-lg font-semibold">도입론보다 실제 제작</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">교육과 구호보다, 실제 도구를 만들어보는 경험을 먼저 만든다.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Principles</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">핵심 원리</h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {principles.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="h-full border-t border-slate-300 pt-5">
                  <div className="text-xl font-semibold text-slate-950">{item.title}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Flagships</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">대표 장면</h2>
          </FadeIn>
          <div className="mt-12 space-y-8">
            {usecases.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-[220px_1fr] md:gap-8">
                  <div className="text-lg font-semibold text-slate-950">{item.title}</div>
                  <p className="text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-300">Next</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              이 위키는 시작점입니다.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
              다음 버전에서는 공픈클로 one-pager, flagship 3선, source archive, 운영 규칙까지 이어 붙여
              철학·데모·실행 방식을 하나의 공개 설명 구조로 확장할 수 있습니다.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
