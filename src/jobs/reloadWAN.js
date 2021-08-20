module.exports = async (f) => {
  console.log('Reloading WAN...')
  console.time('WAN reloaded')

  // Click text=Network
  await f('loginPage').click('text=Network')

  // Click text=BroadBand Settings
  await f('loginPage').click('text=BroadBand Settings')

  // Turn off WAN
  await f('frameContent').selectOption('select[name="wan_enable"]', '0')

  // Click text=Apply
  await f('frameContent').click('text=Apply')
  await f('frameContent').waitForLoadState('networkidle')

  // Turn on WAN
  await f('frameContent').selectOption('select[name="wan_enable"]', '1')

  // Click text=Apply
  await f('frameContent').click('text=Apply')
  await f('frameContent').waitForLoadState('networkidle')
  console.timeEnd('WAN reloaded')
}
