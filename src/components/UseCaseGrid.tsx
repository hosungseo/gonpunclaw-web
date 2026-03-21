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
          uc.자동화.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [usecases, search, department, difficulty]);

  return (
    <div>
      {/* Filters */}
      <div className="border border-slate-200 bg-white p-5 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="업무 키워드 검색..."
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
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <div className="flex gap-1">
            {(['', '하', '중', '상'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  difficulty === level
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level === '' ? '전체' : level}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-400 font-medium">
          {filtered.length}개 유스케이스
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((uc, idx) => (
          <FadeIn key={uc.no} delay={Math.min(idx % 8, 7) * 0.04}>
            <Link
              href={`/usecase/${uc.no}`}
              className="group block border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-[0_18px_40px_rgba(8,23,46,0.08)]"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono text-gray-400">#{uc.no}</span>
                <DifficultyBadge level={uc.난이도} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                {uc.업무}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="bg-slate-100 px-2 py-0.5 font-medium">{uc.부처}</span>
                <span className="truncate text-slate-400">{uc.부서}</span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400 text-sm">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
