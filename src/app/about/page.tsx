import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: '소개 | 공픈클로',
  description: '공픈클로: 공무원·공공기관 AI 업무자동화 100선 — 책 소개 및 작동 원리',
};

const steps = [
  { icon: '⏰', label: 'cron', desc: '언제 실행할지', color: 'blue' },
  { icon: '📡', label: 'API 호출', desc: '무엇을 가져올지', color: 'indigo' },
  { icon: '🤖', label: 'AI 분석', desc: '어떻게 처리할지', color: 'violet' },
  { icon: '📄', label: '리포트', desc: '어떤 결과를 낼지', color: 'purple' },
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
      {/* Hero */}
      <section className="bg-gray-950 text-white pt-20 pb-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-xs font-mono text-blue-400 tracking-widest uppercase mb-6">Book</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              공픈클로
            </h1>
            <p className="text-xl text-white/60 mb-3">
              공무원·공공기관 AI 업무자동화 100선
            </p>
            <p className="text-sm text-white/30 max-w-lg mx-auto leading-relaxed">
              오픈API와 Claude AI로 설계한 공무원 실전 자동화 플레이북.
              직제 시행규칙에 근거한 100가지 유스케이스.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* API 생태계 통계 */}
      <section className="bg-white border-b border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-sm font-semibold text-gray-400 text-center uppercase tracking-widest mb-10">
              공공 API 생태계
            </h2>
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map(({ value, label, sub }) => (
                <div key={label}>
                  <div className="text-4xl sm:text-5xl font-bold text-blue-700 tabular-nums">{value}</div>
                  <div className="text-sm font-semibold text-gray-700 mt-2">{label}</div>
                  <div className="text-xs text-gray-400 mt-1">{sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 작동 원리 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">작동 원리</h2>
            <p className="text-sm text-gray-400 text-center mb-12">네 단계로 구성된 자동화 파이프라인</p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {steps.map(({ icon, label, desc }, i) => (
              <FadeIn key={label} delay={i * 0.08} direction="up">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm relative">
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block absolute top-1/2 -right-2.5 w-5 h-0.5 bg-gray-200 z-10" />
                  )}
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{label}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                  <div className="mt-3 text-xs font-mono text-blue-500 bg-blue-50 rounded-lg px-2 py-1">
                    Step {i + 1}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 저자 */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">저자</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shrink-0">
                  서
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">서호성</h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">행정안전부 조직국</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    행정안전부 조직국에서 부처 기구·정원 관리, 정부조직법 업무를 담당합니다.
                    AI 시대 정부 효율성과 공공부문 업무자동화에 관심을 갖고
                    실무에 바로 적용 가능한 AI 자동화 사례를 연구·발굴합니다.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-3 text-center">기술 스택</h2>
            <p className="text-sm text-white/40 text-center mb-12">공픈클로를 만드는 도구들</p>
            <div className="space-y-3">
              {stack.map(({ name, desc }) => (
                <div key={name} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                  <span className="font-bold text-blue-400 text-sm w-32 shrink-0 pt-0.5">{name}</span>
                  <span className="text-white/60 text-sm">{desc}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
