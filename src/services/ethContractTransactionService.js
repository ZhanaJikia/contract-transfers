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

    const promises = transactions.map(({ returnValues: {
      lockId,
      sender,
      recipient,
      amount,
      source,
      destination,
      tokenSourceAddress,
      tokenSource
    }, blockNumber }) =>  this.Web3Client.eth.getBlock(blockNumber)
        .then(({ timestamp }) => ({
          blockNumber,
          lockId,
          ...this.getSender(sender),
          ...this.getRecipient(recipient),
          ...this.getAmount(amount),
          ...this.getSource(source),
          ...this.getDestination(destination),
          ...this.getTokenSource(tokenSource, tokenSourceAddress),
          ...this.getDate(timestamp),
          type
        }))
    )

    this.transactions = await Promise.all(promises)
  }

  getSender (sender) {  
    return sender ? { sender } : null
  }

  getRecipient (recipient) {
    return recipient ? { recipient: recipient.substring(0, 42) } : null
  }

  async getAmount (amount) {
    return { amount }
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
        tokenSourceAddress.substring(0, 42)
      ]
    }
  }

  getDate (timestamp) {
    return { date: format(new Date(timestamp * 1000), 'yyyy-mm-dd hh:mm:ss') }
  }
}
