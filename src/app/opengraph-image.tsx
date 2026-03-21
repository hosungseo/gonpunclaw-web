import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #dbeafe 100%)',
          color: 'white',
          padding: '72px',
          fontFamily: 'Pretendard, sans-serif',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 28,
            opacity: 0.92,
          }}
        >
          <div style={{ display: 'flex', padding: '10px 18px', borderRadius: 9999, background: 'rgba(255,255,255,0.14)' }}>
            OpenClaw × Public Sector
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '860px' }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.1 }}>
            공픈클로
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.35, color: '#e2e8f0' }}>
            공무원·공공기관 AI 업무자동화 100선
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.5, color: '#bfdbfe' }}>
            실제 공공 API 데모와 교차 분석 대시보드를 한 곳에서 정리한 실전 레퍼런스
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: '#dbeafe' }}>
          <div>use cases · dashboard · metadata ready</div>
          <div>gonpunclaw-web</div>
        </div>
      </div>
    ),
    size,
  );
}
