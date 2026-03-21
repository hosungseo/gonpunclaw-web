import type { Metadata } from "next";
import demoData from "@/data/demo.json";
import crossData from "@/data/demo-cross.json";

export const metadata: Metadata = {
  title: "대시보드 | 공픈클로",
  description: "실시간 공공API 데모 — 아파트 실거래가, 미세먼지, 관보",
};

export default function DashboardPage() {
  const { apt, air, gazette, fetchedAt } = demoData as {
    apt: Array<{ area: string; count: number; data: Array<{ 아파트: string; 거래금액: string; 면적: string; 층: string; 년: string; 월: string; 일: string }> }>;
    air: Array<{ sido: string; stations: Array<{ 측정소: string; PM10: string; PM25: string; 등급: string }> }>;
    gazette: { total: number; items: Array<{ 제목: string; 발행기관: string; 발행일: string; 유형: string }> };
    fetchedAt: string;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">라이브 데모</h1>
        <p className="text-gray-500">
          공공 오픈API를 실제로 호출한 데이터입니다.
          <span className="ml-2 text-xs text-gray-400">
            수집 시각: {new Date(fetchedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
          </span>
        </p>
      </div>

      {/* 1. 아파트 매매 실거래가 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏠</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">#011 아파트 매매 실거래가</h2>
            <p className="text-sm text-gray-500">국토교통부 API · UseCase #011 주택정책과</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apt && apt.map((area) => (
            <div key={area.area} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 text-white px-5 py-3">
                <h3 className="font-bold">{area.area}</h3>
                <p className="text-blue-100 text-sm">{area.count}건 거래</p>
              </div>
              <div className="p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2">아파트</th>
                      <th className="pb-2 text-right">거래금액(만원)</th>
                      <th className="pb-2 text-right">면적(㎡)</th>
                      <th className="pb-2 text-right">층</th>
                    </tr>
                  </thead>
                  <tbody>
                    {area.data?.slice(0, 5).map((item, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-2 text-gray-900 font-medium">{item.아파트?.substring(0, 12)}</td>
                        <td className="py-2 text-right text-blue-700 font-bold">{item.거래금액}</td>
                        <td className="py-2 text-right text-gray-600">{Number(item.면적).toFixed(1)}</td>
                        <td className="py-2 text-right text-gray-600">{item.층}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 미세먼지 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌫️</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">#036 실시간 미세먼지 현황</h2>
            <p className="text-sm text-gray-500">한국환경공단 에어코리아 API · UseCase #036 대기환경과</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {air && air.map((sido) => {
            const station = sido.stations?.[0];
            const pm10 = Number(station?.PM10) || 0;
            const grade = pm10 <= 30 ? "좋음" : pm10 <= 80 ? "보통" : pm10 <= 150 ? "나쁨" : "매우나쁨";
            const color = pm10 <= 30 ? "bg-blue-50 border-blue-200 text-blue-700"
              : pm10 <= 80 ? "bg-green-50 border-green-200 text-green-700"
              : pm10 <= 150 ? "bg-orange-50 border-orange-200 text-orange-700"
              : "bg-red-50 border-red-200 text-red-700";
            return (
              <div key={sido.sido} className={`rounded-xl border p-4 ${color}`}>
                <div className="text-sm font-medium mb-1">{sido.sido}</div>
                <div className="text-2xl font-bold">{station?.PM10 || "-"}</div>
                <div className="text-xs mt-1">PM10 · {grade}</div>
                <div className="text-xs opacity-70 mt-1">PM2.5: {station?.PM25 || "-"}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 관보 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📜</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">#068 최근 관보 법령 고시</h2>
            <p className="text-sm text-gray-500">행정안전부 관보 API · UseCase #068 법령정보과</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-800 text-white px-5 py-3 flex items-center justify-between">
            <h3 className="font-bold">2026년 3월 관보</h3>
            <span className="text-gray-300 text-sm">총 {gazette?.total || 0}건</span>
          </div>
          <div className="divide-y divide-gray-100">
            {gazette?.items?.map((item, i) => (
              <div key={i} className="px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">{item.제목?.substring(0, 50)}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{item.발행기관}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-400">{item.발행일}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded shrink-0">{item.유형}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 복합 API 교차 분석 === */}
      <div className="mb-10 mt-4">
        <div className="bg-gradient-to-r from-primary-800 to-primary-600 text-white rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">🔗 복합 API 교차 분석</h2>
          <p className="text-primary-100">여러 부처의 API를 동시에 호출하고 교차 분석하는 핵심 데모</p>
        </div>
      </div>

      {/* 복합 1: 세종시 종합 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏛️</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{(crossData as Record<string, unknown>).sejong ? ((crossData as Record<string, unknown>).sejong as Record<string, string>).title : "#097 세종시 종합"}</h2>
            <p className="text-sm text-gray-500">국토부 실거래가 + 환경공단 에어코리아 + 행안부 인구이동 — 3개 부처 교차</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="text-sm text-blue-600 font-medium mb-1">🏠 아파트 매매</div>
            <div className="text-3xl font-bold text-blue-900">{((crossData as Record<string, unknown>).sejong as Record<string, Record<string, number>>)?.apt?.avg_price?.toLocaleString() || "-"}만원</div>
            <div className="text-xs text-blue-500 mt-1">세종시 2025.2월 평균 거래가 · {((crossData as Record<string, unknown>).sejong as Record<string, Record<string, number>>)?.apt?.count || 0}건</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="text-sm text-green-600 font-medium mb-1">🌫️ 미세먼지</div>
            <div className="text-3xl font-bold text-green-900">
              {((crossData as Record<string, unknown>).sejong as Record<string, Array<Record<string, string>>>)?.air?.[0]?.PM10 || "-"}<span className="text-lg">㎍/㎥</span>
            </div>
            <div className="text-xs text-green-500 mt-1">세종시 PM10 실시간</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <div className="text-sm text-purple-600 font-medium mb-1">👥 인구이동</div>
            <div className="text-3xl font-bold text-purple-900">
              {((crossData as Record<string, unknown>).sejong as Record<string, Record<string, number>>)?.population?.count || 0}건
            </div>
            <div className="text-xs text-purple-500 mt-1">서울→세종 전입 (2025.1~3월)</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">세종시 아파트 매매 상세</h3>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-500 border-b"><th className="pb-2">아파트</th><th className="pb-2 text-right">거래금액(만원)</th><th className="pb-2 text-right">면적(㎡)</th><th className="pb-2 text-right">층</th></tr></thead>
            <tbody>
              {((crossData as Record<string, unknown>).sejong as Record<string, Record<string, Array<Record<string, string>>>>)?.apt?.data?.slice(0, 6).map((item: Record<string, string>, i: number) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 text-gray-900">{item.아파트?.substring(0, 15)}</td>
                  <td className="py-2 text-right text-blue-700 font-bold">{item.거래금액}</td>
                  <td className="py-2 text-right text-gray-600">{Number(item.면적).toFixed(1)}</td>
                  <td className="py-2 text-right text-gray-600">{item.층}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 복합 2: 법령 + 관보 + 국회 교차 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚖️</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">#010 자치법규 동향 종합 분석</h2>
            <p className="text-sm text-gray-500">법제처 법령 + 행안부 관보 + 열린국회 법안 — 3개 기관 교차</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-indigo-600 text-white px-4 py-2 text-sm font-bold">📚 법제처 법령</div>
            <div className="p-4 space-y-2">
              {((crossData as Record<string, unknown>).law_cross as Record<string, Array<Record<string, string>>>)?.laws?.map((l: Record<string, string>, i: number) => (
                <div key={i} className="text-xs border-b border-gray-100 pb-2">
                  <div className="font-medium text-gray-900">{l.법령명?.substring(0, 25)}</div>
                  <div className="text-gray-400">{l.소관} · {l.공포일}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-2 text-sm font-bold">📜 관보 고시</div>
            <div className="p-4 space-y-2">
              {((crossData as Record<string, unknown>).law_cross as Record<string, Array<Record<string, string>>>)?.gazette?.length ? (
                ((crossData as Record<string, unknown>).law_cross as Record<string, Array<Record<string, string>>>).gazette.map((g: Record<string, string>, i: number) => (
                  <div key={i} className="text-xs border-b border-gray-100 pb-2">
                    <div className="font-medium text-gray-900">{g.제목}</div>
                    <div className="text-gray-400">{g.기관} · {g.발행일}</div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400 py-4 text-center">해당 기간 관보 없음</div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-emerald-600 text-white px-4 py-2 text-sm font-bold">🏛️ 국회 법안</div>
            <div className="p-4 space-y-2">
              {((crossData as Record<string, unknown>).law_cross as Record<string, Array<Record<string, string>>>)?.bills?.map((b: Record<string, string>, i: number) => (
                <div key={i} className="text-xs border-b border-gray-100 pb-2">
                  <div className="font-medium text-gray-900">{b.법안명}</div>
                  <div className="text-gray-400">{b.발의자} · {b.제안일}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 복합 3: API 카탈로그 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">#004 공공데이터 API 카탈로그</h2>
            <p className="text-sm text-gray-500">공공데이터포털 목록조회 API — 전체 {((crossData as Record<string, unknown>).catalog as Record<string, number>)?.total_apis?.toLocaleString() || 0}개 오픈API</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">기관별 API 등록 수 (상위 10)</h3>
            {((crossData as Record<string, unknown>).catalog as Record<string, Array<Record<string, string | number>>>)?.top_orgs?.map((o: Record<string, string | number>, i: number) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                <span className="text-sm text-gray-700">{String(o.기관).substring(0, 20)}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min(100, (Number(o.API수) / 20) * 100)}%` }} />
                  </div>
                  <span className="text-xs font-bold text-primary-700 w-8 text-right">{o.API수}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">최근 등록 API 샘플</h3>
            {((crossData as Record<string, unknown>).catalog as Record<string, Array<Record<string, string>>>)?.sample?.map((s: Record<string, string>, i: number) => (
              <div key={i} className="py-2 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900">{s.API명}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{s.기관}</span>
                  <span className="text-xs text-gray-400">{s.유형}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400">전체 {((crossData as Record<string, unknown>).catalog as Record<string, number>)?.total_apis?.toLocaleString()}개 오픈API 중 샘플</span>
            </div>
          </div>
        </div>
      </section>

      {/* API 출처 */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
        <h3 className="font-bold text-primary-900 mb-2">📡 데이터 출처</h3>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• 아파트매매 실거래가: <span className="font-mono text-xs">apis.data.go.kr/1613000/RTMSDataSvcAptTrade</span></li>
          <li>• 에어코리아 대기오염: <span className="font-mono text-xs">apis.data.go.kr/B552584/ArpltnInforInqireSvc</span></li>
          <li>• 관보: <span className="font-mono text-xs">apis.data.go.kr/1741000/ApiTotalService</span></li>
        </ul>
        <p className="text-xs text-primary-500 mt-3">모든 데이터는 공공데이터포털 오픈API에서 수집됩니다. 오픈클로(OpenClaw)가 자동으로 호출·정규화·리포트 생성합니다.</p>
      </div>
    </div>
  );
}
