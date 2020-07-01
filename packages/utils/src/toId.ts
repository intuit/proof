// https://github.com/storybookjs/storybook/blob/next/lib/router/src/utils.ts

// Remove punctuation https://gist.github.com/davidjrice/9d2af51100e41c6c4b4a
export const sanitize = (string: string) => {
  return string
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:",.<>{}[\]\\/]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const sanitizeSafe = (string: string, part: string) => {
  const sanitized = sanitize(string);
  if (sanitized === '') {
    throw new Error(
      `Invalid ${part} ’${string}’, must include alphanumeric characters`
    );
  }

  return sanitized;
};

export const toId = (kind: string, name: string) =>
  `${sanitizeSafe(kind, 'kind')}--${sanitizeSafe(name, 'name')}`;

export default toId;
