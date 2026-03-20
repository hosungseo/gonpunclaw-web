import { getAllUseCases, getAllDepartments } from "@/lib/data";
import UseCaseGrid from "@/components/UseCaseGrid";

export default function HomePage() {
  const usecases = getAllUseCases();
  const departments = getAllDepartments();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              공픈클로
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              공무원·공공기관 AI 업무자동화 100선
            </p>
            <p className="text-sm text-primary-200 max-w-xl mx-auto">
              오픈API + 클로드(Claude) 기반의 실전 업무 자동화 설계.
              <br />
              직제 시행규칙에 근거한 100개 유스케이스를 탐색하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-700">100개</div>
              <div className="text-sm text-gray-500 mt-1">UseCase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-700">26개</div>
              <div className="text-sm text-gray-500 mt-1">부처·기관</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-700">
                연 6,000h
              </div>
              <div className="text-sm text-gray-500 mt-1">절감 시간</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <UseCaseGrid usecases={usecases} departments={departments} />
      </section>
    </div>
  );
}
