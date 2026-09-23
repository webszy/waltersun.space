import type { CollectionEntry } from 'astro:content'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { getPostDescription } from '../src/utils/description'
import { renderOGImage } from '../src/utils/og-image'

// Reuse Astro's installed YAML parser without adding a preview dependency.
const require = createRequire(import.meta.url)
const astroRequire = createRequire(require.resolve('astro/package.json'))
const { load } = astroRequire('js-yaml')
const source = await readFile('src/content/posts/Why_I_Built_Iris.md', 'utf8')
const [, frontmatter, body] = source.split(/^---\s*$/m)
const data = load(frontmatter)
const post = { data, body } as CollectionEntry<'posts'>
const image = await renderOGImage(data.title, getPostDescription(post, 'og'))
await mkdir('tmp', { recursive: true })
await writeFile('tmp/og-preview.png', image)
console.log('Generated tmp/og-preview.png for: %s', data.title)
