import Link from 'next/link';
import { getAllUseCases, getAllDepartments } from '@/lib/data';
import UseCaseGrid from '@/components/UseCaseGrid';
import FadeIn from '@/components/FadeIn';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';

export default function HomePage() {
  const usecases = getAllUseCases();
  const departments = getAllDepartments();

  return (
    <div>
      {/* Hero — full bleed poster */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

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
                href="https://github.com/hosungseo/gonpunclaw-web"
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
