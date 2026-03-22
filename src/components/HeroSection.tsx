'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const SOURCES = [
  { id: 'portal', name: '공공데이터포털', sub: '행정 데이터', icon: '📡', angle: -90 },
  { id: 'kosis', name: 'KOSIS', sub: '통계', icon: '📊', angle: -18 },
  { id: 'ecos', name: 'ECOS', sub: '경제', icon: '💹', angle: 54 },
  { id: 'law', name: '법령정보', sub: '규범', icon: '⚖️', angle: 126 },
  { id: 'assembly', name: '국회·관보', sub: '고시·의안', icon: '🏛️', angle: 198 },
] as const;

const CENTER = { x: 50, y: 48 };
const RADIUS = 37;

type Emotion = 'idle' | 'run' | 'happy';
type ScenarioId = 'sejong' | 'gazette' | 'staffing';
type LiveSignal = {
  source: string;
  headline: string;
  detail: string;
  fetchedAt: string;
};

type Scenario = {
  id: ScenarioId;
  command: string;
  eyebrow: string;
  title: string;
  summary: string;
  lines: { label: string; text: string }[];
  previewTitle: string;
  previewIntro: string;
  sections: { heading: string; body: string }[];
  sources: string[];
};

const SCENARIOS: Scenario[] = [
  {
    id: 'sejong',
    command: '세종시 현황 브리핑 만들어줘',
    eyebrow: '행정 브리핑',
    title: '세종시 주간 현황',
    summary: '통계·행정 데이터·실시간 신호를 함께 엮어 이번 주 체크포인트를 정리했습니다.',
    lines: [
      { label: '인구', text: '서울→세종 전입 흐름이 전주 대비 상승했습니다.' },
      { label: '부동산', text: '평균 매매가는 상승, 거래량은 보합권입니다.' },
      { label: '판단', text: '정주 여건 체감지표를 다음 브리핑에서 추가 확인 권고.' },
    ],
    previewTitle: '세종시 현황 브리핑 미리보기',
    previewIntro: '인구 이동, 거래 흐름, 생활 관련 신호를 묶어 실무자가 바로 읽을 수 있는 형태로 정리한 예시입니다.',
    sections: [
      {
        heading: '핵심 요약',
        body: '최근 1주 기준 세종시는 순유입 흐름이 다시 살아나는 모습입니다. 부동산 가격은 소폭 상승했으나 거래량은 과열 신호 없이 안정적입니다.',
      },
      {
        heading: '실무 판단',
        body: '단기 가격 자체보다 전입 원인과 생활 인프라 지표를 함께 봐야 합니다. 공급 이슈보다는 정주 매력 회복 여부를 우선 점검하는 편이 적절합니다.',
      },
      {
        heading: '후속 확인',
        body: '행정·교통·교육 관련 체감 데이터가 다음 주에도 같은 방향을 보이는지 재확인이 필요합니다.',
      },
    ],
    sources: ['공공데이터포털', 'KOSIS', 'ECOS'],
  },
  {
    id: 'gazette',
    command: '이번 주 관보 핵심만 정리해줘',
    eyebrow: '정책 검토 메모',
    title: '관보 핵심 브리핑',
    summary: '관보·법령정보를 교차해 중요한 고시와 후속 검토 포인트를 추렸습니다.',
    lines: [
      { label: '고시', text: '중요 공고 2건 선별, 직접 영향 부처를 표시했습니다.' },
      { label: '법령', text: '후속 검토가 필요한 조문 1건을 별도 표기했습니다.' },
      { label: '메모', text: '실무상 확인할 쟁점을 바로 읽을 수 있게 정리했습니다.' },
    ],
    previewTitle: '관보 핵심 브리핑 미리보기',
    previewIntro: '관보 원문을 다 읽지 않아도 이번 주 꼭 봐야 할 고시·개정 신호를 먼저 확인할 수 있도록 구성한 예시입니다.',
    sections: [
      {
        heading: '핵심 요약',
        body: '이번 주 관보에서는 조직·인사·고시 관련 실무 영향이 있는 항목이 중심입니다. 중요도는 높지 않지만 후속 해석이 필요한 문구가 일부 포함되어 있습니다.',
      },
      {
        heading: '실무 판단',
        body: '전면 대응이 필요한 사안보다는 부처별 담당 라인에서 사전 체크할 수준입니다. 다만 시행 시점 문구는 놓치면 해석 차이가 생길 수 있습니다.',
      },
      {
        heading: '후속 확인',
        body: '관련 법령 원문과 시행일, 적용 범위를 함께 확인해 내부 메모에 반영하는 것이 안전합니다.',
      },
    ],
    sources: ['국회·관보', '법령정보'],
  },
  {
    id: 'staffing',
    command: '교원정원 점검표 만들어줘',
    eyebrow: '점검 보고서',
    title: '교원정원 점검표',
    summary: '정원 추세·정책 수요·법령 맥락을 함께 엮어 점검표 형식으로 정리했습니다.',
    lines: [
      { label: '정원', text: '최근 변동 폭과 지역별 편차를 한 번에 볼 수 있게 구성했습니다.' },
      { label: '수요', text: '정책 수요 대비 인력 이슈를 별도 항목으로 분리했습니다.' },
      { label: '결과', text: '점검표와 브리핑 문안을 동시에 확인할 수 있습니다.' },
    ],
    previewTitle: '교원정원 점검표 미리보기',
    previewIntro: '정원 숫자만 나열하지 않고 정책 수요, 편차, 다음 확인 포인트까지 함께 보여주는 실무형 예시입니다.',
    sections: [
      {
        heading: '핵심 요약',
        body: '최근 교원정원 변동은 총량보다 지역별 편차와 수요-공급 간 미스매치가 더 중요한 이슈입니다. 단순 감축/증원 논리로는 설명이 부족합니다.',
      },
      {
        heading: '실무 판단',
        body: '교육 수요 변화와 현장 체감 부담을 함께 반영해야 합니다. 숫자 조정 이전에 어떤 기능을 어디에 우선 배치할지에 대한 판단이 선행돼야 합니다.',
      },
      {
        heading: '후속 확인',
        body: '권역별 편차, 학령인구 변화, 현장 충원 난이도를 함께 추적하는 형태로 후속 점검표를 주기화할 필요가 있습니다.',
      },
    ],
    sources: ['공공데이터포털', 'KOSIS', '법령정보'],
  },
];

function srcPos(angle: number) {
  const r = (angle * Math.PI) / 180;
  return {
    x: CENTER.x + RADIUS * Math.cos(r),
    y: CENTER.y + RADIUS * Math.sin(r),
  };
}

function Robot({ size = 46, carrying = false, emotion = 'idle' }: { size?: number; carrying?: boolean; emotion?: Emotion }) {
  const mouth =
    emotion === 'happy' ? 'M14,28 Q18,32 22,28' : emotion === 'run' ? 'M15,28 L21,28' : 'M14,27 Q18,30 22,27';

  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden>
      <line x1="18" y1="2" x2="18" y2="7" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="18" cy="2" r="2" fill={carrying ? '#34d399' : '#22d3ee'}>
        {carrying && <animate attributeName="r" values="2;3;2" dur="0.6s" repeatCount="indefinite" />}
      </circle>
      <rect x="7" y="7" width="22" height="16" rx="5" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.2" />
      <circle cx="13" cy="14" r={emotion === 'happy' ? 2 : 3} fill="#22d3ee" />
      <circle cx="23" cy="14" r={emotion === 'happy' ? 2 : 3} fill="#22d3ee" />
      <path d={mouth} stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <rect x="10" y="24" width="16" height="8" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
      <rect x="11" y="32" width="5" height="3" rx="1.5" fill="#22d3ee" opacity="0.7" />
      <rect x="20" y="32" width="5" height="3" rx="1.5" fill="#22d3ee" opacity="0.7" />
      {carrying && (
        <g>
          <circle cx="30" cy="8" r="5" fill="#34d399" opacity="0.9" />
          <text x="30" y="10.5" textAnchor="middle" fontSize="6" fill="#04111f" fontWeight="bold">
            ✓
          </text>
        </g>
      )}
    </svg>
  );
}

function inferScenario(input: string): ScenarioId {
  const normalized = input.replace(/\s+/g, '').toLowerCase();
  if (normalized.includes('관보')) return 'gazette';
  if (normalized.includes('정원') || normalized.includes('교원')) return 'staffing';
  return 'sejong';
}

function phaseLabel(phase: string, targetIdx: number, fetchedCount: number) {
  if (phase === 'idle') return '입력을 기다리는 중';
  if (phase === 'command') return '명령 수신';
  if (phase.startsWith('goTo')) return `${SOURCES[targetIdx]?.name ?? '소스'}(으)로 이동 중`;
  if (phase.startsWith('fetchAt')) return `${SOURCES[targetIdx]?.name ?? '소스'} 데이터 수집`;
  if (phase.startsWith('return')) return '데이터 획득 · 복귀 중';
  if (phase === 'gather') return `${fetchedCount}개 소스 교차 분석 중`;
  if (phase === 'deliver') return '업무 결과물 생성 완료';
  return '';
}

async function fetchSejongLiveSignal(): Promise<LiveSignal> {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=36.48&longitude=127.29&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FSeoul'
  );

  if (!response.ok) {
    throw new Error('live fetch failed');
  }

  const data = await response.json();
  const current = data?.current;
  if (!current) {
    throw new Error('live payload missing');
  }

  const temp = Math.round(current.temperature_2m);
  const apparent = Math.round(current.apparent_temperature);
  const wind = Math.round(current.wind_speed_10m);
  const fetchedAt = typeof current.time === 'string' ? current.time.slice(11, 16) : '방금';

  return {
    source: 'Open-Meteo 실시간 날씨',
    headline: `세종 현재 ${temp}°C · 체감 ${apparent}°C`,
    detail: `풍속 ${wind}km/h 기준 실시간 생활 신호를 함께 반영했습니다.`,
    fetchedAt,
  };
}

export default function HeroSection() {
  const [query, setQuery] = useState(SCENARIOS[0].command);
  const [submittedQuery, setSubmittedQuery] = useState(SCENARIOS[0].command);
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId>('sejong');
  const [phase, setPhase] = useState('idle');
  const [targetIdx, setTargetIdx] = useState(-1);
  const [fetched, setFetched] = useState<number[]>([]);
  const [robotPos, setRobotPos] = useState(CENTER);
  const [carrying, setCarrying] = useState(false);
  const [emotion, setEmotion] = useState<Emotion>('idle');
  const [showPreview, setShowPreview] = useState(false);
  const [liveSignal, setLiveSignal] = useState<LiveSignal | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const timersRef = useRef<number[]>([]);

  const activeScenario = useMemo(
    () => SCENARIOS.find((scenario) => scenario.id === activeScenarioId) ?? SCENARIOS[0],
    [activeScenarioId]
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const wait = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const runFlow = useCallback(
    (scenarioId: ScenarioId) => {
      clearTimers();
      setActiveScenarioId(scenarioId);
      setShowPreview(false);
      setPhase('command');
      setTargetIdx(-1);
      setFetched([]);
      setRobotPos(CENTER);
      setCarrying(false);
      setEmotion('idle');

      const goToSource = (idx: number) => {
        if (idx >= SOURCES.length) {
          setPhase('gather');
          setRobotPos(CENTER);
          setEmotion('happy');
          setCarrying(false);
          wait(() => {
            setPhase('deliver');
            setEmotion('happy');
          }, 1100);
          return;
        }

        const pos = srcPos(SOURCES[idx].angle);
        setTargetIdx(idx);
        setPhase(`goTo${idx}`);
        setRobotPos(pos);
        setEmotion('run');
        setCarrying(false);

        wait(() => {
          setPhase(`fetchAt${idx}`);
          setEmotion('idle');

          wait(() => {
            setCarrying(true);
            setFetched((prev) => [...prev, idx]);
            setPhase(`returnFrom${idx}`);
            setRobotPos(CENTER);
            setEmotion('run');

            wait(() => {
              setCarrying(false);
              setEmotion('idle');
              goToSource(idx + 1);
            }, 620);
          }, 500);
        }, 620);
      };

      wait(() => goToSource(0), 700);
    },
    [clearTimers, wait]
  );

  useEffect(() => {
    runFlow('sejong');
    return clearTimers;
  }, [runFlow, clearTimers]);

  useEffect(() => {
    if (activeScenarioId !== 'sejong') {
      setLiveSignal(null);
      setLiveLoading(false);
      setLiveError(null);
      return;
    }

    let cancelled = false;
    setLiveLoading(true);
    setLiveError(null);

    fetchSejongLiveSignal()
      .then((signal) => {
        if (!cancelled) {
          setLiveSignal(signal);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLiveSignal(null);
          setLiveError('실시간 신호를 불러오지 못했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLiveLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeScenarioId]);

  const sourceNodes = useMemo(
    () =>
      SOURCES.map((src, i) => {
        const p = srcPos(src.angle);
        const active = phase === `goTo${i}` || phase === `fetchAt${i}` || phase === `returnFrom${i}`;
        const done = fetched.includes(i);
        return { ...src, index: i, pos: p, active, done };
      }),
    [phase, fetched]
  );

  const isMoving = phase.startsWith('goTo') || phase.startsWith('fetchAt') || phase.startsWith('return');
  const isDelivering = phase === 'deliver';
  const isGathering = phase === 'gather';
  const canPreview = isDelivering;
  const liveCaption = liveLoading
    ? '실시간 신호 불러오는 중…'
    : liveSignal
      ? `${liveSignal.headline} · ${liveSignal.fetchedAt} 기준`
      : liveError;

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    const scenarioId = inferScenario(query);
    setSubmittedQuery(query);
    runFlow(scenarioId);
  };

  const applyPreset = (scenario: Scenario) => {
    setQuery(scenario.command);
    setSubmittedQuery(scenario.command);
    runFlow(scenario.id);
  };

  return (
    <>
      <section className="relative -mt-14 min-h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,rgba(6,182,212,0.1),transparent_60%),radial-gradient(ellipse_50%_40%_at_75%_30%,rgba(99,102,241,0.06),transparent_50%),linear-gradient(160deg,#04111f_0%,#0b1f39_50%,#071420_100%)] pt-14 text-white">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,17,31,0.05),rgba(4,17,31,0.5)_65%,rgba(4,17,31,0.8))]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-56px)] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,1.05fr)] lg:gap-14 lg:px-10 lg:py-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-[540px]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-5 text-[11px] font-mono uppercase tracking-[0.32em] text-cyan-300/55"
            >
              공공데이터 × AI 업무자동화
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="text-[clamp(3.5rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.06em]"
            >
              공픈클로
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-5 text-[clamp(1.1rem,2vw,1.5rem)] font-semibold leading-snug"
            >
              시키면 알아서 캐옵니다.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-2 max-w-[430px] text-[15px] leading-[1.8] text-slate-400"
            >
              공공데이터를 자동으로 찾아오고,
              <br />
              서로 엮어 제출 가능한 결과물로 바꾸는 AI.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              className="mt-3 max-w-[470px] text-[13px] leading-[1.8] text-slate-500"
            >
              통계·법령·고시·행정 데이터를 알아서 찾고, 교차 분석해 브리핑·보고서·점검표 같은 업무 산출물로 정리합니다.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <label htmlFor="hero-command" className="mb-2 block text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500">
                Try a request
              </label>
              <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_12px_40px_rgba(2,8,23,0.22)] sm:flex-row sm:items-center sm:rounded-full sm:pl-5 sm:pr-3">
                <input
                  id="hero-command"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="예: 세종시 현황 브리핑 만들어줘"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  실행해보기
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SCENARIOS.map((scenario) => {
                  const active = scenario.id === activeScenarioId;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => applyPreset(scenario)}
                      className={`rounded-full border px-3 py-1.5 text-[12px] transition ${
                        active
                          ? 'border-cyan-300/50 bg-cyan-300/12 text-cyan-100'
                          : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07]'
                      }`}
                    >
                      {scenario.command}
                    </button>
                  );
                })}
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.6 }}
              className="mt-7 overflow-hidden rounded-xl border border-white/[0.06] sm:block"
            >
              <div className="flex items-start gap-2.5 bg-white/[0.02] px-4 py-3.5 text-[13px] leading-[1.7] text-slate-500">
                <span className="mt-0.5 shrink-0 text-base">😩</span>
                <div>
                  <span className="font-bold text-slate-400">기존</span>{' '}
                  포털 가입 → 키 발급 → API 문서 해독 → 코드 작성 → 에러 디버깅 → 데이터 파싱 → 분석 → 보고서
                </div>
              </div>
              <div className="flex items-start gap-2.5 border-t border-white/[0.06] bg-cyan-400/[0.04] px-4 py-3.5 text-[13px] leading-[1.7] text-slate-200">
                <span className="mt-0.5 shrink-0 text-base">🤖</span>
                <div>
                  <span className="font-bold text-cyan-400">공픈클로</span>{' '}
                  <span className="font-semibold text-white">&quot;{submittedQuery}&quot;</span>
                  <span className="text-slate-500"> → 자동으로 찾고, 엮고, 정리</span>
                </div>
              </div>
            </motion.div>

            {activeScenarioId === 'sejong' && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-4 inline-flex max-w-max items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1.5 text-[11px] text-emerald-100"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span>{liveCaption}</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.6 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="#usecases"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                자동화 사례 보기
              </Link>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                disabled={!canPreview}
                className={`inline-flex items-center justify-center rounded-full border px-7 py-3 text-sm font-medium transition ${
                  canPreview
                    ? 'border-white/12 bg-white/[0.06] text-white hover:bg-white/10'
                    : 'cursor-not-allowed border-white/5 bg-white/[0.03] text-slate-600'
                }`}
              >
                결과 미리보기
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative mx-auto aspect-[1/0.9] w-full max-w-[560px]"
          >
            <div className="absolute left-1/2 top-[11%] z-20 hidden -translate-x-1/2 rounded-full border border-cyan-300/15 bg-cyan-300/8 px-3 py-1 text-[10px] font-medium text-cyan-100/85 sm:block">
              자동 탐색 → 수집 → 교차분석 → 결과물
            </div>

            <svg className="absolute inset-0 z-[1] hidden h-full w-full sm:block" viewBox="0 0 100 96" preserveAspectRatio="xMidYMid meet">
              {sourceNodes.map((src) => (
                <line
                  key={src.id}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={src.pos.x}
                  y2={src.pos.y}
                  stroke={src.active ? '#22d3ee' : src.done ? 'rgba(34,211,238,0.18)' : 'rgba(255,255,255,0.04)'}
                  strokeWidth={src.active ? 0.55 : 0.28}
                  strokeDasharray={src.active ? '2 2.5' : src.done ? '1 3' : 'none'}
                >
                  {src.active && <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.95s" repeatCount="indefinite" />}
                </line>
              ))}
            </svg>

            <div
              className="absolute left-1/2 top-[41%] z-[2] flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-500 sm:top-[48%]"
              style={{
                borderColor: isGathering || isDelivering ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.06)',
                background: isGathering || isDelivering ? 'rgba(34,211,238,0.07)' : 'transparent',
                boxShadow: isGathering || isDelivering ? '0 0 30px rgba(34,211,238,0.12)' : 'none',
              }}
            >
              <div className="flex max-w-[36px] flex-wrap justify-center gap-[3px]">
                {fetched.map((fi) => (
                  <motion.div key={fi} initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-2 w-2 rounded-full bg-cyan-400 opacity-70" />
                ))}
              </div>
            </div>
            <div className="absolute left-1/2 top-[calc(41%+38px)] z-[2] -translate-x-1/2 text-center sm:top-[calc(48%+38px)]">
              <div className="text-[10px] font-bold text-slate-500">조합 엔진</div>
              <div className="mt-0.5 text-[8.5px] font-medium text-slate-600">cross-source synthesis</div>
            </div>

            {sourceNodes.map((src, idx) => (
              <div
                key={src.id}
                className={`absolute z-[5] flex flex-col items-center gap-1.5 transition-all duration-300 ${idx > 3 ? 'hidden sm:flex' : ''}`}
                style={{
                  left: `${src.pos.x}%`,
                  top: `${src.pos.y}%`,
                  transform: 'translate(-50%,-50%)',
                  opacity: src.active ? 1 : src.done ? 0.5 : 0.65,
                }}
              >
                <div
                  className="relative flex h-[50px] w-[50px] items-center justify-center rounded-[14px] text-[22px] transition-all duration-300"
                  style={{
                    background: src.active ? 'rgba(34,211,238,0.12)' : src.done ? 'rgba(52,211,153,0.06)' : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${src.active ? 'rgba(34,211,238,0.5)' : src.done ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: src.active ? '0 0 18px rgba(34,211,238,0.1)' : 'none',
                  }}
                >
                  {src.icon}
                  {src.done && !src.active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-extrabold text-slate-950"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-[11px] font-bold text-slate-200">{src.name}</div>
                  <div className="mt-0.5 text-[9px] text-slate-600">{src.sub}</div>
                </div>
              </div>
            ))}

            <motion.div
              className="absolute z-[15]"
              animate={{ left: `${robotPos.x}%`, top: `${robotPos.y}%` }}
              transition={{ duration: 0.58, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                transform: 'translate(-50%, -50%)',
                filter: carrying ? 'drop-shadow(0 0 12px rgba(52,211,153,0.4))' : 'drop-shadow(0 0 8px rgba(34,211,238,0.3))',
              }}
            >
              <Robot size={46} carrying={carrying} emotion={emotion} />
            </motion.div>

            <div className="absolute left-1/2 top-[calc(41%-68px)] z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.08] bg-slate-950/90 px-3.5 py-1.5 sm:top-[calc(48%-78px)]">
              <div
                className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                style={{
                  background: isDelivering ? '#34d399' : isMoving ? '#22d3ee' : '#475569',
                  animation: isMoving ? 'pulse 0.9s infinite' : 'none',
                }}
              />
              <span
                className="font-mono text-[10.5px] font-semibold transition-colors duration-300"
                style={{ color: isDelivering ? '#34d399' : isMoving ? '#22d3ee' : '#64748b' }}
              >
                {phaseLabel(phase, targetIdx, fetched.length)}
              </span>
            </div>

            <div className="absolute bottom-[2%] left-1/2 z-20 flex -translate-x-1/2 gap-1">
              {SOURCES.map((_, i) => (
                <div key={i} className="h-1 w-5 rounded-full transition-colors duration-300 sm:w-6" style={{ background: fetched.includes(i) ? '#22d3ee' : 'rgba(255,255,255,0.08)' }} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {phase !== 'idle' && (
                <motion.div
                  key={submittedQuery}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-[4%] right-[2%] z-20 max-w-[230px] rounded-[18px_18px_4px_18px] bg-cyan-400 px-3.5 py-2.5 text-[12.5px] font-semibold leading-snug text-slate-950 shadow-[0_8px_24px_rgba(34,211,238,0.15)] sm:bottom-[5%]"
                >
                  {submittedQuery}
                  <div className="mt-1 text-[9.5px] font-normal text-slate-950/40">👤 사무관</div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isDelivering && (
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 z-[25] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(241,247,255,0.95))] p-[18px] text-slate-900 shadow-[0_24px_60px_rgba(3,15,36,0.45),0_0_40px_rgba(34,211,238,0.06)]"
                >
                  <div className="mb-2.5 flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div>
                      <div className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-slate-400">{activeScenario.eyebrow}</div>
                      <div className="mt-0.5 text-[14px] font-extrabold">{activeScenario.title}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {activeScenarioId === 'sejong' && liveSignal && (
                        <div className="rounded-[10px] bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700">LIVE SIGNAL</div>
                      )}
                      <div className="rounded-[10px] bg-slate-900 px-2.5 py-1 text-[9.5px] font-bold text-cyan-400">업무 결과물</div>
                    </div>
                  </div>
                  <p className="mb-2.5 text-[11px] leading-[1.65] text-slate-500">{activeScenario.summary}</p>
                  <div className="mb-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10.5px] leading-[1.6] text-slate-700">
                    <strong className="text-slate-900">복합 근거</strong>{' '}
                    {activeScenarioId === 'sejong'
                      ? '행정 데이터 + 통계 + 실시간 신호 결합'
                      : activeScenarioId === 'gazette'
                        ? '관보 + 법령정보 교차 확인'
                        : '정원 추세 + 정책 수요 + 법령 맥락 결합'}
                  </div>
                  {activeScenarioId === 'sejong' && liveSignal && (
                    <div className="mb-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[10.5px] leading-[1.6] text-emerald-900">
                      <strong>{liveSignal.headline}</strong>
                      <div className="text-emerald-700">{liveSignal.detail}</div>
                    </div>
                  )}
                  <div className="space-y-0.5 text-[12px] leading-[1.95] text-slate-500">
                    {activeScenario.lines.map((line) => (
                      <p key={line.label}>
                        <strong className="text-slate-900">{line.label}</strong> {line.text}
                      </p>
                    ))}
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1 border-t border-slate-200 pt-2">
                    {activeScenario.sources.map((source) => (
                      <span key={source} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[8.5px] font-medium text-slate-500">
                        {source}
                      </span>
                    ))}
                    {activeScenarioId === 'sejong' && liveSignal && (
                      <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
                        {liveSignal.source}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(transparent,#04111f)]" />

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </section>

      <AnimatePresence>
        {showPreview && canPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#071420_0%,#0b1f39_100%)] text-white shadow-[0_30px_80px_rgba(2,8,23,0.55)]"
            >
              <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-300/70">preview</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{activeScenario.previewTitle}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">{activeScenario.previewIntro}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5"
                >
                  닫기
                </button>
              </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-5">
                  {activeScenario.sections.map((section) => (
                    <div key={section.heading} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="text-sm font-semibold text-cyan-200">{section.heading}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{section.body}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">request</p>
                    <p className="mt-2 text-sm font-medium text-white">{submittedQuery}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">source mix</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeScenario.sources.map((source) => (
                        <span key={source} className="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-2.5 py-1 text-[11px] text-cyan-100">
                          {source}
                        </span>
                      ))}
                      {activeScenarioId === 'sejong' && liveSignal && (
                        <span className="rounded-full border border-emerald-300/15 bg-emerald-300/8 px-2.5 py-1 text-[11px] text-emerald-100">
                          {liveSignal.source}
                        </span>
                      )}
                    </div>
                  </div>
                  {activeScenarioId === 'sejong' && (
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">live signal</p>
                      <div className="mt-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm leading-6 text-slate-300">
                        {liveLoading && '세종 실시간 신호를 불러오는 중입니다.'}
                        {!liveLoading && liveSignal && (
                          <>
                            <strong className="text-white">{liveSignal.headline}</strong>
                            <div className="mt-1 text-slate-400">{liveSignal.detail}</div>
                            <div className="mt-1 text-xs text-slate-500">갱신: {liveSignal.fetchedAt}</div>
                          </>
                        )}
                        {!liveLoading && !liveSignal && liveError && <span>{liveError}</span>}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">output</p>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-300">
                      <li>• 핵심 요약</li>
                      <li>• 실무 판단</li>
                      <li>• 후속 확인 포인트</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
