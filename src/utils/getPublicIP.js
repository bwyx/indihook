const got = require('got')

module.exports = async () => {
  try {
    console.log('Getting public IP from https://api.ipify.org/...')
    console.time('Got Public IP')
    const { body } = await got('https://api.ipify.org/')
    console.timeEnd('Got Public IP')
    return body
  } catch (error) {
    console.error(error)
  }
}
