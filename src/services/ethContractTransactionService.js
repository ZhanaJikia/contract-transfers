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

    const promises = transactions.map(transaction => {
      const tokenSource = transaction.returnValues.tokenSource
      return this.Web3Client.eth.getBlock(transaction.blockNumber)
        .then(block => ({
          id: transaction.id,
          lockId: transaction.returnValues.lockId,
          sender: transaction.returnValues.sender || null,
          recipient: transaction.returnValues.recipient,
          amount: transaction.returnValues.amount,
          network: this.Web3Client.utils.hexToUtf8(
            transaction.returnValues.source || transaction.returnValues.destination
          ),
          tokenSource: tokenSource
            ? this.Web3Client.utils.hexToUtf8(tokenSource)
            : null,
          date: format(new Date(block.timestamp * 1000), 'yyyy-mm-dd hh:mm:ss'),
          type
        }))
    })

    this.transactions = await Promise.all(promises)
  }
}
