const { chromium } = require('playwright')
const config = require('./config')

;(async () => {
  const browser = await chromium.launch({
    headless: config.headless
  })
  const context = await browser.newContext()

  // Open new page
  const page = await context.newPage()

  // Go to router web login
  await page.goto(`http://${routerIp}/login.html`)

  const frame = (name) =>
    page.frame({
      name
    })

  // Click input[name="User"]
  await frame('loginPage').click('input[name="User"]')

  // Fill input[name="User"]
  await frame('loginPage').fill('input[name="User"]', 'admin')

  // Click input[name="Passwd"]
  await frame('loginPage').click('input[name="Passwd"]')

  // Fill input[name="Passwd"]
  await frame('loginPage').fill('input[name="Passwd"]', '%0|F?H@f!berhO3e')

  // Click text=Login
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://192.168.1.1/menu.html' }*/),
    frame('loginPage').click('text=Login')
  ])

  // Click text=Network
  await frame('loginPage').click('text=Network')

  // Click text=BroadBand Settings
  await frame('loginPage').click('text=BroadBand Settings')

  // Turn off WAN
  await frame('frameContent').selectOption('select[name="wan_enable"]', '0')

  // Click text=Apply
  await frame('frameContent').click('text=Apply')

  await page.waitForLoadState('networkidle')

  // Turn on WAN
  await frame('frameContent').selectOption('select[name="wan_enable"]', '1')

  // Click text=Apply
  await frame('frameContent').click('text=Apply')

  await page.waitForLoadState('networkidle')

  // Click text=Logout
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://192.168.1.1/login.html' }*/),
    frame('loginPage').click('text=Logout')
  ])

  // ---------------------
  await context.close()
  await browser.close()
})()
