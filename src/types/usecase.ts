export interface UseCaseDesign {
  trigger: string;
  입력: string;
  workflow_steps: string[];
  출력: string;
  memory: string;
  예상소요시간: string;
  수동대비절감: string;
}

export interface UseCase {
  no: string;
  부처: string;
  부서: string;
  업무: string;
  API: string[];
  자동화: string;
  난이도: "하" | "중" | "상";
  직제근거: string;
  오픈클로설계: UseCaseDesign;
}

export interface UseCaseData {
  title: string;
  version: string;
  date: string;
  total: number;
  usecases: UseCase[];
}
