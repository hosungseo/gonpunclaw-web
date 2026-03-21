export interface AptItem {
  아파트: string;
  거래금액: string;
  면적: string;
  층: string;
  년: string;
  월: string;
  일: string;
}

export interface AptArea {
  area: string;
  count: number;
  data: AptItem[];
}

export interface AirStation {
  측정소: string;
  PM10: string;
  PM25: string;
  등급: string;
}

export interface AirSido {
  sido: string;
  stations: AirStation[];
}

export interface GazetteItem {
  제목: string;
  발행기관: string;
  발행일: string;
  유형: string;
}

export interface GazetteData {
  total: number;
  items: GazetteItem[];
}

export interface DemoData {
  apt: AptArea[];
  air: AirSido[];
  gazette: GazetteData;
  fetchedAt: string;
}

// Cross demo types

export interface SejongApt {
  avg_price: number;
  count: number;
  data: AptItem[];
}

export interface SejongPopulation {
  count: number;
}

export interface SejongData {
  title?: string;
  apt: SejongApt;
  air: AirStation[];
  population: SejongPopulation;
}

export interface LawItem {
  법령명: string;
  소관: string;
  공포일: string;
}

export interface GazetteRawItem {
  제목: string;
  기관: string;
  발행일: string;
}

export interface BillItem {
  법안명: string;
  발의자: string;
  제안일: string;
}

export interface LawCrossData {
  laws: LawItem[];
  gazette: GazetteRawItem[];
  bills: BillItem[];
}

export interface OrgItem {
  기관: string;
  API수: number;
}

export interface SampleItem {
  API명: string;
  기관: string;
  유형: string;
}

export interface CatalogData {
  total_apis: number;
  top_orgs: OrgItem[];
  sample: SampleItem[];
}

export interface CrossDemoData {
  fetchedAt?: string;
  sejong?: SejongData;
  law_cross?: LawCrossData;
  catalog?: CatalogData;
}
