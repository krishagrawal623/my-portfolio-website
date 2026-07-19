import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Post, postMarkdown } from '~/layouts/post';
import { baseMeta } from '~/utils/meta';
import config from '~/config.json';

export async function loader({ request }) {
  const slug = request.url.split('/').at(-1);
  const module = await import(`../articles.${slug}.mdx`);
  const ogImage = `${config.url}/static/${slug}-og.jpg`;

  return json({
    ogImage,
    frontmatter: module.frontmatter,
    timecode: module.frontmatter.readingTime ?? '',
  });
}

export function meta({ data }) {
  const { title, abstract } = data.frontmatter;
  return baseMeta({
    title,
    description: abstract,
    prefix: '',
    ogImage: data.ogImage,
  });
}

export default function Articles() {
  const { frontmatter, timecode } = useLoaderData();

  return (
    <MDXProvider components={postMarkdown}>
      <Post {...frontmatter} timecode={timecode}>
        <Outlet />
      </Post>
    </MDXProvider>
  );
}
