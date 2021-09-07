const { parseContractTransactionService } = require('./services') 

const contract = new parseContractTransactionService(
  '0x6E405f9203a2D7f3e3bf38C332e7852D0ad76553'
)

const transactions = contract.getTransactions()
