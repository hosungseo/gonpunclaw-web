'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { getAllUseCases, getAllDepartments } from '@/lib/data';
import UseCaseGrid from '@/components/UseCaseGrid';
import FadeIn from '@/components/FadeIn';
import AnimatedCounter from '@/components/AnimatedCounter';

const stagger: { container: Variants; item: Variants } = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
  item: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
};

export default function HomePage() {
  const usecases = getAllUseCases();
  const departments = getAllDepartments();

  return (
    <div>
      {/* Hero — full bleed poster */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 overflow-hidden -mt-14 pt-14">
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={stagger.item}>
              <span className="inline-block text-xs font-mono text-blue-400 tracking-widest uppercase mb-2 border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10">
                공무원 AI 업무자동화
              </span>
            </motion.div>

            <motion.h1
              variants={stagger.item}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight"
            >
              공픈클로
            </motion.h1>

            <motion.p
              variants={stagger.item}
              className="text-xl sm:text-2xl text-blue-200/80 font-light max-w-xl"
            >
              공무원·공공기관 AI 업무자동화 100선
            </motion.p>

            <motion.p
              variants={stagger.item}
              className="text-sm text-white/40 max-w-lg leading-relaxed"
            >
              오픈API + Claude 기반 실전 자동화 설계.
              직제 시행규칙에 근거한 100개 유스케이스.
            </motion.p>

            <motion.div variants={stagger.item} className="flex items-center gap-4 mt-2">
              <Link
                href="#usecases"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-900/50"
              >
                유스케이스 탐색 →
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-xl transition-colors border border-white/10"
              >
                책 소개
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-xs flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-6 bg-white/20"
          />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <FadeIn>
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: 100, suffix: '개', label: 'UseCase' },
                { value: 26, suffix: '개', label: '부처·기관' },
                { value: 6000, suffix: 'h', label: '연간 절감' },
              ].map(({ value, suffix, label }) => (
                <div key={label}>
                  <div className="text-4xl sm:text-5xl font-bold text-blue-700 tabular-nums">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </div>
                  <div className="text-sm text-gray-400 mt-2 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* UseCase Grid */}
      <section id="usecases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">유스케이스</h2>
            <p className="text-sm text-gray-500">부처·난이도별 필터로 원하는 자동화를 찾으세요.</p>
          </div>
        </FadeIn>
        <UseCaseGrid usecases={usecases} departments={departments} />
      </section>

      {/* CTA */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <FadeIn>
            <p className="text-xs font-mono text-blue-400 tracking-widest uppercase mb-6">책 소개</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              공픈클로: 공무원·공공기관<br />AI 업무자동화 100선
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              17,163개 공공 오픈API × Claude AI. 행정안전부 직제를 기반으로 설계한 실전 자동화 플레이북.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                자세히 보기
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-xl transition-colors border border-white/10"
              >
                GitHub →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
