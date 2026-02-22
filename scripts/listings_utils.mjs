import { promises as fs } from 'node:fs';
import path from 'node:path';
import { parseDocument } from 'yaml';

export const LISTINGS_DIR = path.resolve('src/content/listings');

export async function getListingFiles() {
  const entries = await fs.readdir(LISTINGS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(LISTINGS_DIR, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

export async function parseListingFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`Missing frontmatter delimiters in ${filePath}`);
  }

  const [, fmBlock, body] = match;
  const frontmatter = parseDocument(fmBlock).toJS() ?? {};

  return {
    filePath,
    basename: path.basename(filePath, '.md'),
    raw,
    frontmatter,
    body
  };
}

export function yamlValue(value) {
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `\n${value.map((entry) => `  - ${yamlValue(entry)}`).join('\n')}`;
  }
  if (value === null || value === undefined || value === '') return "''";
  const str = String(value).replace(/'/g, "''");
  return `'${str}'`;
}

export function buildFrontmatter(frontmatter, preferredOrder = []) {
  const keys = [
    ...preferredOrder.filter((key) => key in frontmatter),
    ...Object.keys(frontmatter).filter((key) => !preferredOrder.includes(key))
  ];

  const lines = keys
    .filter((key) => frontmatter[key] !== undefined)
    .map((key) => {
      const value = yamlValue(frontmatter[key]);
      return value.startsWith('\n') ? `${key}:${value}` : `${key}: ${value}`;
    });

  return `---\n${lines.join('\n')}\n---`;
}

export function listingSlug(listing) {
  return String(listing.frontmatter.slug || listing.basename).trim();
}

export function toKebabCase(input) {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export async function writeListingFile(filePath, frontmatter, body, preferredOrder = []) {
  const fm = buildFrontmatter(frontmatter, preferredOrder);
  const normalizedBody = body.startsWith('\n') ? body : `\n${body}`;
  const output = `${fm}${normalizedBody.endsWith('\n') ? normalizedBody : `${normalizedBody}\n`}`;
  await fs.writeFile(filePath, output, 'utf8');
}
