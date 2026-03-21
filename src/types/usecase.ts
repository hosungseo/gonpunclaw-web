export interface UseCase {
  no: string;
  부처: string;
  부서: string;
  업무: string;
  API: string[];
  자동화: string;
  난이도: string;
  직제근거?: string;
  오픈클로설계: {
    trigger: string;
    입력: string;
    workflow_steps: string[];
    출력: string;
    memory: string;
    예상소요시간: string;
    수동대비절감: string;
  };
  산출물예시?: {
    제목: string;
    본문: string;
    형태: string;
  };
}

export interface UseCaseData {
  title: string;
  version: string;
  date: string;
  total: number;
  usecases: UseCase[];
}
