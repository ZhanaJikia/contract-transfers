const Web3 = require('web3')
const { format } = require('date-fns')

const abi = require('../abi/allbridge')

module.exports = class EthContractTransactionService {
  provider = process.env.PROVIDER

  contractAddress = ''

  Web3Client = null

  contract = null

  options = {
    fromBlock: 'earliest',
    toBlock: 'latest'
  }

  transactions = []

  constructor(contractAddress) {
    this.contractAddress = contractAddress
    
    this.web3Client()
    this.readContract()
  }

  web3Client() {
    this.Web3Client = new Web3(new Web3.providers.HttpProvider(this.provider))
  }

  readContract() {
    this.contract = new this.Web3Client.eth.Contract(abi, this.contractAddress)
  }

  /**
   * transform
   * @param {string} [type=Sent] - Sent or Received
   * @returns Array of transactions
   */
  async transform(type = 'Sent') {
    const transactions = await this.contract.getPastEvents(type, this.options)

    const trx = []
    
    for await (let { returnValues: {
      lockId,
      sender,
      recipient,
      token,
      amount,
      source,
      destination,
      tokenSourceAddress,
      tokenSource
    }, blockNumber } of transactions) {
      const doAsync = async () => ({
        blockNumber,
        lockId,
        ...this.getSender(sender),
        ...this.getRecipient(recipient),
        ...await this.getAmount(amount, token || tokenSourceAddress),
        ...this.getSource(source),
        ...this.getDestination(destination),
        ...this.getTokenSource(tokenSource, tokenSourceAddress),
        ...this.getDate(
          await this.Web3Client.eth.getBlock(blockNumber)
        ),
        type
      })

      trx.push(doAsync())
    }
    
    this.transactions =  await Promise.all(trx)
  }

  getSender (sender) {  
    return sender ? { sender } : null
  }

  getRecipient (recipient) {
    return recipient ? { recipient: this.normalizeToken(recipient) } : null
  }

  async getAmount (amount, token) {
    const { precision } = await this.contract.methods.tokenInfos(
      this.normalizeToken(token)
    ).call()

    return { amount: amount / (10 ** precision) }
  }

  getSource (source) {
    return  source ? { source: this.Web3Client.utils.hexToUtf8(source) } : null
  }

  getDestination (destination) {
    return destination ? { destination: this.Web3Client.utils.hexToUtf8(destination) } : null
  }

  getTokenSource (tokenSource, tokenSourceAddress) {
    if(!tokenSource || !tokenSourceAddress) return null

    return { 
      tokenSource: [
        this.Web3Client.utils.hexToUtf8(tokenSource),
        this.normalizeToken(tokenSourceAddress)
      ]
    }
  }

  getDate ({ timestamp }) {
    return { date: format(new Date(timestamp * 1000), 'yyyy-mm-dd hh:mm:ss') }
  }

  normalizeToken (token) {
    return token?.substring(0, 42)
  }
}
