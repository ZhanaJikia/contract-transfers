const Web3 = require('web3')

const abi = require('../abi/allbridge')

module.exports = class ParseContractTransactionService {
	provider = "https://mainnet.infura.io/v3/b8fa89d40a4f4259954d465558d05c0a"
	
	contractAddress = ''
	
	Web3Client = null

	constructor(contractAddress){
		this.contractAddress = contractAddress;

		this.initWeb3()
	}

	initWeb3(){
		this.Web3Client = new Web3(new Web3.providers.HttpProvider(this.provider))
	}

	async getTransactions () {
		const contract = new this.Web3Client.eth.Contract(abi, this.contractAddress)

		contract.events.Received({
			// fromBlock: "0",
			// toBlock: 'latest'
			
	}, function(error, events){ console.log(events); })
	
		// console.log('contract',contract)
		return 'ok'
	}
}