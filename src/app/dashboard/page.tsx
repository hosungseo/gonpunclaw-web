import type { Metadata } from 'next';
import demoData from '@/data/demo.json';
import crossData from '@/data/demo-cross.json';
import FadeIn from '@/components/FadeIn';
import type { DemoData, CrossDemoData } from '@/types/demo';

export const metadata: Metadata = {
  title: '대시보드 | 공픈클로',
  description: '실시간 공공API 데모 — 아파트 실거래가, 미세먼지, 관보',
};

const demo = demoData as unknown as DemoData;
const cross = crossData as unknown as CrossDemoData;

export default function DashboardPage() {
  const { apt, air, gazette, fetchedAt } = demo;

  if (!apt || !air || !gazette) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-2xl font-bold text-gray-400 mb-3">데이터를 불러올 수 없습니다</p>
        <p className="text-sm text-gray-400">demo.json 파일을 확인해주세요.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <FadeIn>
        <div className="mb-12">
          <p className="text-xs font-mono text-blue-600 tracking-widest uppercase mb-2">Live Demo</p>
          <h1 className="text-3xl font-bold text-gray-950 mb-2">라이브 대시보드</h1>
          <p className="text-sm text-gray-400">
            공공 오픈API를 실제로 호출한 데이터입니다.
            <span className="ml-2 font-mono">
              {new Date(fetchedAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </span>
          </p>
        </div>
      </FadeIn>

      {/* 1. 아파트 매매 실거래가 */}
      <FadeIn delay={0.05}>
        <section className="mb-14">
          <SectionHeader emoji="🏠" title="#011 아파트 매매 실거래가" sub="국토교통부 API · UseCase #011 주택정책과" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {apt.map((area) => (
              <div key={area.area} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-blue-600 text-white px-5 py-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm">{area.area}</h3>
                  <span className="text-blue-200 text-xs">{area.count}건</span>
                </div>
                <div className="p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                        <th className="pb-2 font-medium">아파트</th>
                        <th className="pb-2 text-right font-medium">거래금액(만원)</th>
                        <th className="pb-2 text-right font-medium">면적(㎡)</th>
                        <th className="pb-2 text-right font-medium">층</th>
                      </tr>
                    </thead>
                    <tbody>
                      {area.data?.slice(0, 5).map((item, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-2 text-gray-800 font-medium">{item.아파트?.substring(0, 12)}</td>
                          <td className="py-2 text-right text-blue-700 font-bold tabular-nums">{item.거래금액}</td>
                          <td className="py-2 text-right text-gray-500 tabular-nums">{Number(item.면적).toFixed(1)}</td>
                          <td className="py-2 text-right text-gray-500">{item.층}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* 2. 미세먼지 */}
      <FadeIn delay={0.08}>
        <section className="mb-14">
          <SectionHeader emoji="🌫️" title="#036 실시간 미세먼지 현황" sub="한국환경공단 에어코리아 API · UseCase #036 대기환경과" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {air.map((sido) => {
              const station = sido.stations?.[0];
              const pm10 = Number(station?.PM10) || 0;
              const { label, cls } = pm10 <= 30
                ? { label: '좋음', cls: 'bg-blue-50 border-blue-200 text-blue-700' }
                : pm10 <= 80
                ? { label: '보통', cls: 'bg-emerald-50 border-emerald-200 text-emerald-700' }
                : pm10 <= 150
                ? { label: '나쁨', cls: 'bg-orange-50 border-orange-200 text-orange-700' }
                : { label: '매우나쁨', cls: 'bg-red-50 border-red-200 text-red-700' };
              return (
                <div key={sido.sido} className={`rounded-2xl border p-4 ${cls}`}>
                  <div className="text-xs font-semibold mb-1 opacity-70">{sido.sido}</div>
                  <div className="text-3xl font-bold tabular-nums">{station?.PM10 || '—'}</div>
                  <div className="text-xs mt-1.5">PM10 · {label}</div>
                  <div className="text-xs opacity-60 mt-0.5">PM2.5: {station?.PM25 || '—'}</div>
                </div>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* 3. 관보 */}
      <FadeIn delay={0.1}>
        <section className="mb-14">
          <SectionHeader emoji="📜" title="#068 최근 관보 법령 고시" sub="행정안전부 관보 API · UseCase #068 법령정보과" />
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gray-900 text-white px-5 py-3 flex items-center justify-between">
              <h3 className="font-bold text-sm">2026년 3월 관보</h3>
              <span className="text-gray-400 text-xs">총 {gazette?.total || 0}건</span>
            </div>
            <div className="divide-y divide-gray-50">
              {gazette?.items?.length > 0
                ? gazette.items.map((item, i) => (
                    <div key={i} className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-gray-900 block truncate">{item.제목}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{item.발행기관}</span>
                            <span className="text-gray-200">·</span>
                            <span className="text-xs text-gray-400">{item.발행일}</span>
                          </div>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg shrink-0">{item.유형}</span>
                      </div>
                    </div>
                  ))
                : (
                  <div className="px-5 py-8 text-center text-sm text-gray-400">관보 데이터가 없습니다.</div>
                )}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Cross-analysis divider */}
      <FadeIn delay={0.05}>
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-7">
            <div className="text-xs font-mono text-blue-300 tracking-widest uppercase mb-2">Cross Analysis</div>
            <h2 className="text-xl font-bold mb-1">복합 API 교차 분석</h2>
            <p className="text-blue-200 text-sm">여러 부처 API를 동시에 호출하고 교차 분석하는 핵심 데모</p>
          </div>
        </div>
      </FadeIn>

      {/* Cross 1: 세종시 */}
      {cross?.sejong ? (
        <FadeIn delay={0.05}>
          <section className="mb-14">
            <SectionHeader
              emoji="🏛️"
              title={cross.sejong.title ?? '#097 세종시 종합'}
              sub="국토부 실거래가 + 환경공단 에어코리아 + 행안부 인구이동 — 3개 부처 교차"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <StatCard
                color="blue"
                icon="🏠"
                label="아파트 매매"
                value={`${cross.sejong.apt?.avg_price?.toLocaleString() ?? '—'}만원`}
                sub={`세종시 2025.2월 평균 · ${cross.sejong.apt?.count ?? 0}건`}
              />
              <StatCard
                color="emerald"
                icon="🌫️"
                label="미세먼지"
                value={`${cross.sejong.air?.[0]?.PM10 ?? '—'}㎍/㎥`}
                sub="세종시 PM10 실시간"
              />
              <StatCard
                color="purple"
                icon="👥"
                label="인구이동"
                value={`${cross.sejong.population?.count ?? 0}건`}
                sub="서울→세종 전입 (2025.1~3월)"
              />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-4">세종시 아파트 매매 상세</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-2 font-medium">아파트</th>
                    <th className="pb-2 text-right font-medium">거래금액(만원)</th>
                    <th className="pb-2 text-right font-medium">면적(㎡)</th>
                    <th className="pb-2 text-right font-medium">층</th>
                  </tr>
                </thead>
                <tbody>
                  {cross.sejong.apt?.data?.slice(0, 6).map((item, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-2 text-gray-800">{item.아파트?.substring(0, 15)}</td>
                      <td className="py-2 text-right text-blue-700 font-bold tabular-nums">{item.거래금액}</td>
                      <td className="py-2 text-right text-gray-500 tabular-nums">{Number(item.면적).toFixed(1)}</td>
                      <td className="py-2 text-right text-gray-500">{item.층}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </FadeIn>
      ) : null}

      {/* Cross 2: 법령+관보+국회 */}
      {cross?.law_cross ? (
        <FadeIn delay={0.05}>
          <section className="mb-14">
            <SectionHeader emoji="⚖️" title="#010 자치법규 동향 종합 분석" sub="법제처 법령 + 행안부 관보 + 열린국회 법안 — 3개 기관 교차" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CrossCard color="indigo" title="📚 법제처 법령">
                {cross.law_cross.laws?.map((l, i) => (
                  <div key={i} className="text-xs border-b border-gray-100 pb-2 last:border-0">
                    <div className="font-medium text-gray-900 mb-0.5">{l.법령명?.substring(0, 25)}</div>
                    <div className="text-gray-400">{l.소관} · {l.공포일}</div>
                  </div>
                ))}
              </CrossCard>
              <CrossCard color="gray" title="📜 관보 고시">
                {cross.law_cross.gazette?.length
                  ? cross.law_cross.gazette.map((g, i) => (
                      <div key={i} className="text-xs border-b border-gray-100 pb-2 last:border-0">
                        <div className="font-medium text-gray-900 mb-0.5">{g.제목}</div>
                        <div className="text-gray-400">{g.기관} · {g.발행일}</div>
                      </div>
                    ))
                  : <div className="text-xs text-gray-400 py-4 text-center">해당 기간 관보 없음</div>
                }
              </CrossCard>
              <CrossCard color="emerald" title="🏛️ 국회 법안">
                {cross.law_cross.bills?.map((b, i) => (
                  <div key={i} className="text-xs border-b border-gray-100 pb-2 last:border-0">
                    <div className="font-medium text-gray-900 mb-0.5">{b.법안명}</div>
                    <div className="text-gray-400">{b.발의자} · {b.제안일}</div>
                  </div>
                ))}
              </CrossCard>
            </div>
          </section>
        </FadeIn>
      ) : null}

      {/* Cross 3: API 카탈로그 */}
      {cross?.catalog ? (
        <FadeIn delay={0.05}>
          <section className="mb-14">
            <SectionHeader
              emoji="📊"
              title="#004 공공데이터 API 카탈로그"
              sub={`공공데이터포털 목록조회 API — 전체 ${cross.catalog.total_apis?.toLocaleString() ?? 0}개 오픈API`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-4">기관별 API 등록 수 (상위 10)</h3>
                {cross.catalog.top_orgs?.map((o, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-700">{String(o.기관).substring(0, 20)}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (Number(o.API수) / 20) * 100)}%` }} />
                      </div>
                      <span className="text-xs font-bold text-blue-700 w-6 text-right tabular-nums">{o.API수}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-4">최근 등록 API 샘플</h3>
                {cross.catalog.sample?.map((s, i) => (
                  <div key={i} className="py-2.5 border-b border-gray-50 last:border-0">
                    <div className="text-sm font-medium text-gray-900">{s.API명}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md">{s.기관}</span>
                      <span className="text-xs text-gray-400">{s.유형}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-center text-xs text-gray-400">
                  전체 {cross.catalog.total_apis?.toLocaleString()}개 오픈API 중 샘플
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      ) : null}

      {/* Data sources */}
      <FadeIn delay={0.05}>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-bold text-blue-900 mb-3 text-sm">📡 데이터 출처</h3>
          <ul className="text-sm text-blue-700 space-y-1.5">
            <li>• 아파트매매 실거래가: <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">apis.data.go.kr/1613000/RTMSDataSvcAptTrade</code></li>
            <li>• 에어코리아 대기오염: <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">apis.data.go.kr/B552584/ArpltnInforInqireSvc</code></li>
            <li>• 관보: <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">apis.data.go.kr/1741000/ApiTotalService</code></li>
          </ul>
          <p className="text-xs text-blue-400 mt-3">모든 데이터는 공공데이터포털 오픈API에서 수집됩니다. 오픈클로(OpenClaw)가 자동으로 호출·정규화·리포트 생성합니다.</p>
        </div>
      </FadeIn>
    </div>
  );
}

function SectionHeader({ emoji, title, sub }: { emoji: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-2xl">{emoji}</span>
      <div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

function StatCard({ color, icon, label, value, sub }: { color: string; icon: string; label: string; value: string; sub: string }) {
  const palette: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
  };
  const subPalette: Record<string, string> = {
    blue: 'text-blue-500',
    emerald: 'text-emerald-500',
    purple: 'text-purple-500',
  };
  return (
    <div className={`rounded-2xl border p-5 ${palette[color] ?? 'bg-gray-50 border-gray-200 text-gray-900'}`}>
      <div className={`text-xs font-semibold mb-2 ${subPalette[color] ?? 'text-gray-500'}`}>{icon} {label}</div>
      <div className="text-3xl font-bold tabular-nums">{value}</div>
      <div className={`text-xs mt-1.5 ${subPalette[color] ?? 'text-gray-400'}`}>{sub}</div>
    </div>
  );
}

function CrossCard({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
  const headerPalette: Record<string, string> = {
    indigo: 'bg-indigo-600',
    gray: 'bg-gray-900',
    emerald: 'bg-emerald-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className={`${headerPalette[color] ?? 'bg-gray-600'} text-white px-4 py-2.5 text-xs font-bold`}>{title}</div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}
