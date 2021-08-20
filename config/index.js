const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  headless: process.env.HEADLESS === 'true' ? true : false,
  routerIp: process.env.ROUTER_IP,
  adminPassword: process.env.PASSWORD_ADMIN
}
