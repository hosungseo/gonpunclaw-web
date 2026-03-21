'use client';

import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedCounter from '@/components/AnimatedCounter';

const stats = [
  { value: 100, suffix: '개', label: '실전 유스케이스' },
  { value: 26, suffix: '개', label: '부처·기관 맥락' },
  { value: 6000, suffix: 'h', label: '연간 절감 가능 시간' },
];

export default function StatsSection() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">What OpenClaw does</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                공공 API를 모아,
                <br />
                실무자가 바로 쓰는 결과물로 바꿉니다.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                공픈클로는 데이터 수집 자체보다 그 다음 단계를 겨냥합니다. 브리핑, 점검표, 보고서,
                모니터링 결과처럼 실제 업무 문맥에서 바로 쓰는 출력물을 만드는 데 초점을 둡니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map(({ value, suffix, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
                  className="border-t border-slate-300 pt-5"
                >
                  <div className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-600">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
