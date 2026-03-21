import type { Metadata } from "next";
import demoData from "@/data/demo.json";

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
