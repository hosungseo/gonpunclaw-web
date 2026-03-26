import Link from 'next/link';
import { getAllUseCases, getAllDepartments } from '@/lib/data';
import UseCaseGrid from '@/components/UseCaseGrid';
import FadeIn from '@/components/FadeIn';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import realUsecasesData from '@/data/real-usecases.json';

const realUsecases = realUsecasesData.usecases;

const valuePillars = [
  {
    title: '공개데이터를 활용합니다',
    body: '각 기관이 이미 공개한 API와 데이터를 우선 활용해 보안 부담과 도입 장벽을 낮춥니다.',
  },
  {
    title: '자동으로 찾아옵니다',
    body: '질문을 받으면 필요한 소스를 먼저 탐색하고, 바로 쓸 데이터를 자동으로 모읍니다.',
  },
  {
    title: '여러 데이터를 복합분석합니다',
    body: '공공데이터포털·KOSIS·ECOS·법령 데이터처럼 성격이 다른 출처를 교차해 맥락을 만듭니다.',
  },
];

const operatingPrinciples = [
  {
    no: '01',
    title: 'Research-first',
    body: '바로 구현하지 않고 먼저 맥락과 근거를 확인합니다. 법령, API, 데이터 구조를 먼저 읽고 시작합니다.',
  },
  {
    no: '02',
    title: 'Verification loop',
    body: '끝났다고 말하기 전에 build, 응답, 화면, 산출물을 확인합니다. 완료는 구현이 아니라 검증까지입니다.',
  },
  {
    no: '03',
    title: 'Quality gate',
    body: '요청 충족, 안전, 재현성, 기록까지 보고 작업을 닫습니다. 다음 세션이 바로 이어받을 수 있어야 합니다.',
  },
];

const productScenes = [
  {
    title: '주간 브리핑',
    body: '공개데이터를 자동으로 찾아와 법안, 관보, 인구이동, 실거래가를 한 장짜리 상황판으로 엮습니다.',
  },
  {
    title: '정책 점검',
    body: '부처별 기능과 직제 근거를 교차해 빠진 근거와 중복 영역을 드러내고 점검 문서로 정리합니다.',
  },
  {
    title: '현장 대응',
    body: '실시간 지표와 행정 데이터를 함께 읽어 오늘 바로 의사결정에 쓸 수 있는 문장으로 바꿉니다.',
  },
];

export default function HomePage() {
  const usecases = getAllUseCases();
  const departments = getAllDepartments();

  return (
    <div>
      <HeroSection />
      <StatsSection />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <FadeIn>
            <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="max-w-xl">
                <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Operating model</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  공픈클로는 공공업무 자동화를 위한
                  <br />
                  결과물 중심 플레이북 플랫폼입니다.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  좋은 공공업무 자동화는 API를 많이 붙이는 데서 끝나지 않습니다. 공개데이터를 활용하고,
                  필요한 소스를 자동으로 찾고, 여러 데이터를 복합분석해 브리핑·보고서·점검표 같은 결과 문서까지 닿아야 실제로 쓸 수 있습니다.
                </p>
              </div>

              <div className="space-y-8">
                {valuePillars.map((item, index) => (
                  <FadeIn key={item.title} delay={index * 0.08}>
                    <div className="border-l border-slate-300 pl-5">
                      <div className="text-lg font-semibold text-slate-950">{item.title}</div>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">{item.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="max-w-xl">
                <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">How it works</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  공픈클로는 번듯한 답변보다,
                  <br />
                  검증 가능한 자동화를 지향합니다.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  공공업무에 맞는 운영 원칙을 중심에 둡니다. 먼저 조사하고,
                  검증하고, 기록하는 방식이 공픈클로의 기본 동작입니다.
                </p>
              </div>

              <div className="space-y-8">
                {operatingPrinciples.map((item, index) => (
                  <FadeIn key={item.no} delay={index * 0.08}>
                    <div className="grid gap-3 border-t border-slate-300 pt-5 sm:grid-cols-[72px_1fr] sm:gap-6">
                      <div className="text-sm font-mono tracking-[0.24em] text-cyan-700">{item.no}</div>
                      <div>
                        <div className="text-lg font-semibold text-slate-950">{item.title}</div>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-300">Scenes</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                공공데이터는 숫자에서 끝나지 않고,
                <br />
                장면으로 보여야 합니다.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                공픈클로는 단순 조회가 아니라 “오늘 무엇을 판단해야 하는가”에 맞춘 제품 언어를 지향합니다.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {productScenes.map((scene, index) => (
              <FadeIn key={scene.title} delay={index * 0.08}>
                <div className="border-t border-white/15 pt-5">
                  <div className="text-xl font-semibold text-white">{scene.title}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{scene.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="real-usecases" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-emerald-700">Real-world builds</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                실제로 만들었습니다.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                가상 시나리오가 아니라, 실제 공공 데이터와 법령을 가지고 직접 구축한 사례입니다.
                공픈클로 방식이 실무에서 어떻게 작동하는지 코드와 결과물로 보여줍니다.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {realUsecases.map((uc, i) => (
              <FadeIn key={uc.no} delay={i * 0.05}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-colors hover:border-emerald-300">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-mono text-emerald-800">
                          {uc.no}
                        </span>
                        <span className="text-xs text-slate-500">{uc.부처} · {uc.부서}</span>
                        <span className="rounded bg-slate-900 px-2 py-0.5 text-xs text-white">실제 사례</span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug text-slate-950">{uc.업무}</h3>
                      <p className="mt-2 max-w-2xl text-sm text-slate-600">{uc.한줄요약}</p>
                      {uc.배경 && (
                        <p className="mt-3 max-w-2xl border-l-2 border-emerald-300 pl-3 text-sm leading-relaxed text-slate-500">
                          {uc.배경}
                        </p>
                      )}
                    </div>
                    <a
                      href={uc.결과물.URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                    >
                      사이트 보기 →
                    </a>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="mb-2 text-xs font-mono uppercase tracking-widest text-slate-400">데이터 규모</p>
                      <ul className="space-y-1 text-sm text-slate-700">
                        {'총조문' in uc.데이터규모 && <li>총 조문 {uc.데이터규모.총조문}개</li>}
                        {'특례조문' in uc.데이터규모 && <li>특례 조문 {uc.데이터규모.특례조문}개</li>}
                        {'인용법률수' in uc.데이터규모 && <li>인용 법률 {uc.데이터규모.인용법률수}개</li>}
                        {'인용조문수' in uc.데이터규모 && <li>인용 조문 {uc.데이터규모.인용조문수}개</li>}
                        {'정책대상지역' in uc.데이터규모 && <li>정책 대상 지역 {uc.데이터규모.정책대상지역}개</li>}
                        {'분야수' in uc.데이터규모 && <li>분야 수 {uc.데이터규모.분야수}개</li>}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-mono uppercase tracking-widest text-slate-400">기술 스택</p>
                      <div className="flex flex-wrap gap-1.5">
                        {uc.기술스택.map((t) => (
                          <span key={t} className="rounded bg-slate-200 px-2 py-0.5 text-xs text-slate-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-mono uppercase tracking-widest text-slate-400">주요 기능</p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {uc.주요기능.slice(0, 4).map((f, j) => (
                          <li key={j}>· {f}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-mono uppercase tracking-widest text-slate-400">소요 시간</p>
                      <p className="text-sm text-slate-700">{uc.소요시간}</p>
                      <p className="mb-2 mt-4 text-xs font-mono uppercase tracking-widest text-slate-400">구축일</p>
                      <p className="text-sm text-slate-700">{uc.구축일}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
                    <a
                      href={uc.결과물.저장소}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-900"
                    >
                      GitHub 저장소 →
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href={uc.결과물.URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
                    >
                      {uc.결과물.URL}
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="usecases" className="bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Usecases</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                100개의 유스케이스로,
                <br />
                공픈클로가 어디까지 가능한지 증명합니다.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                부처, 부서, 난이도, 자동화 방식별로 실제 적용 가능한 사례를 탐색하면서,
                공개데이터를 어떻게 활용하고 무엇을 자동으로 찾아오며 어떤 방식으로 복합분석해 결과 문서로 이어지는지 바로 확인할 수 있습니다.
              </p>
            </div>
          </FadeIn>
          <UseCaseGrid usecases={usecases} departments={departments} />
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#07111d_0%,#0c1f35_100%)] text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-300">Final CTA</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              공공데이터를 읽는 데서 끝내지 말고,
              <br />
              업무 결과물까지 자동화하세요.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">
              공픈클로는 실무자 관점에서 설계된 공공업무 자동화 플레이북 플랫폼입니다. 구조를 보고,
              대시보드를 보고, 실제 유스케이스까지 바로 내려가 보세요.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#usecases"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                유스케이스 보기
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                대시보드 보기
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
