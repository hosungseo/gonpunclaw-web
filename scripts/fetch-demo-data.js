const fs = require('fs');
const https = require('https');
const http = require('http');

const KEY = 'aIjg7oEO5AacryP2v03u06r4%2B9magi7FWC4EdjePS7YyuJpNCi1e8V3sZtAiUMH%2FuBwLHspSb%2FlnHtmGS0GYjg%3D%3D';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function main() {
  const demo = { fetchedAt: new Date().toISOString() };
  const today = new Date();
  const prevYm = today.getMonth() === 0
    ? (today.getFullYear() - 1) + '12'
    : today.getFullYear().toString() + today.getMonth().toString().padStart(2, '0');

  // 1. 아파트매매 — 서울 종로구, 세종시
  console.log('1. 아파트매매 실거래가...');
  try {
    const areas = [
      { code: '11110', name: '서울 종로구' },
      { code: '36110', name: '세종특별자치시' },
    ];
    demo.apt = [];
    for (const area of areas) {
      const raw = await fetchUrl(`https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade?serviceKey=${KEY}&LAWD_CD=${area.code}&DEAL_YMD=${prevYm}&numOfRows=50`);
      // XML 파싱 간단히
      const items = raw.match(/<item>([\s\S]*?)<\/item>/g) || [];
      const parsed = items.map(item => {
        const get = (tag) => { const m = item.match(new RegExp(`<${tag}>([^<]*)</${tag}>`)); return m ? m[1].trim() : ''; };
        return { 아파트: get('aptNm'), 거래금액: get('dealAmount'), 면적: get('excluUseAr'), 층: get('floor'), 년: get('dealYear'), 월: get('dealMonth'), 일: get('dealDay') };
      });
      demo.apt.push({ area: area.name, code: area.code, ym: prevYm, count: parsed.length, data: parsed.slice(0, 10) });
    }
  } catch(e) { demo.apt = [{ error: e.message }]; }

  // 2. 에어코리아 — 전국 시도별
  console.log('2. 에어코리아 대기오염...');
  try {
    const sidos = ['서울', '세종', '부산', '대구', '인천', '광주', '대전', '울산'];
    demo.air = [];
    for (const sido of sidos) {
      const raw = await fetchUrl(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${KEY}&returnType=json&numOfRows=3&pageNo=1&sidoName=${encodeURIComponent(sido)}&ver=1.0`);
      const d = JSON.parse(raw);
      const items = d?.response?.body?.items || [];
      demo.air.push({ sido, stations: items.slice(0, 3).map(i => ({ 측정소: i.stationName, PM10: i.pm10Value, PM25: i.pm25Value, 등급: i.pm10Grade })) });
    }
  } catch(e) { demo.air = [{ error: e.message }]; }

  // 3. 관보 — 최근 법령
  console.log('3. 관보...');
  try {
    const raw = await fetchUrl(`https://apis.data.go.kr/1741000/ApiTotalService/getApiTotalList?serviceKey=${KEY}&pageNo=1&pageSize=10&reqFrom=20260301&reqTo=20260321&type=1`);
    const d = JSON.parse(raw);
    demo.gazette = {
      total: d?.ApiTotalService?.[0]?.head?.[1]?.TOTAL_COUNT || 0,
      items: (d?.ApiTotalService?.[1]?.row || []).slice(0, 10).map(r => ({
        제목: r.SUBJECT, 발행기관: r.PUBLCN_NM, 발행일: r.PBLCTDATE, 유형: r.PUBLICTN_TYPE
      }))
    };
  } catch(e) { demo.gazette = { error: e.message }; }

  fs.mkdirSync('src/data', { recursive: true });
  fs.writeFileSync('src/data/demo.json', JSON.stringify(demo, null, 2));
  console.log(`demo.json 저장 완료 (${JSON.stringify(demo).length} bytes)`);
}

main().catch(console.error);
