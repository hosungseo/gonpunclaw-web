'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

const stagger: { container: Variants; item: Variants } = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
  item: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
};

export default function HeroSection() {
  return (
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
  );
}
