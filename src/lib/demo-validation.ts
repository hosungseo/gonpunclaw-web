import type {
  AirSido,
  AirStation,
  AptArea,
  AptItem,
  BillItem,
  CatalogData,
  CrossDemoData,
  DemoData,
  GazetteData,
  GazetteItem,
  GazetteRawItem,
  LawCrossData,
  LawItem,
  OrgItem,
  SampleItem,
  SejongData,
  SejongPopulation,
} from '@/types/demo';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

function isAptItem(value: unknown): value is AptItem {
  return isRecord(value)
    && isString(value.아파트)
    && isString(value.거래금액)
    && isString(value.면적)
    && isString(value.층)
    && (!('년' in value) || isString(value.년))
    && (!('월' in value) || isString(value.월))
    && (!('일' in value) || isString(value.일));
}

function isAptArea(value: unknown): value is AptArea {
  return isRecord(value)
    && isString(value.area)
    && isNumber(value.count)
    && isArrayOf(value.data, isAptItem);
}

function isAirStation(value: unknown): value is AirStation {
  return isRecord(value)
    && isString(value.측정소)
    && isString(value.PM10)
    && isString(value.PM25)
    && (!('등급' in value) || isString(value.등급));
}

function isAirSido(value: unknown): value is AirSido {
  return isRecord(value)
    && isString(value.sido)
    && isArrayOf(value.stations, isAirStation);
}

function isGazetteItem(value: unknown): value is GazetteItem {
  return isRecord(value)
    && isString(value.제목)
    && isString(value.발행기관)
    && isString(value.발행일)
    && isString(value.유형);
}

function isGazetteData(value: unknown): value is GazetteData {
  return isRecord(value)
    && isNumber(value.total)
    && isArrayOf(value.items, isGazetteItem);
}

function isLawItem(value: unknown): value is LawItem {
  return isRecord(value)
    && isString(value.법령명)
    && isString(value.소관)
    && isString(value.공포일);
}

function isGazetteRawItem(value: unknown): value is GazetteRawItem {
  return isRecord(value)
    && isString(value.제목)
    && isString(value.기관)
    && isString(value.발행일);
}

function isBillItem(value: unknown): value is BillItem {
  return isRecord(value)
    && isString(value.법안명)
    && isString(value.발의자)
    && isString(value.제안일);
}

function isOrgItem(value: unknown): value is OrgItem {
  return isRecord(value)
    && isString(value.기관)
    && isNumber(value.API수);
}

function isSampleItem(value: unknown): value is SampleItem {
  return isRecord(value)
    && isString(value.API명)
    && isString(value.기관)
    && isString(value.유형);
}

function isSejongPopulation(value: unknown): value is SejongPopulation {
  return isRecord(value) && isNumber(value.count);
}

function isSejongData(value: unknown): value is SejongData {
  return isRecord(value)
    && (!('title' in value) || isString(value.title))
    && isRecord(value.apt)
    && isNumber(value.apt.avg_price)
    && isNumber(value.apt.count)
    && isArrayOf(value.apt.data, isAptItem)
    && isArrayOf(value.air, isAirStation)
    && isSejongPopulation(value.population);
}

function isLawCrossData(value: unknown): value is LawCrossData {
  return isRecord(value)
    && isArrayOf(value.laws, isLawItem)
    && isArrayOf(value.gazette, isGazetteRawItem)
    && isArrayOf(value.bills, isBillItem);
}

function isCatalogData(value: unknown): value is CatalogData {
  return isRecord(value)
    && isNumber(value.total_apis)
    && isArrayOf(value.top_orgs, isOrgItem)
    && isArrayOf(value.sample, isSampleItem);
}

export function isDemoData(value: unknown): value is DemoData {
  return isRecord(value)
    && isString(value.fetchedAt)
    && isArrayOf(value.apt, isAptArea)
    && isArrayOf(value.air, isAirSido)
    && isGazetteData(value.gazette);
}

export function isCrossDemoData(value: unknown): value is CrossDemoData {
  return isRecord(value)
    && (!('fetchedAt' in value) || isString(value.fetchedAt))
    && (!('sejong' in value) || value.sejong === undefined || isSejongData(value.sejong))
    && (!('law_cross' in value) || value.law_cross === undefined || isLawCrossData(value.law_cross))
    && (!('catalog' in value) || value.catalog === undefined || isCatalogData(value.catalog));
}

export type DashboardValidationResult =
  | { ok: true; demo: DemoData; cross: CrossDemoData }
  | { ok: false; reason: string };

export function validateDashboardPayload(
  demo: unknown,
  cross: unknown,
): DashboardValidationResult {
  if (!isDemoData(demo)) {
    return { ok: false, reason: 'demo.json 구조가 예상과 다릅니다.' };
  }

  if (!isCrossDemoData(cross)) {
    return { ok: false, reason: 'demo-cross.json 구조가 예상과 다릅니다.' };
  }

  return { ok: true, demo, cross };
}
