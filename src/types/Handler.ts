import { Middleware } from 'grammy'
import { AppContext } from '../lib/bot'

export type Handler = {
  query: string
  run: Middleware<AppContext>
}
