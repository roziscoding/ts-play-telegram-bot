#!/usr/bin/env deno

import { Bot } from 'grammy/mod.ts'
import { config } from './lib/config.ts'

const bot = new Bot(config.telegram.token)
await bot.api.setWebhook('https://teste/teste.com', {
  secret_token: config.telegram.secretToken
})
