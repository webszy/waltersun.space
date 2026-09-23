import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import { themeConfig } from '@/config'
import { getPostDescription } from '@/utils/description'
import { renderOGImage } from '@/utils/og-image'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection(
    'posts',
    ({ data }) => import.meta.env.DEV || !data.draft,
  )

  return [
    {
      params: { image: 'site.png' },
      props: { title: 'WebOPC', description: themeConfig.site.description },
    },
    ...posts.map(post => ({
      params: { image: `${post.id.replace(/\.[^.]*$/, '').replace(/\/index$/, '')}.png` },
      props: { title: post.data.title, description: getPostDescription(post, 'og') },
    })),
  ]
}

export const GET: APIRoute = async ({ props }) => {
  const image = await renderOGImage(props.title, props.description)
  return new Response(image, { headers: { 'Content-Type': 'image/png' } })
}
