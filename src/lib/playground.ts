import { decompressFromURI } from 'lz-ts'

export async function urlToCode(rawUrl: string) {
  const url = new URL(rawUrl)

  if (!url.host.includes('typescriptlang.org') || url.pathname !== '/play') {
    throw new Error('Please send a [TypeScript Playground](https://www.typescriptlang.org/play) URL')
  }

  const codeHash = url.hash.replace('#code/', '').trim()
  return decompressFromURI(codeHash)
}
