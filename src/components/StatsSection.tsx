'use client';

import FadeIn from '@/components/FadeIn';
import AnimatedCounter from '@/components/AnimatedCounter';

const stats = [
  { value: 100, suffix: '개', label: 'UseCase' },
  { value: 26, suffix: '개', label: '부처·기관' },
  { value: 6000, suffix: 'h', label: '연간 절감' },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map(({ value, suffix, label }) => (
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
  );
}
