'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

const stagger: { container: Variants; item: Variants } = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
  item: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  },
};

const flowSteps = [
  '질문 수신',
  '공공 API 호출',
  'AI 분석',
  '행정 결과물 생성',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(74,144,226,0.34),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(67,56,202,0.18),_transparent_28%),linear-gradient(135deg,_#04111f_0%,_#0b1f39_45%,_#091524_100%)] -mt-14 min-h-[calc(100svh-0px)] pt-14 text-white">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,17,31,0.1),rgba(4,17,31,0.45)_60%,rgba(4,17,31,0.75))]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-56px)] max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-10">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={stagger.item}
            className="mb-5 text-[11px] font-mono uppercase tracking-[0.36em] text-cyan-300/80"
          >
            Public data automation for government work
          </motion.p>

          <motion.h1
            variants={stagger.item}
            className="text-[clamp(4rem,10vw,8.8rem)] font-black leading-[0.88] tracking-[-0.08em] text-white"
          >
            공픈클로
          </motion.h1>

          <motion.p
            variants={stagger.item}
            className="mt-6 max-w-lg text-[clamp(1.2rem,2vw,1.7rem)] font-medium leading-snug text-slate-100"
          >
            공공데이터를 읽고, 행정 결과물로 바꾸는 실무형 AI 자동화.
          </motion.p>

          <motion.p
            variants={stagger.item}
            className="mt-4 max-w-md text-sm leading-7 text-slate-300"
          >
            질문 하나로 API를 묶고, 분석하고, 보고서·브리핑·점검표까지 바로 만드는 100개 유스케이스.
          </motion.p>

          <motion.div variants={stagger.item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#usecases"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              100개 유스케이스 보기
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/6 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/12"
            >
              실제 대시보드 체험
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32, y: 14 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-6 top-10 hidden rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium text-cyan-100 lg:block"
          >
            질문 → 호출 → 분석 → 결과물
          </motion.div>

          <div className="relative overflow-hidden rounded-[34px] border border-white/14 bg-white/8 shadow-[0_30px_120px_rgba(2,12,27,0.5)] backdrop-blur-xl">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950">공</div>
                <div>
                  <div className="text-sm font-semibold text-white">공픈클로 에이전트</div>
                  <div className="text-xs text-slate-300">OpenClaw · 행정 자동화 워크플로우</div>
                </div>
                <div className="ml-auto flex items-center gap-2 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  online
                </div>
              </div>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div className="ml-auto max-w-[78%] rounded-[22px] rounded-br-md bg-cyan-400 px-4 py-3 text-sm font-medium leading-6 text-slate-950 shadow-lg shadow-cyan-950/20">
                이번 주 세종시 현황 정리해줘. 인구이동이랑 아파트, 미세먼지도 같이.
              </div>

              <div className="max-w-[88%] rounded-[26px] rounded-bl-md bg-slate-950/70 px-4 py-4 text-sm leading-6 text-slate-100 ring-1 ring-white/8">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.24em] text-cyan-300/70">
                  <span>live workflow</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid gap-2 text-slate-200/92 sm:grid-cols-2">
                  {flowSteps.map((step, idx) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0.55, x: 10 }}
                      animate={{ opacity: [0.55, 1, 0.82], x: [10, 0, 0] }}
                      transition={{ delay: 0.35 + idx * 0.18, duration: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/8 text-[11px] font-semibold text-cyan-200">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,247,255,0.96))] p-5 text-slate-900 shadow-[0_18px_60px_rgba(3,15,36,0.22)]"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.24em] text-slate-400">weekly brief</div>
                    <div className="mt-1 text-lg font-bold">세종시 주간 점검 브리핑</div>
                  </div>
                  <div className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-cyan-300">자동 생성</div>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  <p><strong className="text-slate-950">인구이동</strong> 서울→세종 전입이 직전 주 대비 증가했습니다.</p>
                  <p><strong className="text-slate-950">아파트</strong> 평균 실거래가는 상승, 거래량은 보합입니다.</p>
                  <p><strong className="text-slate-950">대기질</strong> PM10은 보통 수준으로 외부활동 제약은 크지 않습니다.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
