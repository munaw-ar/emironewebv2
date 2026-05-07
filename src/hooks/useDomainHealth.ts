import { useState, useCallback } from 'react';

const CF_DNS = 'https://cloudflare-dns.com/dns-query';
const DNS_H = { Accept: 'application/dns-json' };

export interface DnsResult {
  spf: { found: boolean; value: string };
  dmarc: { found: boolean; policy: string; value: string };
  mx: { found: boolean; count: number };
  dkim: { found: boolean };
  score: number;
}

interface DomainHealthState {
  domain: string;
  results: DnsResult | null;
  isChecking: boolean;
  drawerOpen: boolean;
}

function dnsFetch(name: string, type: string) {
  return fetch(`${CF_DNS}?name=${encodeURIComponent(name)}&type=${type}`, {
    headers: DNS_H,
  }).then(r => r.json());
}

async function checkDomain(domain: string): Promise<DnsResult> {
  const selectors = ['google', 'mail', 'default', 'selector1', 'selector2'];
  const allChecks = await Promise.allSettled([
    dnsFetch(domain, 'TXT'),
    dnsFetch(`_dmarc.${domain}`, 'TXT'),
    dnsFetch(domain, 'MX'),
    ...selectors.map(s => dnsFetch(`${s}._domainkey.${domain}`, 'TXT')),
  ]);

  const spf = { found: false, value: '' };
  if (allChecks[0].status === 'fulfilled') {
    const ans = (allChecks[0].value as any).Answer || [];
    const rec = ans.find((a: any) => a.data?.includes('v=spf1'));
    if (rec) { spf.found = true; spf.value = rec.data.replace(/"/g, ''); }
  }

  const dmarc = { found: false, policy: 'none', value: '' };
  if (allChecks[1].status === 'fulfilled') {
    const dans = (allChecks[1].value as any).Answer || [];
    const drec = dans.find((a: any) => a.data?.includes('v=DMARC1'));
    if (drec) {
      dmarc.found = true;
      dmarc.value = drec.data.replace(/"/g, '');
      const pm = dmarc.value.match(/p=([a-z]+)/i);
      dmarc.policy = pm ? pm[1].toLowerCase() : 'none';
    }
  }

  const mx = { found: false, count: 0 };
  if (allChecks[2].status === 'fulfilled') {
    const mans = (allChecks[2].value as any).Answer || [];
    if (mans.length > 0) { mx.found = true; mx.count = mans.length; }
  }

  const dkimFound = allChecks.slice(3).some(
    r => r.status === 'fulfilled' && (r.value as any).Answer?.length > 0
  );

  let score = 0;
  if (spf.found) score += 3;
  if (dmarc.found) {
    if (dmarc.policy === 'reject') score += 3;
    else if (dmarc.policy === 'quarantine') score += 2;
    else score += 1;
  }
  if (mx.found) score += 2;
  if (dkimFound) score += 2;

  return { spf, dmarc, mx, dkim: { found: dkimFound }, score };
}

export function getCommentary(score: number, r: DnsResult): string {
  if (score >= 9) return 'Excellent infrastructure. Your domain is inbox-ready.';
  if (score >= 7) {
    if (!r.dkim.found) return 'Close to inbox-ready. Add a DKIM record to complete your authentication stack.';
    if (r.dmarc.policy === 'none') return 'Close to inbox-ready. Upgrade your DMARC policy from none to quarantine to close the gap.';
    return 'Close to inbox-ready. One configuration gap to address.';
  }
  if (score >= 5) {
    const gaps: string[] = [];
    if (!r.spf.found) gaps.push('SPF');
    if (!r.dmarc.found || r.dmarc.policy === 'none') gaps.push('DMARC');
    if (!r.dkim.found) gaps.push('DKIM');
    return `Moderate risk. ${gaps.join(' and ')} need attention before any cold sending.`;
  }
  return 'High risk. Missing fundamentals — emails are likely landing in spam.';
}

export function useDomainHealth() {
  const [state, setState] = useState<DomainHealthState>({
    domain: '',
    results: null,
    isChecking: false,
    drawerOpen: false,
  });

  const check = useCallback(async (rawInput: string) => {
    const domain = rawInput
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '')
      .toLowerCase()
      .trim();
    if (!domain) return;

    setState(s => ({ ...s, isChecking: true }));
    try {
      const results = await Promise.race([
        checkDomain(domain),
        new Promise<never>((_, rej) =>
          setTimeout(() => rej(new Error('timeout')), 8000)
        ),
      ]);
      setState({ domain, results, isChecking: false, drawerOpen: true });
    } catch {
      setState(s => ({ ...s, domain, results: null, isChecking: false, drawerOpen: true }));
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setState(s => ({ ...s, drawerOpen: false }));
  }, []);

  return { ...state, check, closeDrawer };
}
