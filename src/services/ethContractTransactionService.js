const Web3 = require('web3')

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
   * getTransactions
   * @param {string} [type=Sent] - Sent or Received
   * @returns Array of transactions
   */
  async getTransactions(type = 'Sent') {
    const transactions = await this.contract.getPastEvents(type, this.options)

    return transactions
  }
}
