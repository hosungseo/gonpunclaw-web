'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const SOURCES = [
  { id: 'portal', name: '공공데이터포털', sub: '17,163 APIs', icon: '📡', angle: -90 },
  { id: 'kosis', name: 'KOSIS', sub: '국가통계', icon: '📊', angle: -18 },
  { id: 'ecos', name: 'ECOS', sub: '경제통계', icon: '💹', angle: 54 },
  { id: 'law', name: '법령정보', sub: '국가법령센터', icon: '⚖️', angle: 126 },
  { id: 'assembly', name: '국회·관보', sub: '의안·고시', icon: '🏛️', angle: 198 },
] as const;

const RESULT_CARDS = [
  {
    eyebrow: 'auto brief',
    title: '세종시 주간 현황',
    lines: [
      { label: '인구', text: '서울→세종 전입 전주 대비 ↑' },
      { label: '부동산', text: '평균 매매가 상승, 거래량 보합' },
      { label: '대기질', text: 'PM10 보통 — 외부활동 양호' },
    ],
  },
  {
    eyebrow: 'policy memo',
    title: '관보 핵심 브리핑',
    lines: [
      { label: '고시', text: '중요 고시 2건 추출, 부처별 영향 표시' },
      { label: '법령', text: '후속 확인 필요 조문 1건 표시' },
      { label: '메모', text: '실무 검토 포인트까지 자동 정리' },
    ],
  },
  {
    eyebrow: 'work report',
    title: '교원정원 점검표',
    lines: [
      { label: '정원', text: '최근 변동 추세와 부처별 편차 정리' },
      { label: '수요', text: '정책 수요 대비 인력 이슈 포착' },
      { label: '결과', text: '점검표와 브리핑 문안 동시 생성' },
    ],
  },
] as const;

const COMMANDS = ['세종시 현황 브리핑 만들어줘', '이번 주 관보 핵심만 정리해줘', '교원정원 점검표 만들어줘'] as const;

const CENTER = { x: 50, y: 48 };
const RADIUS = 37;

type Emotion = 'idle' | 'run' | 'happy';

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
      <circle cx="13" cy="14" r={emotion === 'happy' ? 2 : 3} fill="#22d3ee">
        {emotion === 'run' && <animate attributeName="cx" values="13;14;13" dur="0.3s" repeatCount="indefinite" />}
      </circle>
      <circle cx="23" cy="14" r={emotion === 'happy' ? 2 : 3} fill="#22d3ee">
        {emotion === 'run' && <animate attributeName="cx" values="23;24;23" dur="0.3s" repeatCount="indefinite" />}
      </circle>
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

function phaseLabel(phase: string, targetIdx: number, fetchedCount: number) {
  if (phase === 'idle') return '대기 중';
  if (phase === 'command') return '명령 수신';
  if (phase.startsWith('goTo')) return `${SOURCES[targetIdx]?.name ?? '소스'}(으)로 이동 중`;
  if (phase.startsWith('fetchAt')) return `${SOURCES[targetIdx]?.name ?? '소스'} 데이터 수집`;
  if (phase.startsWith('return')) return '데이터 획득 · 복귀 중';
  if (phase === 'gather') return `${fetchedCount}개 소스 교차 분석 중`;
  if (phase === 'deliver') return '결과물 생성 완료';
  return '';
}

export default function HeroSection() {
  const [phase, setPhase] = useState('idle');
  const [targetIdx, setTargetIdx] = useState(-1);
  const [fetched, setFetched] = useState<number[]>([]);
  const [robotPos, setRobotPos] = useState(CENTER);
  const [carrying, setCarrying] = useState(false);
  const [emotion, setEmotion] = useState<Emotion>('idle');
  const [cycle, setCycle] = useState(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const wait = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const goToSource = useCallback(
    (idx: number) => {
      if (idx >= SOURCES.length) {
        setPhase('gather');
        setRobotPos(CENTER);
        setEmotion('happy');
        setCarrying(false);
        wait(() => {
          setPhase('deliver');
          wait(() => setCycle((c) => c + 1), 4000);
        }, 1200);
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
          }, 650);
        }, 550);
      }, 650);
    },
    [wait]
  );

  useEffect(() => {
    clearTimers();
    setPhase('idle');
    setFetched([]);
    setRobotPos(CENTER);
    setCarrying(false);
    setEmotion('idle');
    setTargetIdx(-1);

    wait(() => {
      setPhase('command');
      wait(() => goToSource(0), 1300);
    }, 800);

    return clearTimers;
  }, [cycle, goToSource, wait, clearTimers]);

  const isMoving = phase.startsWith('goTo') || phase.startsWith('fetchAt') || phase.startsWith('return');
  const isDelivering = phase === 'deliver';
  const isGathering = phase === 'gather';
  const showCmd = phase === 'command' || phase === 'goTo0';
  const activeCard = RESULT_CARDS[cycle % RESULT_CARDS.length];
  const activeCommand = COMMANDS[cycle % COMMANDS.length];

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

  return (
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-[500px]">
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
            className="mt-2 max-w-[390px] text-[15px] leading-[1.8] text-slate-400"
          >
            공공데이터를 찾아서, 엮어서,
            <br />
            브리핑·보고서·점검표까지 바로 만드는 AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-8 overflow-hidden rounded-xl border border-white/[0.06]"
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
                <span className="font-semibold text-white">&quot;{activeCommand}&quot;</span>
                <span className="text-slate-500"> — 끝.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="#usecases"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              유스케이스 둘러보기
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              대시보드 체험
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative mx-auto aspect-[1/0.88] w-full max-w-[560px] sm:aspect-[1/0.9]"
        >
          <svg className="absolute inset-0 z-[1] hidden h-full w-full sm:block" viewBox="0 0 100 96" preserveAspectRatio="xMidYMid meet">
            {sourceNodes.map((src) => (
              <line
                key={src.id}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={src.pos.x}
                y2={src.pos.y}
                stroke={src.active ? '#22d3ee' : src.done ? 'rgba(34,211,238,0.18)' : 'rgba(255,255,255,0.04)'}
                strokeWidth={src.active ? 0.6 : 0.3}
                strokeDasharray={src.active ? '2 2.5' : src.done ? '1 3' : 'none'}
                className="transition-all duration-300"
              >
                {src.active && <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />}
              </line>
            ))}
          </svg>

          <div
            className="absolute left-1/2 top-[41%] z-[2] flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-500 sm:left-[50%] sm:top-[48%]"
            style={{
              borderColor: isGathering || isDelivering ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.06)',
              background: isGathering ? 'rgba(34,211,238,0.05)' : 'transparent',
            }}
          >
            <div className="flex max-w-[36px] flex-wrap justify-center gap-[3px]">
              {fetched.map((fi) => (
                <motion.div key={fi} initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-2 w-2 rounded-full bg-cyan-400 opacity-70" />
              ))}
            </div>
          </div>
          <div className="absolute left-1/2 top-[calc(41%+42px)] z-[2] -translate-x-1/2 text-center text-[10px] font-bold text-slate-600 sm:top-[calc(48%+42px)]">
            홈베이스
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
                  boxShadow: src.active ? '0 0 20px rgba(34,211,238,0.12)' : 'none',
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
            transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              transform: 'translate(-50%, -50%)',
              filter: carrying ? 'drop-shadow(0 0 12px rgba(52,211,153,0.4))' : 'drop-shadow(0 0 8px rgba(34,211,238,0.3))',
            }}
          >
            <Robot size={46} carrying={carrying} emotion={emotion} />
          </motion.div>

          <AnimatePresence>
            {showCmd && (
              <motion.div
                key={`cmd-${cycle}`}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-[4%] right-[2%] z-20 max-w-[220px] rounded-[18px_18px_4px_18px] bg-cyan-400 px-3.5 py-2.5 text-[12.5px] font-semibold leading-snug text-slate-950 shadow-[0_8px_24px_rgba(34,211,238,0.15)] sm:bottom-[5%]"
              >
                {activeCommand}
                <div className="mt-1 text-[9.5px] font-normal text-slate-950/40">👤 사무관</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute left-1/2 top-[calc(41%-68px)] z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.08] bg-slate-950/90 px-3.5 py-1.5 sm:top-[calc(48%-78px)]">
            <div
              className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
              style={{
                background: isDelivering ? '#34d399' : isMoving ? '#22d3ee' : '#475569',
                animation: phase.startsWith('goTo') || phase.startsWith('fetchAt') ? 'pulse 0.8s infinite' : 'none',
              }}
            />
            <span className="font-mono text-[10.5px] font-semibold transition-colors duration-300" style={{ color: isDelivering ? '#34d399' : isMoving ? '#22d3ee' : '#64748b' }}>
              {phaseLabel(phase, targetIdx, fetched.length)}
            </span>
          </div>

          <div className="absolute bottom-[2%] left-1/2 z-20 flex -translate-x-1/2 gap-1">
            {SOURCES.map((_, i) => (
              <div key={i} className="h-1 w-5 rounded-full transition-colors duration-300 sm:w-6" style={{ background: fetched.includes(i) ? '#22d3ee' : 'rgba(255,255,255,0.08)' }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {isDelivering && (
              <motion.div
                key={`result-${cycle}`}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 z-[25] w-[286px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(241,247,255,0.95))] p-[18px] text-slate-900 shadow-[0_24px_60px_rgba(3,15,36,0.45),0_0_40px_rgba(34,211,238,0.06)] sm:w-[300px]"
              >
                <div className="mb-2.5 flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div>
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-slate-400">{activeCard.eyebrow}</div>
                    <div className="mt-0.5 text-[14px] font-extrabold">{activeCard.title}</div>
                  </div>
                  <div className="rounded-[10px] bg-slate-900 px-2.5 py-1 text-[9.5px] font-bold text-cyan-400">자동 생성</div>
                </div>
                <div className="space-y-0.5 text-[12px] leading-[1.95] text-slate-500">
                  {activeCard.lines.map((line) => (
                    <p key={line.label}>
                      <strong className="text-slate-900">{line.label}</strong> {line.text}
                    </p>
                  ))}
                </div>
                <div className="mt-2.5 flex gap-1 border-t border-slate-200 pt-2">
                  {SOURCES.slice(0, 4).map((s) => (
                    <span key={s.id} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[8.5px] font-medium text-slate-500">
                      {s.name.length > 4 ? s.name.slice(0, 4) : s.name}
                    </span>
                  ))}
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
  );
}
