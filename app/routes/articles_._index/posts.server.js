export async function getPosts() {
  const modules = import.meta.glob('../articles.*.mdx', { eager: true });
  const build = await import('virtual:remix/server-build');

  const posts = Object.entries(modules).map(([file, post]) => {
    const id = file.replace('../', 'routes/').replace(/\.mdx$/, '');
    const slug = build.routes[id].path;

    if (!slug) {
      throw new Error(`No route for ${id}`);
    }

    return {
      slug,
      timecode: post.frontmatter.readingTime ?? '',
      frontmatter: post.frontmatter,
    };
  });

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
