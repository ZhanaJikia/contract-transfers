const fetch = require('node-fetch')

module.exports = class TokenBankService {
  tokenBankUrl

  tokens = {}

  constructor(tokenBankUrl) {
    this.tokenBankUrl = tokenBankUrl
  }

  async run () {
    const response = await fetch(this.tokenBankUrl)
    const data = await response.json()
    this.tokens = data
  }
}