import { InlineKeyboard, InputFile } from 'grammy'
import { Command } from '../../../types/Command'
import { urlToCode } from '../../playground'
import { codeToImage } from '../../shiki'

const playground: Command = {
  name: 'playground',
  run: async (ctx) => {
    const rawUrl = `${ctx.match || ''}`

    if (!rawUrl) {
      return ctx.reply('Usage: `/playground <playground URL>`')
    }

    const processingMessage = await ctx.replyWithHTML('Processing...')
    ctx.replyWithChatAction('upload_photo')

    const code = await urlToCode(rawUrl).catch(() => null)

    if (!code) {
      return ctx.reply('Please send a [TypeScript Playground](https://www.typescriptlang.org/play) URL')
    }

    const image = await codeToImage(code)

    const keyboard = new InlineKeyboard().url('Open in Playground', rawUrl).text('Refresh', 'refresh')

    await Promise.all([
      ctx.replyWithPhoto(new InputFile(image), { reply_markup: keyboard }),
      ctx.api.deleteMessage(ctx.chat?.id!, processingMessage.message_id)
    ])
  }
}

export default playground
