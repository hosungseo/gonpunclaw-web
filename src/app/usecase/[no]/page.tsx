import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllUseCases, getUseCaseByNo } from "@/lib/data";
import DifficultyBadge from "@/components/DifficultyBadge";
import type { Metadata } from "next";

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
  if (!uc) return { title: "Not Found" };
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

  const design = uc.오픈클로설계;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">
          메인
        </Link>
        <span>/</span>
        <span>{uc.부처}</span>
        <span>/</span>
        <span className="text-gray-900">#{uc.no}</span>
      </nav>

      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-mono text-gray-400">#{uc.no}</span>
          <DifficultyBadge level={uc.난이도} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {uc.업무}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
            {uc.부처}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">{uc.부서}</span>
        </div>
      </div>

      {/* Automation summary */}
      <Section title="자동화 개요">
        <p className="text-gray-700 leading-relaxed">{uc.자동화}</p>
      </Section>

      {/* Legal basis */}
      <Section title="직제근거">
        <p className="text-gray-700 leading-relaxed text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
          {uc.직제근거}
        </p>
      </Section>

      {/* API */}
      <Section title="API 정보">
        <div className="flex flex-wrap gap-2">
          {uc.API.map((api, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              {api}
            </span>
          ))}
        </div>
      </Section>

      {/* Workflow */}
      <Section title="워크플로우">
        <div className="space-y-0">
          {design.workflow_steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                {i < design.workflow_steps.length - 1 && (
                  <div className="w-0.5 h-full bg-primary-200 my-1" />
                )}
              </div>
              <div className="pb-6">
                <p className="text-sm text-gray-700 pt-1.5">{step.replace(/^Step \d+:\s*/, "")}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* OpenClaw Design */}
      <Section title="오픈클로 설계">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard label="트리거" value={design.trigger} />
          <InfoCard label="입력" value={design.입력} />
          <InfoCard label="출력" value={design.출력} />
          <InfoCard label="메모리" value={design.memory} />
          <InfoCard label="예상 소요시간" value={design.예상소요시간} />
          <InfoCard
            label="절감효과"
            value={design.수동대비절감}
            highlight
          />
        </div>
      </Section>

      {/* Back */}
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-1 h-5 bg-primary-600 rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        highlight
          ? "bg-green-50 border-green-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div
        className={`text-xs font-semibold mb-1 ${
          highlight ? "text-green-700" : "text-gray-500"
        }`}
      >
        {label}
      </div>
      <div
        className={`text-sm ${
          highlight ? "text-green-900 font-medium" : "text-gray-700"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
