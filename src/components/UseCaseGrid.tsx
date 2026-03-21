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
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="업무 키워드 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 transition-all"
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
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  difficulty === level
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              className="group block bg-white rounded-2xl border border-gray-150 p-5 hover:border-blue-400 hover:shadow-md hover:scale-[1.015] transition-all duration-200"
              style={{ borderColor: '#e8edf3' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono text-gray-400">#{uc.no}</span>
                <DifficultyBadge level={uc.난이도} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                {uc.업무}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium">{uc.부처}</span>
                <span className="truncate text-gray-400">{uc.부서}</span>
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
