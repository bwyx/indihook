/**
 * getWanIP
 * @param {(frameName:string)=> Frame} f f()
 * @returns string
 */
module.exports = async (f) => {
  // Click text=Status
  await f('loginPage').click('text=Status')

  // Click text=WAN Status
  await f('loginPage').click('text=WAN Status')

  /** as Handler */
  // const hostname = await page.evaluate(() => window.location.hostname)
  // const responseHandler = async (response) => {
  //   if (response.url() === `http://${hostname}/state/wan_state.asp`) {
  //     await page.waitForLoadState('networkidle')
  //     await frame('frameContent').waitForSelector('#wan_ip_0')
  //     const wanIP = await frame('frameContent').$eval(
  //       '#wan_ip_0',
  //       (e) => e.innerText
  //     )
  //     callback(wanIP)
  //   }
  // }

  // page.on('response', responseHandler)

  /** one-time get */
  await f('frameContent').waitForLoadState('networkidle')
  await f('frameContent').waitForSelector('#wan_ip_0')
  return await f('frameContent').$eval('#wan_ip_0', (e) => e.innerText)
}
