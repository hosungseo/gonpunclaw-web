import type { UseCase, UseCaseData } from "@/types/usecase";
import rawData from "@/data/usecases.json";

const data = rawData as UseCaseData;

export function getAllUseCases(): UseCase[] {
  return data.usecases;
}

export function getUseCaseByNo(no: string): UseCase | undefined {
  return data.usecases.find((uc) => uc.no === no);
}

export function getAllDepartments(): string[] {
  const deps = new Set(data.usecases.map((uc) => uc.부처));
  return Array.from(deps).sort();
}

export function getMetadata() {
  return {
    title: data.title,
    version: data.version,
    date: data.date,
    total: data.total,
  };
}
