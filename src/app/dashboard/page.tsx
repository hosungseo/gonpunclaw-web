import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대시보드 | 공픈클로",
  description: "실시간 API 데모 대시보드",
};

const demos = [
  {
    title: "세종시 종합현황",
    description:
      "세종특별자치시 인구·예산·건축허가 등 핵심 행정지표를 실시간 오픈API로 수집하여 대시보드로 시각화합니다.",
    icon: "🏛️",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "법안추적 모니터",
    description:
      "국회 발의법안을 실시간 추적하고, 소관 부처별 영향 분석을 자동 생성합니다. 법제처 API + 국회 API 연동.",
    icon: "📋",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "부처 정원 비교",
    description:
      "행정안전부 조직관리 API를 활용하여 부처별 기구·정원 현황을 비교 분석합니다. 전월 대비 증감 추이 포함.",
    icon: "📊",
    color: "from-violet-500 to-violet-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-500">
          실시간 오픈API 연동 데모 &mdash; 공픈클로가 실제로 동작하는 모습을
          확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {demos.map((demo) => (
          <div
            key={demo.title}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div
              className={`bg-gradient-to-br ${demo.color} p-6 text-white`}
            >
              <span className="text-3xl">{demo.icon}</span>
              <h2 className="text-xl font-bold mt-3">{demo.title}</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {demo.description}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h3 className="text-lg font-bold text-primary-900 mb-2">
          데모 준비 중
        </h3>
        <p className="text-sm text-primary-700 max-w-xl mx-auto">
          각 대시보드는 실제 공공 오픈API를 호출하여 데이터를 수집하고 분석하는
          라이브 데모입니다. 현재 API 연동 및 시각화 작업이 진행 중입니다.
        </p>
      </div>
    </div>
  );
}
