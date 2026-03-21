import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllUseCases, getUseCaseByNo } from '@/lib/data';
import DifficultyBadge from '@/components/DifficultyBadge';
import ChatDemo from '@/components/ChatDemo';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllUseCases().map((uc) => ({ no: uc.no }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ no: string }>;
}): Promise<Metadata> {
  const { no } = await params;
  const uc = getUseCaseByNo(no);
  if (!uc) return { title: 'Not Found' };
  return {
    title: `#${uc.no} ${uc.업무} | 공픈클로`,
    description: uc.자동화,
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  const { no } = await params;
  const uc = getUseCaseByNo(no);
  if (!uc) notFound();

  const allUseCases = getAllUseCases();
  const related = allUseCases
    .filter((u) => u.부처 === uc.부처 && u.no !== uc.no)
    .slice(0, 3);

  const design = uc.오픈클로설계;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
        <span>/</span>
        <span className="text-gray-500">{uc.부처}</span>
        <span>/</span>
        <span className="text-gray-700 font-medium">#{uc.no}</span>
      </nav>

      {/* Title block */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-mono text-gray-400">#{uc.no}</span>
          <DifficultyBadge level={uc.난이도} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 leading-tight mb-5">
          {uc.업무}
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
            {uc.부처}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            {uc.부서}
          </span>
        </div>
      </div>

      {/* Automation summary */}
      <Section title="자동화 개요">
        <p className="text-gray-700 leading-relaxed text-base">{uc.자동화}</p>
      </Section>

      {/* Legal basis */}
      <Section title="직제근거">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600 leading-relaxed">
          {uc.직제근거}
        </div>
      </Section>

      {/* API */}
      <Section title="사용 API">
        <div className="flex flex-wrap gap-2">
          {uc.API.map((api, i) => {
            // Try to extract list_id pattern (e.g. "서비스명(list_id:XXXX)" or just the name)
            const match = api.match(/\(list_id:([^)]+)\)/);
            const displayName = api.replace(/\s*\(list_id:[^)]+\)/, '');
            const href = match
              ? `https://www.data.go.kr/data/${match[1]}/openapi.do`
              : null;
            return href ? (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100 transition-colors"
              >
                {displayName}
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <span
                key={i}
                className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100"
              >
                {api}
              </span>
            );
          })}
        </div>
      </Section>

      {/* Workflow timeline */}
      <Section title="워크플로우">
        <div className="space-y-0">
          {design.workflow_steps.map((step, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  {i + 1}
                </div>
                {i < design.workflow_steps.length - 1 && (
                  <div className="w-px flex-1 bg-blue-100 my-1.5" />
                )}
              </div>
              <div className="pb-7">
                <p className="text-sm text-gray-700 pt-1.5 leading-relaxed">
                  {step.replace(/^Step \d+:\s*/, '')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 채팅 데모 */}
      {uc.채팅예시 && uc.채팅예시.length > 0 && (
        <Section title="💬 실제 대화 예시">
          <ChatDemo messages={uc.채팅예시} />
        </Section>
      )}

      {/* 산출물 예시 */}
      {uc.산출물예시 && (
        <Section title="📋 산출물 예시">
          <div className="bg-gray-950 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-800 px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-xs font-mono">{uc.산출물예시.제목}</span>
              <span className="ml-auto text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{uc.산출물예시.형태}</span>
            </div>
            <div className="p-5 font-mono text-sm text-green-400 leading-relaxed whitespace-pre-wrap">
              {uc.산출물예시.본문}
            </div>
          </div>
        </Section>
      )}

      {/* OpenClaw Design */}
      <Section title="오픈클로 설계">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard label="트리거" value={design.trigger} />
          <InfoCard label="입력" value={design.입력} />
          <InfoCard label="출력" value={design.출력} />
          <InfoCard label="메모리" value={design.memory} />
          <InfoCard label="예상 소요시간" value={design.예상소요시간} />
          <InfoCard label="절감효과" value={design.수동대비절감} highlight />
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section title={`${uc.부처} 관련 유스케이스`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.no}
                href={`/usecase/${r.no}`}
                className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl p-4 transition-all"
              >
                <span className="text-xs font-mono text-gray-400 block mb-2">#{r.no}</span>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 leading-snug line-clamp-2 transition-colors">
                  {r.업무}
                </h4>
                <span className="text-xs text-gray-400 mt-2 block">{r.부서}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Back */}
      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2.5">
        <div className="w-1 h-5 bg-blue-600 rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${highlight ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className={`text-xs font-semibold mb-1.5 ${highlight ? 'text-emerald-700' : 'text-gray-400'}`}>
        {label}
      </div>
      <div className={`text-sm leading-relaxed ${highlight ? 'text-emerald-900 font-medium' : 'text-gray-700'}`}>
        {value}
      </div>
    </div>
  );
}
