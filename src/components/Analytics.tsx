'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import siteConfig from '~/site.config';
import { trackReadingDepth } from '@/lib/analytics';

/**
 * Loads Plausible or PostHog if — and only if — the env vars are present.
 * With neither set, the site ships zero third-party JavaScript.
 */
export function Analytics() {
  const { plausibleDomain, plausibleHost, posthogKey, posthogHost } = siteConfig.analytics;

  return (
    <>
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src={`${plausibleHost}/js/script.js`}
          strategy="afterInteractive"
        />
      )}
      {posthogKey && (
        <Script id="posthog" strategy="afterInteractive">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${posthogKey}',{api_host:'${posthogHost}'});`}
        </Script>
      )}
    </>
  );
}

/** Drop into an issue page to fire issue_read_depth at 25/50/75/100%. */
export function ReadingDepth({ issueSlug }: { issueSlug: string }) {
  useEffect(() => trackReadingDepth(issueSlug), [issueSlug]);
  return null;
}

export default Analytics;
