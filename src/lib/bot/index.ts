import { hydrateReply, parseMode, type ParseModeContext } from '@grammyjs/parse-mode'
import { Bot, Context } from 'grammy'
import { AppConfig } from '../config'
import callbackHandlers from './callback-handlers'
import commands from './commands/index'
import { autoReply } from './plugins/auto-reply'

export type AppContext = Context & ParseModeContext

export async function getBot(config: AppConfig) {
  const bot = new Bot<AppContext>(config.telegram.token)

  bot.use(hydrateReply)
  bot.api.config.use(parseMode('MarkdownV2'))
  bot.use(autoReply)

  bot.command('start', (ctx) => ctx.reply('Hi there :)'))

  for (const command of commands) {
    bot.command(command.name, command.run)
  }

  for (const callbackHandler of callbackHandlers) {
    bot.callbackQuery(callbackHandler.query, callbackHandler.run)
  }

  return bot
}
