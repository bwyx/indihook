const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  headless: process.env.HEADLESS,
  routerIp: process.env.ROUTER_IP,
  adminPassword: process.env.PASSWORD_ADMIN
}
