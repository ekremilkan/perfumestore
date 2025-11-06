import contextSource from '../../context7.yaml?raw';

type Context7Value = string | string[] | Record<string, any>;
type Context7Document = Record<string, Context7Value>;

function parseArray(value: string) {
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((entry) => entry.replace(/["']/g, '').trim())
      .filter(Boolean);
  }
  return value;
}

function parseContext7(raw: string): Context7Document {
  const lines = raw.split('\n');
  const result: Context7Document = {};
  let currentKey: string | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }
    if (trimmed.startsWith('-')) {
      if (!currentKey) return;
      const value = trimmed.replace(/^-/, '').trim();
      const existing = result[currentKey];
      const list = Array.isArray(existing) ? existing : [];
      list.push(value.replace(/["']/g, ''));
      result[currentKey] = list;
      return;
    }
    const [key, ...rest] = trimmed.split(':');
    const rawValue = rest.join(':').trim();
    currentKey = key.trim();
    if (!rawValue) {
      result[currentKey] = [];
      return;
    }
    const parsedValue = parseArray(rawValue);
    if (Array.isArray(parsedValue)) {
      result[currentKey] = parsedValue;
    } else {
      const sanitized = parsedValue.replace(/["']/g, '');
      result[currentKey] = sanitized;
    }
  });

  return result;
}

export const context7 = parseContext7(contextSource);
