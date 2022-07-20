import 'dotenv/config'

function getSecretToken(token: string) {
  const allowedRegex = /[a-z0-9]/i
  return token
    .split('')
    .filter((char) => allowedRegex.test(char))
    .join('')
}

export function getConfig() {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN

  const WEBHOOK_HOST = process.env.WEBHOOK_HOST || process.env.VERCEL_URL || 'localhost:3000'

  const WEBHOOK_PORT = parseInt(process.env.WEBHOOK_PORT || process.env.PORT || '3000', 10)

  if (!TELEGRAM_TOKEN) throw new Error('missing `TELEGRAM_TOKEN` env')

  return {
    telegram: {
      token: TELEGRAM_TOKEN,
      secretToken: getSecretToken(TELEGRAM_TOKEN)
    },
    webhook: {
      url: `https://${WEBHOOK_HOST}/`,
      port: WEBHOOK_PORT
    }
  }
}

export const config = getConfig()

export type AppConfig = typeof config
