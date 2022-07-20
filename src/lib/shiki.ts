import { createCanvas } from 'canvas'
import prettier from 'prettier'
import { getHighlighter, Highlighter } from 'shiki'
import { getCanvasRenderer } from 'shiki-renderer-canvas'

let highligter: Highlighter

export async function codeToImage(code: string) {
  highligter = highligter || (await getHighlighter({ langs: ['typescript'], theme: 'dracula' }))

  const prettyCode = prettier.format(code, {
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'none',
    semi: false,
    printWidth: 120
  })

  const tokens = highligter.codeToThemedTokens(prettyCode, 'typescript')

  const canvas = createCanvas(1, 1)
  const renderer = await getCanvasRenderer(canvas)
  return renderer.renderToCanvas(tokens).toBuffer()
}
