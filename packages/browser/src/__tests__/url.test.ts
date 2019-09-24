import { normalizeBaseURL } from '../url';

describe('normalizeBaseURL', () => {
  it('works for simple ones', () => {
    const normalized = 'http://foo.bar.a.com';
    expect(normalizeBaseURL('foo.bar.a.com')).toBe(normalized);
    expect(normalizeBaseURL('http://foo.bar.a.com')).toBe(normalized);
    expect(normalizeBaseURL('http://foo.bar.a.com/index.html?bar=baz')).toBe(
      normalized
    );
  });
});
