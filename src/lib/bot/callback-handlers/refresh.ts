import { InlineKeyboard, InputFile } from 'grammy'
import { Handler } from '../../../types/Handler'
import { urlToCode } from '../../playground'
import { codeToImage } from '../../shiki'

const refresh: Handler = {
  query: 'refresh',
  run: async (ctx) => {
    await ctx.replyWithChatAction('upload_photo')
    await ctx.answerCallbackQuery('Processing...')

    const imageMessage = ctx.callbackQuery?.message
    const originalMessage = imageMessage?.reply_to_message

    if (!imageMessage || !originalMessage) {
      console.log({ imageMessage: !!imageMessage, originalMessage: !!originalMessage })
      return
    }

    const [, url] = originalMessage.text?.split(' ') || []

    if (!url) {
      console.log('Missing URL')
      return
    }

    const code = await urlToCode(url).catch(() => null)

    if (!code) {
      console.log('Missing code')
      return
    }

    const image = await codeToImage(code)

    const keyboard = new InlineKeyboard().url('Open in Playground', url).text('Refresh', 'refresh')

    await ctx.api.editMessageMedia(
      imageMessage.chat.id,
      imageMessage.message_id,
      {
        type: 'photo',
        media: new InputFile(image)
      },
      { reply_markup: keyboard }
    )
  }
}

export default refresh
