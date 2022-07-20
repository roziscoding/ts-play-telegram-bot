import { Middleware } from 'grammy'
import { AppContext } from '../lib/bot'

export type Command = {
  name: string
  description?: string
  run: Middleware<AppContext>
}
