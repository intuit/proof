import { toId } from '@proof-ui/utils';
import URL from 'url-parse';
import urlJoin from 'url-join';

// Get the default base to the storybook
// Storybook ends in a index.html
export function normalizeBaseURL(url: string): string {
  let normalized = url;
  if (!normalized.startsWith('http')) {
    normalized = urlJoin('http:', normalized);
  }
  const parsed = new URL(normalized);
  let path = '';

  // Remove any ending index.html
  if (parsed.pathname) {
    path = parsed.pathname;
    if (parsed.pathname.endsWith('.html')) {
      const splitPathname = path.split('/');
      path = splitPathname.slice(0, splitPathname.length - 1).join('/');
    }
  }

  // Join back everything, excluding any query params
  return urlJoin(parsed.protocol, parsed.host, path);
}

export function getStoryURL(
  base: string,
  kind?: string,
  story?: string
): string {
  if (!kind || !story) {
    return base;
  }

  return urlJoin(base, 'iframe.html', `?id=${toId(kind, story)}`);
}
