import type { APIRoute } from 'astro';

import { ADSENSE_PUBLISHER_ID } from '../config/site';

export const GET: APIRoute = () => {
  const hasPublisherId = Boolean(ADSENSE_PUBLISHER_ID);
  const body = hasPublisherId
    ? `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`
    : '# AdSense publisher ID is not configured.\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
