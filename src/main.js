const { chromium } = require('playwright')

const auth = require('./utils/auth')
const getPublicIP = require('./utils/getPublicIP')
const getWanIP = require('./jobs/getWanIP')
const reloadWAN = require('./jobs/reloadWAN')
const config = require('../config')

;(async () => {
  const browser = await chromium.launch({
    headless: config.headless
  })
  const context = await browser.newContext()

  // Open new page
  const page = await context.newPage()

  const f = (name) =>
    page.frame({
      name
    })

  // make Auth
  await auth.asAdmin(context, page)

  const wanIP = await getWanIP(f)
  const publicIP = await getPublicIP()
  console.table({ wanIP, publicIP })

  if (wanIP === publicIP) {
    console.log('great. nothing todo.')
  } else {
    console.log('nope.')
    await reloadWAN(f)
    console.log('done.')
  }

  await auth.logout(f)

  //---------------------
  await context.close()
  await browser.close()
})()
