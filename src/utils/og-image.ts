import type { TextStyle } from 'canvaskit-wasm'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import CanvasKitInit from 'canvaskit-wasm/full'

const { resolve } = createRequire(import.meta.url)
const renderer = CanvasKitInit({
  locateFile: file => resolve(`canvaskit-wasm/bin/full/${file}`),
}).then(async (kit) => {
  const fonts = await Promise.all([
    readFile('./public/fonts/NotoSansSC-Bold.otf'),
    readFile('./public/fonts/NotoSansSC-Regular.otf'),
  ])
  const fontManager = kit.FontMgr.FromData(...fonts.map(font => new Uint8Array(font).buffer))
  if (!fontManager)
    throw new Error('Unable to load OG fonts')
  return { kit, fontManager }
})

// Keep the theme's 1200 × 630 editorial card and bundled typography.
export async function renderOGImage(title: string, description: string): Promise<Uint8Array<ArrayBuffer>> {
  const { kit, fontManager } = await renderer
  const surface = kit.MakeSurface(1200, 630)
  if (!surface)
    throw new Error('Unable to create OG canvas')

  const canvas = surface.getCanvas()
  const textStyle = (size: number, color: number[], bold = false): TextStyle => ({
    fontFamilies: ['Noto Sans SC'],
    fontSize: size,
    fontStyle: { weight: bold ? kit.FontWeight.Bold : kit.FontWeight.Normal },
    color: kit.Color(color[0], color[1], color[2]),
    heightMultiplier: 1.5,
  })
  const drawText = (text: string, x: number, y: number, width: number, style: TextStyle) => {
    const builder = kit.ParagraphBuilder.Make(new kit.ParagraphStyle({ textStyle: style }), fontManager)
    builder.addText(text)
    const paragraph = builder.build()
    paragraph.layout(width)
    canvas.drawParagraph(paragraph, x, y)
    paragraph.delete()
    builder.delete()
  }

  try {
    canvas.clear(kit.Color(242, 241, 245, 1))
    drawText('WebOPC', 80, 50, 1040, textStyle(40, [34, 33, 36], true))

    const builder = kit.ParagraphBuilder.Make(new kit.ParagraphStyle({
      textStyle: textStyle(70, [34, 33, 36], true),
    }), fontManager)
    builder.addText(title)
    builder.pushStyle(new kit.TextStyle({ fontSize: 20, heightMultiplier: 1 }))
    builder.addText('\n\n')
    builder.pushStyle(new kit.TextStyle(textStyle(40, [72, 71, 74])))
    builder.addText(description)
    const paragraph = builder.build()
    paragraph.layout(1000)

    // Reserve footer space, scaling unusually long copy without clipping it.
    const scale = Math.min(1, 336 / paragraph.getHeight())
    const top = Math.max(174, Math.min(234, 510 - paragraph.getHeight() * scale))
    canvas.save()
    canvas.translate(80, top)
    canvas.scale(scale, scale)
    canvas.drawParagraph(paragraph, 0, 0)
    canvas.restore()
    paragraph.delete()
    builder.delete()

    drawText('By Walter Sun · WalterAIBuilder', 80, 552, 770, textStyle(22, [112, 111, 114]))
    drawText('https://webopc.space', 880, 554, 260, textStyle(20, [112, 111, 114]))

    const image = surface.makeImageSnapshot()
    const bytes = image.encodeToBytes(kit.ImageFormat.PNG, 100)
    image.delete()
    if (!bytes)
      throw new Error('Unable to encode OG image')
    return new Uint8Array(bytes)
  }
  finally {
    surface.dispose()
  }
}
