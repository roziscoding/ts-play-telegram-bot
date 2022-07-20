import Fastify from 'fastify'
import { Bot, webhookCallback } from 'grammy'
import { AppContext } from './bot'
import { AppConfig } from './config'

async function start(config: AppConfig, bot: Bot<AppContext>) {
  const app = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
              }
            }
          : undefined
    }
  })

  const handleUpdates = webhookCallback(bot, 'fastify', { secretToken: config.telegram.secretToken })

  app.post('/', (req, res) => {
    handleUpdates(req, res)
  })
  app.post('/set-webhook', async (_, res) => {
    await bot.api.setWebhook(config.webhook.url, { secret_token: config.telegram.secretToken })
    return res.status(204).send()
  })
  app.get('/getWebhookInfo', () => {
    if (process.env.NODE_ENV !== 'development') return null
    return bot.api.getWebhookInfo()
  })
  app.get('/config', () => {
    if (process.env.NODE_ENV !== 'development') return null
    return config
  })

  await app.listen({ port: config.webhook.port })

  return app
}

export default {
  start
}
