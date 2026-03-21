export const SITE_URL = 'https://hosungseo.github.io/gonpunclaw-web';
export const SITE_NAME = '공픈클로';
export const DEFAULT_OG_IMAGE = '/opengraph-image';

export const siteMetadata = {
  title: '공픈클로 | 공무원·공공기관 AI 업무자동화 100선',
  description:
    '오픈클로(OpenClaw)를 활용한 공무원·공공기관 업무 AX(AI Transformation) 100가지 유스케이스',
};

export function getSiteUrl() {
  return new URL(SITE_URL);
}
