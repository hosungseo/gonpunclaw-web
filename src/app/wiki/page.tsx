import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

const principles = [
  {
    no: '01',
    title: '판단 주권은 사람에게 남긴다',
    body: 'AI는 수집, 정리, 비교, 초안, 교정을 맡고 판단과 책임은 사람이 가진다.',
  },
  {
    no: '02',
    title: '큰 일을 packet과 workflow로 쪼갠다',
    body: '문제정의 → 자료수집 → 구조화 → 초안 → 검증 → 배포 → 기록의 흐름으로 나누고, 각 단계의 검토 경계를 분명히 한다.',
  },
  {
    no: '03',
    title: '상태파일과 검증 루프를 중시한다',
    body: '좋은 공공 AX는 그럴듯한 답변보다 source trace, 상태기록, 검증 가능성이 남는다.',
  },
  {
    no: '04',
    title: '속도보다 인지피로 절감을 중시한다',
    body: '공공업무의 병목은 계산보다도 기억 피로, 검토 피로, 반복 수정 피로인 경우가 많다. 공픈클로는 사람이 덜 지치고 더 오래 정확하게 일하게 하는 쪽을 택한다.',
  },
];

const usecases = [
  '부처별 기구·정원 변화 리포트',
  '정책지도 / 지역 비교 탐색기',
  '법령·판례·해석례 기반 실무 해설',
  '정책 브리프 / 보고서 초안 자동화',
  '고위공무원 바이브코딩 체험 프로젝트',
];

const notThis = [
  '단순 챗봇이 아니다.',
  '전통적 SI의 경량 대체재도 아니다.',
  'AI가 혼자 공공업무를 자동 수행하는 자율 시스템도 아니다.',
];

const isThis = [
  '공공데이터 위에 얹힌 AI 작업환경',
  '현업이 직접 제작하고 수정하는 AX 체계',
  'packet과 workflow를 통해 신뢰를 확보하는 운영 방식',
];

export default function WikiPage() {
  return (
    <div className="bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Wiki / One-Pager</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              공픈클로는 공공데이터를 읽는 데서 끝내지 않고,
              <br />
              판단 가능한 결과물까지 만든다.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
              공픈클로는 공무원과 현업이 AI를 직접 써서 공공데이터·법령·업무지식을 바탕으로
              자기 업무용 도구를 스스로 만드는 공공 AX 작업환경입니다.
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
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Why</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">왜 필요한가</h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                정부의 AI 도입은 기술 부족보다 사용 주체의 거리감이 더 큰 병목입니다. 데이터와 API는 이미
                많이 열려 있지만, 그것을 연결하고 구조화해 판단 도구로 바꾸는 일은 여전히 소수의 기술 인력에
                집중돼 있습니다.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                공픈클로는 이 병목을 줄이기 위해 시스템 납품보다 사람의 역량 축적, 교육보다 효능감 형성,
                탑다운 DX보다 바텀업 AX를 더 중요하게 봅니다.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="space-y-6 border-l border-slate-200 pl-6">
              <div>
                <div className="text-lg font-semibold">시스템 납품보다 역량 축적</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">외부가 만들어주는 완성품보다, 현업이 직접 만들고 고칠 수 있는 능력을 남긴다.</p>
              </div>
              <div>
                <div className="text-lg font-semibold">교육보다 효능감</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">강의보다 직접 만들어보고 결과를 보는 경험이 행동을 더 빨리 바꾼다.</p>
              </div>
              <div>
                <div className="text-lg font-semibold">탑다운 DX보다 바텀업 AX</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">현업이 문제를 정의하고 AI에게 직접 지시해 도구를 만드는 흐름을 더 중시한다.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Principles</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">공픈클로의 원리</h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {principles.map((item, index) => (
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
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Scenes</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">대표 장면</h2>
          </FadeIn>
          <div className="mt-12 space-y-6">
            {usecases.map((item, index) => (
              <FadeIn key={item} delay={index * 0.08}>
                <div className="border-t border-slate-200 pt-5 text-sm leading-7 text-slate-700">{item}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-300">What it is not</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">공픈클로는 무엇이 아닌가</h2>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                  {notThis.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-300">What it is</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">공픈클로는 무엇인가</h2>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                  {isThis.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Conclusion</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">한 문장 결론</h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
              공픈클로는 공공데이터를 읽는 데서 끝내지 않고, 현업이 AI를 통해 <strong>판단 가능한 결과물과 도구</strong>를 직접 만들어가는 공공 AX의 실험실입니다.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">Next reading</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">이어서 볼 것</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              공픈클로는 하나의 소개 페이지로 끝나지 않습니다. 실제 사례와 100선, 대시보드까지 함께 읽어야 전체 윤곽이 잡힙니다.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FadeIn>
              <Link href="/#real-usecases" className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-cyan-300 hover:bg-cyan-50/30">
                <div className="text-lg font-semibold text-slate-950">실제 사례</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">이미 구축한 공공형 도구와 결과물을 통해 공픈클로가 어떻게 작동하는지 본다.</p>
              </Link>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Link href="/#usecases" className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-cyan-300 hover:bg-cyan-50/30">
                <div className="text-lg font-semibold text-slate-950">유스케이스 100선</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">공공업무 자동화가 어디까지 가능한지 분야별 사례와 난이도로 훑어본다.</p>
              </Link>
            </FadeIn>
            <FadeIn delay={0.16}>
              <Link href="/dashboard" className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-cyan-300 hover:bg-cyan-50/30">
                <div className="text-lg font-semibold text-slate-950">대시보드</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">운영 흐름과 데이터 구조를 더 제품적인 관점에서 살펴본다.</p>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
