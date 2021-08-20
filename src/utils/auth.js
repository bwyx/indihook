const config = require('../../config')
const creds = require('../../creds.json')

const baseUrl = `http://${config.routerIp}/`
const loginUrl = baseUrl + 'login.html'
const menuUrl = baseUrl + 'menu.html'

/**
 *
 * @param {string} user Router username login
 * @param {string} pass Router password login
 * @returns void
 */
const auth = (user, pass) => async (context, page) => {
  const frame = (name) =>
    page.frame({
      name
    })

  // using saved credential
  context.addCookies(creds.cookies)

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://192.168.1.1/menu.html' }*/),
    // Go to router web dashboard
    page.goto(menuUrl)
  ])

  // unauthenticated (redirected to login)
  if (page.url() === loginUrl) {
    // Fill input[name="User"]
    await frame('loginPage').fill('input[name="User"]', user)
    // Fill input[name="Passwd"]
    await frame('loginPage').fill('input[name="Passwd"]', pass)

    // Click text=Login
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://192.168.1.1/menu.html' }*/),
      frame('loginPage').click('text=Login')
    ])

    // save current credential
    await context.storageState({ path: 'creds.json' })
  }
}

const logout = async (f) =>
  await Promise.all([
    f('loginPage').waitForNavigation(),
    f('loginPage').click('text=Logout')
  ])

module.exports = {
  asAdmin: auth('admin', config.adminPassword),
  asUser: auth('user', config.userPassword),
  logout
}
