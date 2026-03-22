'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { UseCase } from '@/types/usecase';
import DifficultyBadge from './DifficultyBadge';
import FadeIn from './FadeIn';

interface Props {
  usecases: UseCase[];
  departments: string[];
}

function inferSourceLabel(apis: string[]) {
  const labels = new Set<string>();

  apis.forEach((api) => {
    const v = api.toLowerCase();
    if (v.includes('kosis') || v.includes('통계')) labels.add('통계');
    if (v.includes('ecos') || v.includes('경제')) labels.add('경제');
    if (v.includes('법령') || v.includes('law')) labels.add('규범');
    if (v.includes('관보') || v.includes('국회')) labels.add('고시·의안');
    if (v.includes('공공데이터') || v.includes('api')) labels.add('행정 데이터');
  });

  if (labels.size === 0) return ['복합 데이터'];
  return Array.from(labels).slice(0, 3);
}

function inferOutputLabel(usecase: UseCase) {
  const output = usecase.오픈클로설계?.출력 ?? usecase.산출물예시?.형태 ?? '';
  if (output.includes('브리핑')) return '브리핑';
  if (output.includes('보고서')) return '보고서';
  if (output.includes('점검')) return '점검표';
  if (output.includes('메모')) return '검토 메모';
  if (output.includes('체크')) return '체크리스트';
  return '업무 산출물';
}

function getPreviewLine(usecase: UseCase) {
  return (
    usecase.산출물예시?.형태 ||
    usecase.오픈클로설계?.출력 ||
    usecase.자동화 ||
    '복수 출처를 엮어 실무 결과물로 정리'
  );
}

export default function UseCaseGrid({ usecases, departments }: Props) {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const filtered = useMemo(() => {
    return usecases.filter((uc) => {
      if (department && uc.부처 !== department) return false;
      if (difficulty && uc.난이도 !== difficulty) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          uc.업무.toLowerCase().includes(q) ||
          uc.부처.toLowerCase().includes(q) ||
          uc.부서.toLowerCase().includes(q) ||
          uc.자동화.toLowerCase().includes(q) ||
          uc.API.join(' ').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [usecases, search, department, difficulty]);

  return (
    <div>
      <div className="mb-8 border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <input
              type="text"
              placeholder="업무 키워드, 부처, API 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white"
          >
            <option value="">전체 부처</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
          <div className="flex gap-1">
            {(['', '하', '중', '상'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  difficulty === level ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level === '' ? '전체' : level}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
          <span>{filtered.length}개 유스케이스</span>
          <span>복수 소스 기반 업무 시나리오 탐색</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((uc, idx) => {
          const sourceLabels = inferSourceLabel(uc.API);
          const outputLabel = inferOutputLabel(uc);
          const previewLine = getPreviewLine(uc);
          const sourceCount = uc.API?.length ?? 0;

          return (
            <FadeIn key={uc.no} delay={Math.min(idx % 8, 7) * 0.04}>
              <Link
                href={`/usecase/${uc.no}`}
                className="group block border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-[0_18px_40px_rgba(8,23,46,0.08)]"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-xs font-mono text-gray-400">#{uc.no}</span>
                  <DifficultyBadge level={uc.난이도} />
                </div>

                <div className="mb-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-cyan-50 px-2 py-1 text-[10px] font-semibold text-cyan-700">자동 탐색</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">{outputLabel}</span>
                </div>

                <h3 className="mb-2 text-[15px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-blue-700 line-clamp-2">
                  {uc.업무}
                </h3>

                <p className="mb-4 text-[11px] font-semibold tracking-[0.04em] text-slate-400">
                  {outputLabel}
                </p>

                <p className="mb-4 text-[12px] leading-6 text-slate-500 line-clamp-2">
                  {previewLine}
                </p>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {sourceLabels.map((label) => (
                    <span key={label} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">복합 근거</div>
                  <div className="text-[12px] leading-6 text-slate-600">
                    {sourceCount > 1 ? `${sourceCount}개 소스를 결합해 ${outputLabel}로 정리` : `${outputLabel} 중심 자동화 시나리오`}
                  </div>
                  <div className="mt-2 text-[10px] font-medium text-slate-400">자동 탐색된 출처 기반</div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <span className="bg-slate-100 px-2 py-0.5 font-medium">{uc.부처}</span>
                  <span className="truncate text-slate-400">{uc.부서}</span>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="py-20 text-center text-sm text-gray-400">검색 결과가 없습니다.</div>}
    </div>
  );
}
