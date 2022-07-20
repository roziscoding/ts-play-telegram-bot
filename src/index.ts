import { getBot } from './lib/bot'
import { config } from './lib/config'
import server from './lib/server'

getBot(config)
  .then((bot) => server.start(config, bot))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
