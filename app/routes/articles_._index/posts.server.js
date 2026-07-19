import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatTimecode, readingTime } from '~/utils/timecode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getPosts() {
  const modules = import.meta.glob('../articles.*.mdx', { eager: true });
  const build = await import('virtual:remix/server-build');

  const posts = await Promise.all(
    Object.entries(modules).map(async ([file, post]) => {
      let id = file.replace('../', 'routes/').replace(/\.mdx$/, '');
      let slug = build.routes[id].path;
      if (slug === undefined) throw new Error(`No route for ${id}`);

      const filePath = path.resolve(__dirname, file);
      const text = fs.readFileSync(filePath, 'utf-8');
      const readTime = readingTime(text);
      const timecode = formatTimecode(readTime);

      return {
        slug,
        timecode,
        frontmatter: post.frontmatter,
      };
    })
  );

  return sortBy(posts, post => post.frontmatter.date, 'desc');
}

function sortBy(arr, key, dir = 'asc') {
  return arr.sort((a, b) => {
    const res = compare(key(a), key(b));
    return dir === 'asc' ? res : -res;
  });
}

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
