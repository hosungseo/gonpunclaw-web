import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: '소개 | 공픈클로',
  description: '공픈클로: 공공데이터를 업무 결과물로 바꾸는 공공업무 자동화 플레이북 플랫폼',
};

const steps = [
  { icon: '⏰', label: 'cron', desc: '언제 실행할지' },
  { icon: '📡', label: 'API 호출', desc: '무엇을 가져올지' },
  { icon: '🤖', label: 'AI 분석', desc: '어떻게 처리할지' },
  { icon: '📄', label: '리포트', desc: '어떤 결과를 낼지' },
];

const principles = [
  {
    title: 'Research-first',
    body: '공픈클로는 바로 답을 꾸미지 않습니다. 먼저 문맥, 법령, API, 데이터 구조를 확인하고 시작합니다.',
  },
  {
    title: 'Verification loop',
    body: '자동화는 구현보다 검증이 중요합니다. build, 실제 응답, 화면, 산출물 확인을 기본 단계로 둡니다.',
  },
  {
    title: 'Quality gate',
    body: '작업이 끝났는지는 결과물의 정확성, 안전성, 재현성, 기록 가능성까지 보고 판단합니다.',
  },
];

const stats = [
  { value: '17,163', label: '오픈API', sub: '공공데이터포털 등록' },
  { value: '12,022', label: '서비스', sub: '활용 가능한 공공 서비스' },
  { value: '25', label: '부처', sub: '중앙행정기관' },
];

const stack = [
  { name: 'OpenClaw', desc: 'AI 에이전트 실행 환경. cron·API·메모리 관리.' },
  { name: 'Claude', desc: 'Anthropic AI. 데이터 분석·리포트 생성·판단.' },
  { name: '공공데이터포털', desc: '17,163개 공공 오픈API 허브. data.go.kr.' },
  { name: 'Next.js', desc: '이 웹 서비스. 유스케이스 탐색 UI.' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-[linear-gradient(135deg,#07111d_0%,#0a1f37_48%,#091624_100%)] pt-20 pb-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <p className="mb-6 text-xs font-mono uppercase tracking-[0.32em] text-cyan-300">About GonpunClaw</p>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              공픈클로는
              <br />
              공공업무용 AI 자동화 플레이북입니다.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              오픈API와 AI를 붙이는 데서 멈추지 않고, 실제 실무자가 바로 사용할 수 있는 브리핑·점검표·보고서로
              결과를 바꾸는 방식을 정리한 플레이북 플랫폼입니다.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              공공 API 생태계
            </h2>
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map(({ value, label, sub }) => (
                <div key={label}>
                  <div className="text-4xl font-bold tracking-tight text-cyan-700 sm:text-5xl">{value}</div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">{label}</div>
                  <div className="mt-1 text-xs text-slate-400">{sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold text-slate-950 sm:text-3xl">작동 원리</h2>
            <p className="mt-3 text-center text-sm leading-7 text-slate-500">네 단계 자동화 파이프라인으로 작동합니다.</p>
          </FadeIn>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {steps.map(({ icon, label, desc }, i) => (
              <FadeIn key={label} delay={i * 0.08} direction="up">
                <div className="border-t border-slate-300 bg-white px-5 py-6 text-center">
                  <div className="mb-3 text-3xl">{icon}</div>
                  <div className="text-sm font-bold text-slate-950">{label}</div>
                  <div className="mt-2 text-xs leading-6 text-slate-500">{desc}</div>
                  <div className="mt-4 text-[11px] font-mono uppercase tracking-[0.24em] text-cyan-700">Step {i + 1}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <div className="max-w-xl">
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Operating philosophy</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                공픈클로는 답변보다
                <br />
                운영 원칙을 먼저 세웁니다.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                먼저 조사하고, 검증하고, 기록하는 흐름을 중심에 둡니다. 공공업무 자동화는 멋진 문장보다
                근거와 재현성이 더 중요하다고 보기 때문입니다.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            {principles.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="border-l border-slate-300 pl-5">
                  <div className="text-lg font-semibold text-slate-950">{item.title}</div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Why 100 usecases</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                왜 100개의 유스케이스인가
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                공공업무 자동화는 하나의 데모로 설명되지 않습니다. 공픈클로는 조직, 법령, 통계, 민원, 부동산,
                관보, 정책 점검처럼 서로 다른 장면을 100개의 유스케이스로 펼쳐 보이며 자동화의 범위를 보여주려 합니다.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                숫자를 늘리기 위한 100선이 아니라, 공공데이터와 AI가 어디까지 실무에 들어갈 수 있는지를 체계적으로
                보여주기 위한 100선입니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-6">
          <FadeIn>
            <h2 className="mb-10 text-center text-2xl font-bold text-slate-950">저자</h2>
            <div className="border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-cyan-700 text-xl font-bold text-white">
                  서
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-bold text-slate-950">서호성</h3>
                  <p className="mb-4 text-sm font-medium text-cyan-700">행정안전부 조직국</p>
                  <p className="text-sm leading-7 text-slate-600">
                    행정안전부 조직국에서 부처 기구·정원 관리, 정부조직법 업무를 담당합니다. AI 시대 정부 효율성과
                    공공부문 업무자동화에 관심을 갖고, 실무에 바로 적용 가능한 자동화 사례를 연구·발굴합니다.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="mb-3 text-center text-2xl font-bold">기술 스택</h2>
            <p className="mb-12 text-center text-sm text-white/40">공픈클로를 만드는 도구들</p>
            <div className="space-y-3">
              {stack.map(({ name, desc }) => (
                <div key={name} className="flex items-start gap-4 border border-white/10 bg-white/5 px-6 py-4">
                  <span className="w-32 shrink-0 pt-0.5 text-sm font-bold text-cyan-300">{name}</span>
                  <span className="text-sm text-white/70">{desc}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
