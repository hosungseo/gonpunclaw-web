"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { UseCase } from "@/types/usecase";
import DifficultyBadge from "./DifficultyBadge";

interface Props {
  usecases: UseCase[];
  departments: string[];
}

export default function UseCaseGrid({ usecases, departments }: Props) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [difficulty, setDifficulty] = useState<string>("");

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
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="업무 키워드 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          {/* Department dropdown */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="">전체 부처</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
          {/* Difficulty buttons */}
          <div className="flex gap-1">
            {(["", "하", "중", "상"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  difficulty === level
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {level === "" ? "전체" : level}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          {filtered.length}개 유스케이스
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((uc) => (
          <Link
            key={uc.no}
            href={`/usecase/${uc.no}`}
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-mono text-gray-400">
                #{uc.no}
              </span>
              <DifficultyBadge level={uc.난이도} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
              {uc.업무}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-0.5 rounded">{uc.부처}</span>
              <span>{uc.부서}</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
